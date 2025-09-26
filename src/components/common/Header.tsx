/* =======================================
 *真珠夫人 HEADER
 * URL: src/components/common/Header.tsx
 * Created: 2025-09-25
 * Last updated: 2025-09-25
 * ======================================= */

import styles from '@/components/common/Header.module.scss';
import { navMenu } from '@/constants/navMenuData';
import ExternalLink from '@/components/common/ExternalLink';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={styles.containerHeader}>
      <section>
        <article>
          <h1>真珠夫人</h1>
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
                >
                  <span>{item.label}</span>
                </Link>
              )
            )}
          </nav>
        </article>
        <button type="button">電話</button>
      </section>
    </header>
  );
};

export default Header;
