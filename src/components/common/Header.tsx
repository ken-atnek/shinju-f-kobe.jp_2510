/* =======================================
 *真珠夫人 HEADER
 * URL: src/components/common/Header.tsx
 * Created: 2025-09-25
 * Last updated: 2025-09-25
 * ======================================= */

import styles from '@/components/common/Header.module.scss';
import clsx from 'clsx';
import { useEffect, useState, useRef, useCallback } from 'react';
import { navMenu } from '@/constants/navMenuData';
import ExternalLink from '@/components/common/ExternalLink';
import Link from 'next/link';

const Header = () => {
  // ハンバーガーメニュー操作
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const navRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // メニューを開く時：スクロールを禁止
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100vh';
    } else {
      // メニューを閉じる時：スタイルを復元
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    }

    return () => {
      // クリーンアップ：コンポーネントがアンマウントされた時にスタイルを復元
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        navRef.current &&
        hamburgerRef.current &&
        !navRef.current.contains(event.target as Node) &&
        !hamburgerRef.current.contains(event.target as Node) // ハンバーガーボタンを除外
      ) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleOutsideClick, true);
    return () =>
      document.removeEventListener('click', handleOutsideClick, true);
  }, [isOpen, closeMenu]);

  return (
    <header className={styles.containerHeader}>
      <section>
        <article
          className={clsx(
            styles.boxNav,
            isOpen && styles.isOpen,
            !isOpen && styles.closing
          )}
          ref={navRef}
          onClick={(e) => {
            // オーバーレイ部分（背景）をクリックした場合のみメニューを閉じる
            if (e.target === e.currentTarget) {
              closeMenu();
            }
          }}
        >
          <h1>
            <Link href="/">
              <svg width="268" height="85" aria-label="真珠夫人神戸本店">
                <title>真珠夫人神戸本店</title>
                <use href="#svg_logoMain" />
              </svg>
            </Link>
          </h1>
          <nav>
            {navMenu.map((item) =>
              item.target ? (
                <ExternalLink
                  key={item.id}
                  href={item.href}
                  className={styles[item.id]}
                >
                  <span>{item.label}</span>
                </ExternalLink>
              ) : (
                <Link
                  href={item.href}
                  key={item.id}
                  className={styles[item.id]}
                  onClick={closeMenu}
                >
                  <span>{item.label}</span>
                </Link>
              )
            )}
          </nav>
        </article>
      </section>
      <button
        ref={hamburgerRef}
        type="button"
        className={clsx(styles.hamburgerButton, isOpen && styles.isOpen)}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label="メニューを開閉"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

export default Header;
