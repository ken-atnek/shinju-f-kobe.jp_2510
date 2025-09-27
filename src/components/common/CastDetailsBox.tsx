import styles from '@/components/common/CastDetailsBox.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import { typeLabels } from '@/constants/castTypeLabels';
import { badgeLabels } from '@/constants/castBadgeLabels';
import type { CastDetail } from '@/types/CastDetails';
import Link from 'next/link';

type Props = {
  item: CastDetail;
  variant?: 'default' | 'notToday';
};

const CastDetailsBox = ({ item, variant = 'default' }: Props) => (
  <Link
    href="/"
    className={clsx(
      styles.boxCastDetails,
      variant === 'notToday' && styles.notToday
    )}
  >
    {item.badges && item.badges.length > 0 && (
      <ul className={styles.wrapBadges}>
        {item.badges.map((badge, i) =>
          badgeLabels[badge] ? (
            <li key={i} className={styles[badge]}>
              {badgeLabels[badge]}
            </li>
          ) : null
        )}
      </ul>
    )}

    {item.rankings?.rankingLabel01 !== undefined &&
    item.rankings?.rankingLabel01 !== null &&
    !isNaN(item.rankings.rankingLabel01) ? (
      <div className={styles.itemRanking}>
        <span>{item.rankings.rankingLabel01}</span>
      </div>
    ) : item.rankings?.rankingLabel02 !== undefined &&
      item.rankings?.rankingLabel02 !== null &&
      !isNaN(item.rankings.rankingLabel02) ? (
      <div className={styles.itemRanking}>
        <span>{item.rankings.rankingLabel02}</span>
      </div>
    ) : null}

    <div className={styles.wrapImage}>
      <Image
        src={item.castImage}
        alt={item.castName}
        width={240}
        height={320}
        loading="lazy"
      />
      {/* 出勤時間がある場合のみ todaySchedule を表示 */}
      {(item.schedule?.startTime && item.schedule?.endTime) ||
      item.schedule?.scheduleStatus ? (
        <div className={styles.todaySchedule}>
          <span>
            {item.schedule?.startTime && item.schedule?.endTime ? (
              <>
                <time dateTime={item.schedule.startTime}>
                  {item.schedule.startTime}
                </time>
                <time dateTime={item.schedule.endTime}>
                  {item.schedule.endTime}
                </time>
              </>
            ) : (
              ''
            )}
            {item.schedule?.scheduleStatus && (
              <p>{item.schedule.scheduleStatus}</p>
            )}
          </span>
        </div>
      ) : null}
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
    <ul className={styles.listType}>
      {(item.type.length > 3
        ? [...item.type].sort(() => Math.random() - 0.5).slice(0, 3)
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
  </Link>
);

export default CastDetailsBox;
