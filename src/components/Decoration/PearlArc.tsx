/* =======================================
 *真珠夫人神戸本店 パール円系オブジェクト
 * URL: src/components/Decoration/PearlArc.tsx
 * Created: 2025-09-20
 * Last updated: 2025-09-20
 * ======================================= */
'use client';
import Image from 'next/image';
import ImagePearl from '@/images/pearl01.webp';

type Props = {
  count?: number;
  radius?: number;
  startAngle?: number;
  endAngle?: number;
  size?: number;
};

export default function PearlArc({
  count = 20,
  radius = 200,
  startAngle = 0,
  endAngle = 360,
  size = 30,
}: Props) {
  const pearls = Array.from({ length: count }, (_, i) => i);
  const angleStep = count > 1 ? (endAngle - startAngle) / (count - 1) : 0;

  return (
    <div
      style={{
        position: 'relative',
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
    >
      {pearls.map((_, i) => {
        const angle = ((startAngle + angleStep * i) * Math.PI) / 180;
        const x = Math.cos(angle) * radius + radius;
        const y = Math.sin(angle) * radius + radius;
        return (
          <Image
            key={i}
            src={ImagePearl}
            alt=""
            width={size}
            height={size}
            style={{
              position: 'absolute',
              left: `${x}px`,
              top: `${y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </div>
  );
}
