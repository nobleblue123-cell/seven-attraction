import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TOTAL = 5;
const SKIP_AFTER = 3;

// ↓ AdSense 승인 후 본인 값으로 교체
const AD_CLIENT = 'ca-pub-8143724185524580';
const AD_SLOT   = 'XXXXXXXXXX';

export default function AdScreen({ onDone }) {
  const [seconds, setSeconds] = useState(TOTAL);
  const adRef = useRef(false);

  useEffect(() => {
    if (!adRef.current) {
      adRef.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {}
    }

    const id = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) { clearInterval(id); onDone(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', position: 'relative', zIndex: 1,
    }}>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: 12, color: 'rgba(255,255,255,.3)', letterSpacing: 1, marginBottom: 20 }}
      >
        잠깐 광고를 확인해주세요
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          width: '100%', maxWidth: 480, minHeight: 260,
          background: 'rgba(255,255,255,.03)',
          border: '1px solid rgba(255,255,255,.08)',
          borderRadius: 18, overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: 250 }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={AD_SLOT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: 28 }}
      >
        {seconds > SKIP_AFTER ? (
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,.25)' }}>
            {seconds}초 후 결과 확인 가능
          </span>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2, boxShadow: '0 12px 32px rgba(124,58,237,.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onDone}
            style={{
              background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
              color: '#fff', padding: '14px 40px', borderRadius: 100,
              fontSize: 15, fontWeight: 700,
            }}
          >
            결과 보기 →{seconds > 0 ? ` (${seconds})` : ''}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
