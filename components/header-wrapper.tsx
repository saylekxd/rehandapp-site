'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardPage = pathname?.startsWith('/dashboard');

  return (
    <>
      {!isDashboardPage && <Header />}
      <main>{children}</main>
      {!isDashboardPage && <Footer />}
    </>
  );
} 