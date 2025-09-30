/* =======================================
 *真珠夫人 キャストプロフィール
 * URL: src/app/profile/page.tsx
 * Created: 2025-09-27
 * Last updated: 2025-09-27
 * ======================================= */

'use client';
import ContainerFooter from '@/components/common/ContainerFooter';
import CastProfile from '@/components/PageProfile/CastProfile';

export default function ProfilePage() {
  return (
    <main>
      <CastProfile />
      <ContainerFooter />
    </main>
  );
}
