/* =======================================
 * TOPページ ショップインフォ
 * URL:src/components/PageTop/ContainerMobileMenu.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2025-09-26
 * Last updated: 2025-09-26
 * ======================================= */
'use client';
import styles from '@/styles/PageTop.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
import { navMenu } from '@/constants/navMenuData';
import Link from 'next/link';
const ContainerMobileMenu = () => {
  const labelMap: Record<string, string> = {
    navCastList: '女の子',
    navReserve: '予約',
    navSchedule: '出勤',
    navPhotoBlog: '写メ',
  };

  const targetIds = [
    'navCastList',
    'navReserve',
    'navSchedule',
    'navPhotoBlog',
  ];
  const filteredMenu = targetIds
    .map((id) => navMenu.find((item) => item.id === id))
    .filter(Boolean) as typeof navMenu;

  return (
    <section className={styles.containerMobileMenu}>
      <nav>
        {filteredMenu.map((item) =>
          item.target ? (
            <ExternalLink
              key={item.id}
              href={item.href}
              className={styles[item.id]}
            >
              <span>{labelMap[item.id] ?? item.label}</span>
            </ExternalLink>
          ) : (
            <Link href={item.href} key={item.id} className={styles[item.id]}>
              <span>{labelMap[item.id] ?? item.label}</span>
            </Link>
          )
        )}
      </nav>
    </section>
  );
};

export default ContainerMobileMenu;
