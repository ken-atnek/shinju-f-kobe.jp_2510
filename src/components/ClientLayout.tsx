/* =======================================
 *真珠夫人神戸本店 Client Layout
 * URL: src/components/ClientLayout.tsx
 * Created: 2025-09-18
 * Last updated: 2025-09-18
 * ======================================= */

'use client';

import { usePathname } from 'next/navigation';
import RequireAge from '@/components/RequireAge';
import SvgDefs from '@/components/SvgDefs';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth' || pathname === '/auth/';

  return (
    <>
      <SvgDefs />
      {isAuthPage ? (
        children
      ) : (
        <RequireAge authPath="/auth">{children}</RequireAge>
      )}
    </>
  );
}
