import { motion } from 'framer-motion';
import { useState } from 'react';

const card = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function GenderSelect({ onSelect }) {
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
        나는 어느 쪽인가요?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 48 }}
      >
        성별에 맞는 맞춤 분석을 제공해드려요
      </motion.p>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { gender: '남', emoji: '👨', label: '남자', sub: '7의 남자 테스트', delay: 0.15 },
          { gender: '여', emoji: '👩', label: '여자', sub: '7의 여자 테스트', delay: 0.22 },
        ].map(({ gender, emoji, label, sub, delay }) => (
          <motion.button
            key={gender}
            variants={card}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay }}
            onMouseEnter={() => setHovered(gender)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect(gender)}
            style={{
              background: hovered === gender ? 'rgba(124,58,237,.12)' : 'var(--card)',
              border: `1.5px solid ${hovered === gender ? 'rgba(124,58,237,.5)' : 'var(--border)'}`,
              borderRadius: 28, padding: '40px 52px',
              cursor: 'pointer', flex: 1, minWidth: 160, maxWidth: 220,
              backdropFilter: 'blur(20px)',
              transform: hovered === gender ? 'translateY(-6px)' : 'translateY(0)',
              transition: 'all .25s ease',
            }}
          >
            <div style={{ fontSize: 60, marginBottom: 16 }}>{emoji}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{label}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>{sub}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
