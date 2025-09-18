/* =======================================
 *真珠夫人神戸本店 認証ページ
 * URL: src/app/auth/page.tsx
 * Created: 2025-09-18
 * Last updated: 2025-09-18
 * ======================================= */

'use client';
import styles from '@/styles/PageEntrance.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAgeVerified } from '@/lib/age';

export default function PageEntrance() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = async () => {
    setIsLoading(true);
    await setAgeVerified();
    router.replace('/');
  };

  return (
    <main className={styles.pageEntrance}>
      <h1>年齢認証</h1>
      <p>
        このサイトには、18歳未満の方には不適切な内容が含まれています。
        <br />
        あなたは18歳以上ですか？
      </p>
      <div>
        <button onClick={handleApprove} disabled={isLoading}>
          {isLoading ? '認証中...' : '18歳以上です'}
        </button>
        <a href="https://www.yahoo.co.jp/" aria-label="Yahooへ">
          18歳未満です
        </a>
      </div>
    </main>
  );
}
