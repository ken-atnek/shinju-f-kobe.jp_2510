/* =======================================
 * 真珠夫人神戸本店 共通ユーティリティ
 * 画面幅に応じた条件判定を行うカスタムフック。
 * レスポンシブ対応用に利用する。
 * URL: src/hooks/useMediaQuery.ts
 * Created: 2025-09-20
 * Last updated: 2025-09-20
 * ======================================= */

import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    listener(); // 初回チェック
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};
