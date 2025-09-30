/* =======================================
 * TOPページ ランキング
 * URL:src/components/PageTop/ContainerRanking.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2025-09-20
 * Last updated: 2025-09-20
 * ======================================= */
'use client';
import styles from '@/styles/PageTop.module.scss';
import clsx from 'clsx';
import CastDetailsBox from '@/components/common/CastDetailsBox';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useSplitText } from '@/hooks/useSplitText';
import { useEffect, useState } from 'react';
import type { CastDetail } from '@/types/CastDetails';
const DATA_URL = '/data/kobe/top_ranking.json';

const ContainerRanking = () => {
  const [rankingList, setRankingList] = useState<CastDetail[]>([]);

  const { ref: h2Ref, isVisible: h2Visible } =
    useScrollTrigger<HTMLDivElement>();
  const { ref: ulRef, isVisible: ulVisible } =
    useScrollTrigger<HTMLUListElement>();

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
        <div className={styles.boxH2} ref={h2Ref}>
          <div
            className={clsx(styles.enH2, {
              [styles['is-active']]: h2Visible,
            })}
            aria-label="ranking"
          >
            {useSplitText('ranking')}
          </div>
          <h2>総合ランキング</h2>
        </div>
        <ul
          className={clsx(styles.listRanking, {
            [styles['is-active']]: ulVisible,
          })}
          ref={ulRef}
        >
          {rankingList.map((item) => (
            <li key={item.castId} className={styles.innerRanking}>
              <CastDetailsBox item={item} typeParam="ranking" />
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default ContainerRanking;
