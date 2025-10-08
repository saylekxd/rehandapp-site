## Dashboard Folder Architecture

```
app/dashboard/
├── layout.tsx               # Main dashboard layout with sidebar
├── page.tsx                 # Dashboard overview page
├── components/              # Shared dashboard components
│   ├── BusinessProvider.tsx # Business context provider
│   ├── Sidebar.tsx          # Dashboard sidebar navigation
│   ├── StatsCard.tsx        # Reusable stats card component
│   ├── DataTable.tsx        # Reusable table component
│   └── ActivityFeed.tsx     # Activity feed component
├── tasks/                   # Tasks section
│   ├── page.tsx             # All tasks page
│   ├── my-tasks/            # My tasks subpage
│   ├── completed/           # Completed tasks subpage
│   ├── templates/           # Task templates subpage
│   └── [taskId]/            # Task detail page
├── documents/               # Documents section
│   ├── page.tsx             # All documents page
│   ├── create/              # Create document page
│   └── [documentId]/        # Document detail page
├── team/                    # Team section
│   ├── page.tsx             # Team members page
│   ├── work-sessions/       # Work sessions page
│   └── [userId]/            # User detail page
├── settings/                # Settings section
│   ├── page.tsx             # Profile settings page
│   ├── business/            # Business settings page
│   └── tags/                # Tags management page
└── lib/                     # Dashboard-specific utilities
    ├── hooks/               # Custom hooks for data fetching
    │   ├── useTask.ts       # Task-related hooks
    │   ├── useUser.ts       # User-related hooks
    │   └── useStats.ts      # Stats-related hooks
    └── utils/               # Helper functions
        └── filters.ts       # Data filtering utilities
```