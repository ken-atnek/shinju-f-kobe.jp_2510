/* =======================================
 * 店舗 キャストプロフィールコンポーネント
 * URL: src/components/PageProfile/CastProfile.tsx
 * Referenced in: src/app/profile/page.tsx
 * Created: 2025-09-27
 * Last updated: 2025-09-27
 * ======================================= */
'use client';
import styles from '@/styles/PageProfile.module.scss';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import type { CastDetail } from '@/types/CastDetails';
import { typeLabels } from '@/constants/castTypeLabels';
import { badgeLabels } from '@/constants/castBadgeLabels';
import ExternalLink from '@/components/common/ExternalLink';
import { convertRemToPx } from '@/lib/convertRemToPx';
import Image from 'next/image';
import Link from 'next/link';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import CastSchedule from '@/components/PageProfile/CastSchedule';

const CastProfile = () => {
  const searchParams = useSearchParams();
  const castId = searchParams.get('id');
  const [cast, setCast] = useState<CastDetail | null>(null);
  const [error, setError] = useState(false);

  // 前後のキャスト判定
  const [prevCastId, setPrevCastId] = useState<string | null>(null);
  const [nextCastId, setNextCastId] = useState<string | null>(null);
  const queryParams = new URLSearchParams(window.location.search);
  const type = queryParams.get('type'); // デフォルト値なし
  const rankingType = queryParams.get('rankingType');
  // 前後キャスト情報の取得
  useEffect(() => {
    try {
      const castOrderStr = sessionStorage.getItem('castOrder_castlist');
      if (!castOrderStr) return;

      type CastOrderItem = { id: string; name: string };
      const castOrder = JSON.parse(castOrderStr) as CastOrderItem[];
      const currentId = castId;
      if (!currentId) return;

      const currentIndex = castOrder.findIndex((c) => c.id === currentId);
      if (currentIndex === -1) return;

      const prev = castOrder[currentIndex - 1];
      const next = castOrder[currentIndex + 1];

      setPrevCastId(prev?.id || null);
      setNextCastId(next?.id || null);
    } catch {
      // エラー時は何もしない
    }
  }, [castId]);

  useEffect(() => {
    if (cast) {
      document.title = `${cast.castName}さんのプロフィール | 真珠夫人神戸本店`;

      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: cast.castName,
        description: `${cast.age ?? ''}歳 / ${cast.tall ?? ''}cm / ${cast.bust ?? ''}-${cast.west ?? ''}-${cast.hip ?? ''} (${cast.cup ?? ''})`,
        image: cast.castImage,
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      script.id = 'structured-data-cast';

      const existing = document.getElementById('structured-data-cast');
      if (existing) {
        existing.remove();
      }

      document.head.appendChild(script);
    }
  }, [cast]);

  useEffect(() => {
    if (!castId) return;

    const fetchCastData = async () => {
      try {
        const timestamp =
          process.env.NODE_ENV === 'development' ? Date.now() : '';
        const dataPath = `/cast/kobe/${castId}/details.json${timestamp ? `?t=${timestamp}` : ''}`;

        const response = await fetch(dataPath);
        if (!response.ok) {
          throw new Error('キャスト情報が見つかりません');
        }

        const data = await response.json();
        setCast(data);
        setError(false);
      } catch {
        setCast(null);
        setError(true);
      }
    };

    fetchCastData();
  }, [castId]);

  if (!castId) {
    return (
      <section className={styles.containerHeadNav}>
        キャストIDが指定されていません
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.containerHeadNav}>
        キャスト情報が見つかりません
      </section>
    );
  }

  if (!cast) {
    return <section className={styles.containerHeadNav}>読み込み中...</section>;
  }

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

  const rankingValue = getFirstRanking(cast.rankings);

  // 5枚目以降の画像を取得
  const slideImages = cast.profileImages
    ? [
        ...cast.profileImages.slice(4),
        ...Array(Math.max(0, 3 - cast.profileImages.slice(4).length)).fill(
          '/images/kobe/no-image.webp'
        ),
      ]
    : Array(5).fill('/images/kobe/no-image.webp');

  return (
    <>
      <section className={styles.containerHeadNav}>
        <nav className={styles.blockCastNav}>
          {prevCastId ? (
            <Link
              href={`/profile/?id=${prevCastId}${type ? `&type=${type}` : ''}${type === 'ranking' && rankingType ? `&rankingType=${rankingType}` : ''}`}
              className={styles.linkPrevCastDetail}
            >
              <span>PREV</span>
            </Link>
          ) : (
            <div></div>
          )}
          <Link href={`/cast/`} className={styles.linkCastList}>
            <span>LIST</span>
          </Link>
          {nextCastId ? (
            <Link
              href={`/profile/?id=${nextCastId}${type ? `&type=${type}` : ''}${type === 'ranking' && rankingType ? `&rankingType=${rankingType}` : ''}`}
              className={styles.linkNextCastDetail}
            >
              <span>NEXT</span>
            </Link>
          ) : (
            <div></div>
          )}
        </nav>
      </section>
      <section className={styles.containerProfileTop}>
        <article>
          <div className={styles.itemImage}>
            <Image
              src={
                cast.profileImages && cast.profileImages.length > 0
                  ? cast.profileImages[0]
                  : `/images/kobe/no-image.webp`
              }
              alt={`${cast.castName}の画像1`}
              width={580}
              height={773}
            />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.wrapBadges}>
              {cast.badges && cast.badges.length > 0 && (
                <ul>
                  {cast.badges.map((badge, i) =>
                    badgeLabels[badge] ? (
                      <li key={i} className={styles[badge]}>
                        {badgeLabels[badge]}
                      </li>
                    ) : null
                  )}
                </ul>
              )}
            </div>
            <div className={styles.castNameEn}>{cast.castNameEn}</div>
            <h2 className={styles.castName}>{cast.castName}</h2>
            <div className={styles.age}>{cast.age}</div>
            <div className={styles.castSize}>
              <span className={styles.tall}>{cast.tall}</span>
              <span className={styles.bust}>
                {cast.bust}
                <i>{cast.cup}</i>
              </span>
              <span className={styles.west}>{cast.west}</span>
              <span className={styles.hip}>{cast.hip}</span>
            </div>
            {rankingValue !== undefined && (
              <div className={styles.wrapRanking}>
                <div className={styles.itemRanking}>
                  <span>{rankingValue}</span>
                </div>
              </div>
            )}
            <ul className={styles.listType}>
              {cast.type.map((typeId, i) => {
                const label = typeLabels[typeId];
                return label ? (
                  <li key={i}>
                    <span>{label}</span>
                  </li>
                ) : null;
              })}
            </ul>
            <p className={styles.catchCopy}>{cast.catchCopy}</p>
            <nav className={styles.wrapLink}>
              {cast.photoBlogUrl && (
                <ExternalLink
                  href={cast.photoBlogUrl}
                  className={styles.photoBlog}
                >
                  <span>写メ日記</span>
                </ExternalLink>
              )}
              {cast.photoBlogUrl && (
                <ExternalLink
                  href={cast.reservationUrl}
                  className={styles.reservationUrl}
                >
                  <span>WEB予約</span>
                </ExternalLink>
              )}
            </nav>
          </div>
        </article>
      </section>
      {slideImages.length > 0 && (
        <section className={styles.containerSlideImage}>
          <Splide
            options={{
              type: 'loop',
              perPage: 1,
              gap: '0',
              interval: 2000,
              speed: 800,
              padding: '0',
              autoplay: true,
              pauseOnHover: false,
            }}
            aria-label="キャスト追加画像"
          >
            {slideImages.map((src, idx) => (
              <SplideSlide key={idx}>
                <Image
                  src={src}
                  alt={`${cast.castName}の画像${idx + 5}`}
                  width={580}
                  height={773}
                />
              </SplideSlide>
            ))}
          </Splide>
        </section>
      )}
      {cast && <CastSchedule castId={cast.castId} />}
      <section className={styles.containerBottom}>
        <article>
          {/* Q & A */}
          <div className={styles.boxQuestions}>
            <span className={styles.sidebarH2}>Q&A</span>
            <ul>
              {cast.questions?.map((item, index) => (
                <li key={index}>
                  <span className={styles.labelQuestion}>{item.question}</span>
                  <span className={styles.labelAnswer}>{item.answer}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={clsx(styles.itemImage, styles.main02)}>
            <Image
              src={
                cast.profileImages && cast.profileImages.length > 1
                  ? cast.profileImages[1]
                  : `/images/kobe/no-image.webp`
              }
              alt={`${cast.castName}の画像1`}
              width={580}
              height={773}
            />
          </div>
          <div className={clsx(styles.itemImage, styles.main03)}>
            <Image
              src={
                cast.profileImages && cast.profileImages.length > 2
                  ? cast.profileImages[2]
                  : `/images/kobe/no-image.webp`
              }
              alt={`${cast.castName}の画像1`}
              width={580}
              height={773}
            />
          </div>
          {/* 女の子コメント */}
          <div className={styles.boxCastMessage}>
            <span className={styles.sidebarH2}>cast message</span>
            <h2 className={styles.itemH2}>メッセージ</h2>
            <div className={styles.boxInner}>
              <div className={styles.wrapCastMessage}>
                {cast.castMessage && (
                  <div
                    className={styles.castMessage}
                    dangerouslySetInnerHTML={{
                      __html: convertRemToPx(cast.castMessage),
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          {/* お店のコメント */}
          <div className={styles.boxShopComment}>
            <span className={styles.sidebarH2}>SHOP COMMENT</span>
            <h2 className={styles.itemH2}>ショップコメント</h2>
            <div className={styles.boxInner}>
              <div className={styles.wrapShopComment}>
                {cast.shopComment && (
                  <div
                    className={styles.shopComment}
                    dangerouslySetInnerHTML={{
                      __html: convertRemToPx(cast.shopComment),
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={clsx(styles.itemImage, styles.main04)}>
            <Image
              src={
                cast.profileImages && cast.profileImages.length > 3
                  ? cast.profileImages[3]
                  : `/images/kobe/no-image.webp`
              }
              alt={`${cast.castName}の画像1`}
              width={580}
              height={773}
            />
          </div>
        </article>
      </section>
      <section className={styles.containerBottomNav}>
        <nav className={styles.blockCastNav}>
          {prevCastId ? (
            <Link
              href={`/profile/?id=${prevCastId}${type ? `&type=${type}` : ''}${type === 'ranking' && rankingType ? `&rankingType=${rankingType}` : ''}`}
              className={styles.linkPrevCastDetail}
            >
              <span>PREV</span>
            </Link>
          ) : (
            <div></div>
          )}
          <Link href={`/cast/`} className={styles.linkCastList}>
            <span>LIST</span>
          </Link>
          {nextCastId ? (
            <Link
              href={`/profile/?id=${nextCastId}${type ? `&type=${type}` : ''}${type === 'ranking' && rankingType ? `&rankingType=${rankingType}` : ''}`}
              className={styles.linkNextCastDetail}
            >
              <span>NEXT</span>
            </Link>
          ) : (
            <div></div>
          )}
        </nav>
      </section>
    </>
  );
};

export default CastProfile;
