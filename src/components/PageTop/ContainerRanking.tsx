/* =======================================
 * TOPページ ランキング
 * URL:src/components/PageTop/ContainerRanking.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2025-09-20
 * Last updated: 2025-09-20
 * ======================================= */
'use client';
import styles from '@/styles/PageTop.module.scss';
import CastDetailsBox from '@/components/common/CastDetailsBox';
import { useEffect, useState } from 'react';
import type { CastDetail } from '@/types/CastDetails';
const DATA_URL = '/data/kobe/top_ranking.json';

const ContainerRanking = () => {
  const [rankingList, setRankingList] = useState<CastDetail[]>([]);

  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((data: CastDetail[]) => {
        // rankingLabel01の昇順でソート
        const sorted = [...data].sort(
          (a, b) =>
            (a.rankings?.rankingLabel01 ?? 999) -
            (b.rankings?.rankingLabel01 ?? 999)
        );
        setRankingList(sorted);
      });
  }, []);

  return (
    <section className={styles.containerRanking}>
      <article>
        <div className={styles.boxH2}>
          <span>ranking</span>
          <h2>総合ランキング</h2>
        </div>
        <ul className={styles.listRanking}>
          {rankingList.map((item) => (
            <li key={item.castId} className={styles.itemRanking}>
              <CastDetailsBox item={item} />
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default ContainerRanking;
