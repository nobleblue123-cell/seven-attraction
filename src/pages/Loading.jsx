import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const msgs = [
  '답변을 정밀 분석하고 있어요',
  '매력 지수를 계산하고 있어요',
  '최종 점수를 산출하는 중이에요',
];

export default function Loading() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setIdx(i => (i < msgs.length - 1 ? i + 1 : i));
    }, 900);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      position: 'relative', zIndex: 1,
    }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes dot { 0%,80%,100%{transform:scale(.5);opacity:.3} 40%{transform:scale(1);opacity:1} }
      `}</style>

      <div style={{
        width: 110, height: 110, borderRadius: '50%',
        border: '3px solid rgba(255,255,255,.06)',
        borderTopColor: '#7c3aed', borderRightColor: '#ec4899',
        animation: 'spin 1s linear infinite',
        marginBottom: 32,
      }} />

      <div style={{ fontSize: 18, fontWeight: 500 }}>매력 점수 분석 중</div>

      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: 14, color: 'var(--muted)', marginTop: 10 }}
      >
        {msgs[idx]}
      </motion.div>

      <div style={{ display: 'flex', gap: 6, marginTop: 24 }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
            background: '#7c3aed',
            animation: `dot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}
