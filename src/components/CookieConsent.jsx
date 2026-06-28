import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'declined');
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            zIndex: 99999,
            background: 'rgba(10,8,22,0.97)',
            borderTop: '1px solid rgba(124,58,237,.25)',
            backdropFilter: 'blur(24px)',
            padding: '20px 24px',
            display: 'flex', alignItems: 'center', gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <p style={{
            flex: 1, fontSize: 13, color: 'rgba(255,255,255,.6)',
            lineHeight: 1.65, minWidth: 220,
          }}>
            이 사이트는 광고 서비스(Google AdSense) 제공을 위해 쿠키를 사용합니다.{' '}
            <a href="/privacy" style={{ color: '#c4b5fd', textDecoration: 'underline' }}>
              개인정보처리방침
            </a>
          </p>
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <button
              onClick={decline}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,.15)',
                color: 'rgba(255,255,255,.4)',
                padding: '9px 20px', borderRadius: 100,
                fontSize: 13, cursor: 'pointer',
              }}
            >
              거부
            </button>
            <button
              onClick={accept}
              style={{
                background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
                border: 'none', color: '#fff',
                padding: '9px 24px', borderRadius: 100,
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}
            >
              동의
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
