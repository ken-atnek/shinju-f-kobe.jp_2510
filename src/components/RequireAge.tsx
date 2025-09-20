/* =======================================
 *真珠夫人神戸本店 年齢認証ガード
 * URL: src/components/RequireAge.tsx
 * Created: 2025-09-18
 * Last updated: 2025-09-18
 * ======================================= */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAgeVerified } from '@/lib/age';

export default function RequireAge({
  authPath = '/auth',
  children,
}: {
  authPath?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const isOk = isAgeVerified();
    setVerified(isOk);

    if (!isOk) {
      router.replace(authPath);
    }
  }, [authPath, router]);

  // 認証判定中または認証NG
  if (!verified) return null;

  // 認証OK
  return <>{children}</>;
}
