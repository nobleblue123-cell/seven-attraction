import { motion } from 'framer-motion';
import { useState } from 'react';

const ages = [
  { value: '10대', emoji: '🎒', label: '10대', sub: '~19세' },
  { value: '20대', emoji: '🎓', label: '20대', sub: '20~29세' },
  { value: '30대', emoji: '💼', label: '30대', sub: '30~39세' },
  { value: '40대+', emoji: '👔', label: '40대 이상', sub: '40세~' },
];

export default function AgeSelect({ onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '60px 20px',
      position: 'relative', zIndex: 1,
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'clamp(22px,5vw,34px)', fontWeight: 900, marginBottom: 12 }}
      >
        나이대를 선택해주세요
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 48 }}
      >
        나이에 맞는 맞춤 분석을 제공해드려요
      </motion.p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2,1fr)',
        gap: 16, maxWidth: 460, width: '100%',
      }}>
        {ages.map(({ value, emoji, label, sub }, i) => (
          <motion.button
            key={value}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.07 }}
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect(value)}
            style={{
              background: hovered === value ? 'rgba(124,58,237,.12)' : 'var(--card)',
              border: `1.5px solid ${hovered === value ? 'rgba(124,58,237,.5)' : 'var(--border)'}`,
              borderRadius: 24, padding: '32px 20px',
              cursor: 'pointer', backdropFilter: 'blur(20px)',
              transform: hovered === value ? 'translateY(-5px)' : 'translateY(0)',
              transition: 'all .22s ease',
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 12 }}>{emoji}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{label}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{sub}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
