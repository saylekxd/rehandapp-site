# Paywall – Implementation Plan (removed)

> **Purpose**: Introduce a simple pay-wall that is triggered **after successful user registration** and **before business creation**.  A subscription is billed **per business**, not per user.
>
> **How to use this list**: Work through each task sequentially.  Mark a task complete by putting an `x` inside the bracket (e.g. `[x]`).  Do **not** skip ahead – each task serves as a checkpoint for review & testing.

---

## 0. Preparation  
Minimal prerequisites before coding starts.

- [X] Confirm Stripe account & obtain **STRIPE_SECRET_KEY** & **STRIPE_WEBHOOK_SECRET** – add to `.env.local`  
- [X] Confirm Supabase project ID (`NEXT_PUBLIC_SUPABASE_URL`) & anon key are present  
- [-] (Optional) Create a new **Stripe Price** (recurring) for the business subscription and record its `price_id` in `.env.local`

---

## Note
This repository now hosts only a static landing page. Paywall and backend plans have been removed.

1.1 Business subscription metadata
- [x] Create/alter `businesses` table with the following nullable columns:  
  - `stripe_customer_id` text  
  - `stripe_subscription_id` text  
  - `subscription_status` text (enum: `trialing|active|past_due|canceled|incomplete`)

1.2 Row-level security
- [x] Ensure RLS still prevents cross-business leakage after new columns (no policy changes expected).

*Checkpoint 1*: verify migration applied & columns exist.

---

## 2. Stripe Integration – Supabase **Edge Functions**

2.1 Create-Checkout Edge Function (`create-checkout`)  
- [X] HTTP **POST** – input: `{ businessId }`  
  Process within Edge Function:  
  1. Look up existing `businesses` row using `businessId` (the business record should already exist)  
  2. Fetch **or create** Stripe customer via Stripe SDK (Deno)  
  3. Create a Checkout Session with the business subscription `price_id`  
  4. Persist `stripe_customer_id` (if new) back to `businesses`  
  5. Return `session.url`

2.2 Webhook Edge Function (`stripe-webhook`)  
- [X] Receives Stripe webhook events.  
  - Verify signature using `STRIPE_WEBHOOK_SECRET`.  
  - For `checkout.session.completed` → set `subscription_status='active'`, store `stripe_subscription_id`.  
  - For other lifecycle events (`invoice.payment_failed`, `customer.subscription.deleted`, etc.) update `subscription_status` accordingly.

2.3 Secrets / Environment  
- [X] Store `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `PRICE_ID` via `supabase secrets set ...` so Edge Functions can access them.

*Checkpoint 2*: Trigger manual Checkout from Stripe dashboard, confirm webhook Edge Function updates DB correctly.

---

## 3. Registration Flow Changes (Frontend)

3.1 Register form updates
- [X] Add **radio/toggle** → "Create New Business" vs "Join Existing Business"  
  - If **join**, show text input for `businessId` (or invite code)  
  - If **create**, continue to paywall after signup.

3.2 Handle submit
- [X] After `supabase.auth.signUp`, store choice in localStorage or query param (`mode=create|join`).  
- [X] Redirect to `/onboarding` route.

*Checkpoint 3*: ensure user can reach onboarding page with mode flag.

---

## 4. Onboarding Routes

4.1 `/onboarding` page (client)  
- [X] If `mode=create`:
  1. Create a new business record:
     ```js
     // Create a minimal business record first
     const { data: newBusiness, error } = await supabase
       .from('businesses')
       .insert({
         name: 'My Business', // Use form input or placeholder (update later)
         owner_id: user.id,   // Link the current user as owner
       })
       .select()
       .single();
     ```
  2. Associate current user with the business:
     ```js
     // Create business_users relationship with admin role
     await supabase.from('business_users').insert({
       user_id: user.id,
       business_id: newBusiness.id,
       role: 'admin'  // Or whatever role system you use
     });
     ```
  3. **Invoke** the Edge Function with the new business ID:  
     ```js  
     const { data } = await supabase.functions.invoke('create-checkout', { 
       body: { businessId: newBusiness.id }
     });
     ```
  4. Then redirect to Stripe: `window.location.href = data.sessionUrl;`  
- [X] If `mode=join`, show input to submit existing `businessId` and update user profile accordingly.

4.2 Post-checkout success page  
- [X] `/onboarding/success` – polls `businesses.subscription_status` until `active` then allows business-setup wizard.

*Checkpoint 4*: flow from signup → paywall → success works.

---

## 5. Middleware / Access Guard

- [X] ~~Update `middleware.ts` or custom hook~~ **Implemented custom hooks instead of middleware** to block dashboard routes when:  
  - user's `business.subscription_status` !== `active`.  
  - redirect them to `/paywall` with instructions.
  
  **Note**: Used `useSubscriptionGuard` and `useAuthGuard` hooks instead of middleware to maintain compatibility with static site export (`output: 'export'`).

*Checkpoint 5*: verify unpaid business users are redirected.

---

## 6. Testing & QA

- [ ] Happy path: create business, complete payment, access dashboard.  
- [ ] Join path: join existing active business, access dashboard immediately.  
- [ ] Past-due subscription: dashboard blocked.

---

## Archived

- [ ] Stripe keys & price ID in production env vars.  
- [ ] Webhook endpoint added in Stripe dashboard.  
- [ ] Supabase production DB migrated.

---

## 8. Future Enhancements (outside MVP scope)

- Usage-based billing tiers  
- Invite links / email flow for joining business  
- Self-serve billing portal

---

*End of plan* 



@Evaluating Paywall Implementation Steps @Evaluating Business Plan Effectiveness -- Do the 5 step from implementation, because right now the user can login to the account after he created account. - I see such error --- but I don't want to change export site, it sshould be static site - can we do it?  ⨯ Middleware cannot be used with "output: export". See more info here: https://nextjs.org/docs/advanced-features/static-html-export