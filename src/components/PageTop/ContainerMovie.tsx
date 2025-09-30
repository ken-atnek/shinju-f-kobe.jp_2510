/* =======================================
 * TOPページ 動画コンテナ
 * URL:src/components/PageTop/ContainerMovie.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2025-09-20
 * Last updated: 2025-09-20
 * ======================================= */
'use client';
import { useEffect, useState } from 'react';
import styles from '@/styles/PageTop.module.scss';
import clsx from 'clsx';
import PearlArc from '@/components/Decoration/PearlArc';
import { useMediaQuery } from '@/hooks/useMediaQuery';
type Movie = {
  id: string;
  visible: boolean;
  thumbnail: string;
  video_url: string;
  updated_at: string;
};

const DATA_URL = '/data/kobe/top_movie.json';

const ContainerMovie = () => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const url = `${DATA_URL}?t=${Date.now()}`;
    fetch(url)
      .then((res) => res.json())
      .then((list: Movie[]) => {
        const firstVisible = list.find((item) => item.visible);
        setMovie(firstVisible ?? null);
      });
  }, []);

  const isMobile = useMediaQuery('(max-width: 768px)');

  if (!movie) return null;

  return (
    <section className={styles.containerMovie}>
      <div className={clsx(styles.objectCirclePearl, styles.potionLeft)}>
        <PearlArc
          count={isMobile ? 18 : 21}
          radius={isMobile ? 170 : 400}
          startAngle={isMobile ? -90 : -90}
          endAngle={isMobile ? 90 : 90}
          size={isMobile ? 32 : 63}
        />
      </div>
      <div className={styles.itemMovie}>
        <video
          src={movie.video_url}
          poster={movie.thumbnail}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          width="100%"
          height="auto"
        />
      </div>
    </section>
  );
};

export default ContainerMovie;
