/* =======================================
 * TOPページ ランキング
 * URL:src/components/PageCast/CastList.tsx
 * Referenced in: : src/app/hot/cast/page.tsx
 * Created: 2025-09-26
 * Last updated: 2025-09-26
 * ======================================= */
'use client';
import styles from '@/styles/PageCast.module.scss';
import CastDetailsBox from '@/components/common/CastDetailsBox';
import { useEffect, useState } from 'react';
import type { CastDetail } from '@/types/CastDetails';
const DATA_URL = '/data/kobe/cast_list.json';

const CastList = () => {
  const [castList, setCastList] = useState<CastDetail[]>([]);

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
        setCastList(sorted);
      });
  }, []);

  return (
    <ul className={styles.listCast}>
      {castList.map((item) => (
        <li key={item.castId} className={styles.innerCastList}>
          <CastDetailsBox item={item} />
        </li>
      ))}
    </ul>
  );
};
export default CastList;
