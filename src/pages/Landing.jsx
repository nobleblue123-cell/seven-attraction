import { motion } from 'framer-motion';
import SiteFooter from '../components/SiteFooter';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] },
});

export default function Landing({ onStart }) {
  return (
    <>
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '80px 20px',
      position: 'relative', zIndex: 1,
    }}>
      <style>{`
        @keyframes btnGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(236,72,153,0); }
          50% { box-shadow: 0 0 40px 8px rgba(236,72,153,.25); }
        }
        .cta-btn { animation: btnGlow 3s ease 1.5s infinite; }
        .cta-btn:hover { opacity: .88; transform: translateY(-3px) scale(1.02) !important; }
        .cta-btn { transition: transform .2s ease, opacity .2s ease !important; }
      `}</style>

      {/* 연도 태그 — 최소한으로 */}
      <motion.p {...fadeUp(0)} style={{
        fontSize: 12, color: 'rgba(255,255,255,.3)',
        letterSpacing: 2, marginBottom: 28,
      }}>
        2026
      </motion.p>

      {/* 타이틀 */}
      <motion.h1 {...fadeUp(0.07)} style={{
        fontSize: 'clamp(72px, 17vw, 130px)', fontWeight: 900, lineHeight: .95,
        background: 'linear-gradient(160deg, #fff 30%, #c4b5fd 65%, #f472b6 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        letterSpacing: '-2px',
      }}>
        7의 남녀
      </motion.h1>

      {/* 한 줄 훅 */}
      <motion.p {...fadeUp(0.15)} style={{
        fontSize: 'clamp(16px, 4vw, 21px)', fontWeight: 500,
        color: 'rgba(255,255,255,.75)', marginTop: 24,
        lineHeight: 1.6,
      }}>
        10점 만점에 내가 몇 점짜리 사람인지<br />
        솔직하게 알고 싶지 않아?
      </motion.p>

      {/* 설명 — 자연스럽게 */}
      <motion.p {...fadeUp(0.22)} style={{
        fontSize: 14, color: 'rgba(255,255,255,.38)',
        marginTop: 14, lineHeight: 1.8, maxWidth: 360,
      }}>
        요즘 다들 얘기하는 그 점수.<br />
        외모만 보는 거 아님 — 성격, 직업, 경제력, 매력까지 다 봄.
      </motion.p>

      {/* CTA */}
      <motion.button
        {...fadeUp(0.3)}
        className="cta-btn"
        onClick={onStart}
        style={{
          marginTop: 44,
          background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
          color: '#fff', border: 'none',
          padding: '18px 52px', borderRadius: 100,
          fontSize: 17, fontWeight: 700, cursor: 'pointer',
        }}
      >
        나는 몇 점일까?
      </motion.button>

      {/* 미니 메타 — 한 줄로 */}
      <motion.p {...fadeUp(0.38)} style={{
        marginTop: 20, fontSize: 12,
        color: 'rgba(255,255,255,.22)',
        letterSpacing: '.3px',
      }}>
        20문항 · 약 3분 · 결과 즉시 확인
      </motion.p>
    </div>

    <SiteFooter />
    </>
  );
}
