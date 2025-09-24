/* =======================================
 * TOPページ スライドバナー
 * URL:src/components/PageTop/ContainerSlideBan.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2025-09-20
 * Last updated: 2025-09-20
 * ======================================= */
'use client';
import styles from '@/styles/PageTop.module.scss';
import {
  useBannerItemsWithModal,
  renderBannerItem,
} from '@/lib/renderBannerItem';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const DATA_URL = `/data/kobe/top_ban_main.json`;

const ContainerSlideBan = () => {
  const [items, setModalImage, modal] = useBannerItemsWithModal(DATA_URL);

  // itemsが0件なら何も描画しない
  if (items.length === 0) return null;

  return (
    <>
      <section className={styles.containerSlideBan}>
        {items.length > 0 && (
          <Splide
            className={styles.bannerList}
            options={{
              type: 'loop',
              autoplay: true,
              interval: 4000,
              pauseOnHover: true,
              perPage: 1,
              gap: '3rem',
              speed: 800,
              padding: '15%',
            }}
            aria-label="バナー"
          >
            {items.map((item, i) => (
              <SplideSlide key={item.banId || i}>
                {renderBannerItem(item, setModalImage, true)}
              </SplideSlide>
            ))}
          </Splide>
        )}
      </section>
      {modal}
    </>
  );
};

export default ContainerSlideBan;
