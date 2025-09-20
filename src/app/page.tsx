/* =======================================
 *神戸ホットポイントグループ TOPページ
 * URL: /app/page.tsx
 * Created: 2025-08-18
 * Last updated: 2025-08-18
 * ======================================= */

import type { Metadata } from 'next';

import { isRealProduction } from '@/lib/env';
export const generateMetadata = (): Metadata => {
  return {
    title: '神戸・三宮の風俗｜真珠夫人神戸本店',
    description: isRealProduction
      ? '真珠夫人神戸本店のディスクリプション'
      : undefined,
  };
};
export default function PageTop() {
  return <main>222346546</main>;
}
