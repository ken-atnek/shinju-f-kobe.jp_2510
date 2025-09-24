/* =======================================
 *神戸ホットポイントグループ TOPページ
 * URL: /app/page.tsx
 * Created: 2025-08-18
 * Last updated: 2025-08-18
 * ======================================= */

import type { Metadata } from 'next';

import { isRealProduction } from '@/lib/env';
import ContainerMovie from '@/components/PageTop/ContainerMovie';
import ContainerShopInfo from '@/components/PageTop/ContainerShopInfo';
import ContainerPickUp from '@/components/PageTop/ContainerPickUp';
import PearlLineTopRight from '@/components/Decoration/PearlLineTopRight';
import ContainerSlideBan from '@/components/PageTop/ContainerSlideBan';
import ContainerRanking from '@/components/PageTop/ContainerRanking';
export const generateMetadata = (): Metadata => {
  return {
    title: '神戸・三宮の風俗｜真珠夫人神戸本店',
    description: isRealProduction
      ? '真珠夫人神戸本店のディスクリプション'
      : undefined,
  };
};
export default function PageTop() {
  return (
    <main>
      <ContainerMovie />
      <ContainerShopInfo />
      <PearlLineTopRight zIndex={2} />
      <ContainerPickUp />
      <ContainerSlideBan />
      <ContainerRanking />
    </main>
  );
}
