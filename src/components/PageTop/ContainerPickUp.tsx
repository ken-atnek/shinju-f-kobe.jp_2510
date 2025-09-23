/* =======================================
 * TOPページ ピックアップ
 * URL:src/components/PageTop/ContainerPickUp.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2025-09-20
 * Last updated: 2025-09-20
 * ======================================= */
'use client';
import styles from '@/styles/PageTop.module.scss';
import { useEffect, useState } from 'react';
import type { CastDetail } from '@/types/CastDetails';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { typeLabels } from '@/constants/castTypeLabels';
import { badgeLabels } from '@/constants/castBadgeLabels';
import Image from 'next/image';
import Link from 'next/link';

const DATA_URL = '/data/kobe/top_pick_up.json';

// ランキングラベルの優先順リスト
const rankingKeys = ['rankingLabel01', 'rankingLabel02'];

const getFirstRanking = (rankings?: { [key: string]: number }) => {
  if (!rankings) return undefined;
  for (const key of rankingKeys) {
    if (rankings[key] !== undefined) {
      return rankings[key];
    }
  }
  return undefined;
};

// 共通の表示部分を関数化
const renderCastItem = (item: CastDetail) => {
  const rankingValue = getFirstRanking(item.rankings);
  return (
    <Link href="/" className={styles.itemDetails}>
      <div className={styles.itemImage}>
        <Image
          src={item.castImage}
          alt={item.castName}
          width={240}
          height={320}
          loading="lazy"
        />
      </div>
      <div className={styles.castInfo}>
        <div className={styles.wrapBadges}>
          {item.badges && item.badges.length > 0 && (
            <ul>
              {item.badges.map((badge, i) =>
                badgeLabels[badge] ? (
                  <li key={i} className={styles[badge]}>
                    {badgeLabels[badge]}
                  </li>
                ) : null
              )}
            </ul>
          )}
        </div>
        <div className={styles.wrapProfile}>
          <div className={styles.castNameEn}>{item.castNameEn}</div>
          <div className={styles.castName}>{item.castName}</div>
          <div className={styles.age}>{item.age}</div>
          <div className={styles.castSize}>
            <span className={styles.tall}>{item.tall}</span>
            <span className={styles.bust}>
              {item.bust}
              <i>{item.cup}</i>
            </span>
            <span className={styles.west}>{item.west}</span>
            <span className={styles.hip}>{item.hip}</span>
          </div>
        </div>
        {rankingValue !== undefined && (
          <div className={styles.wrapRanking}>
            <div className={styles.itemRanking}>
              <span>{rankingValue}</span>
            </div>
          </div>
        )}
        <ul className={styles.listType}>
          {(item.type.length > 4
            ? [...item.type].sort(() => Math.random() - 0.5).slice(0, 4)
            : item.type
          ).map((typeId, i) => {
            const label = typeLabels[typeId];
            return label ? (
              <li key={i}>
                <span>{label}</span>
              </li>
            ) : null;
          })}
        </ul>
        <p className={styles.catchCopy}>{item.catchCopy}</p>
      </div>
    </Link>
  );
};

const ContainerPickUp = () => {
  const [pickUps, setPickUps] = useState<CastDetail[]>([]);

  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((data: CastDetail[]) => setPickUps(data));
  }, []);

  if (pickUps.length === 0) return null;

  return (
    <section className={styles.containerPickUp}>
      <article>
        {pickUps.length === 1 ? (
          renderCastItem(pickUps[0])
        ) : (
          <Splide
            className={styles.pickupSplide}
            options={{
              type: 'loop',
              autoplay: true,
              interval: 5000,
              pauseOnHover: true,
              perPage: 1,
              speed: 1200,
            }}
            aria-label="ピックアップキャスト"
          >
            {pickUps.map((item) => (
              <SplideSlide key={item.castId}>
                {renderCastItem(item)}
              </SplideSlide>
            ))}
          </Splide>
        )}
      </article>
    </section>
  );
};

export default ContainerPickUp;
