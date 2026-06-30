import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions, analysisCats, getLevel } from '../data/questions';
import SiteFooter from '../components/SiteFooter';

function calcScore(answers) {
  return answers.reduce((s, a, i) => (a === null ? s : s + questions[i].options[a].score), 0);
}

function getAnalysis(answers) {
  return analysisCats.map(cat => {
    const valid = cat.qs.filter(qi => answers[qi] !== null);
    const earned = valid.reduce((s, qi) => s + questions[qi].options[answers[qi]].score, 0);
    const pct = valid.length ? Math.round((earned / (valid.length * 5)) * 100) : 0;
    const valueLabel =
      pct >= 80 ? '매우 우수' : pct >= 60 ? '우수' : pct >= 40 ? '보통' : pct >= 20 ? '부족' : '개선 필요';
    return { ...cat, pct, valueLabel };
  });
}

function pctToLabel(pct) {
  return pct >= 80 ? '매우 우수' : pct >= 60 ? '우수' : pct >= 40 ? '보통' : pct >= 20 ? '부족' : '개선 필요';
}

function Confetti() {
  const colors = ['#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f472b6'];
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
      <style>{`@keyframes cfFall { to { transform:translateY(110vh) rotate(720deg); opacity:0; } }`}</style>
      {Array.from({ length: 80 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute', top: -12,
          left: `${Math.random() * 100}%`,
          width: Math.random() * 10 + 5,
          height: Math.random() * 10 + 5,
          background: colors[Math.floor(Math.random() * colors.length)],
          borderRadius: Math.random() > 0.5 ? '50%' : 3,
          animation: `cfFall ${Math.random() * 2 + 2}s linear ${Math.random()}s forwards`,
        }} />
      ))}
    </div>
  );
}

function Toast({ msg, onHide }) {
  useEffect(() => {
    const t = setTimeout(onHide, 2800);
    return () => clearTimeout(t);
  }, [onHide]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      style={{
        position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(20,10,40,.95)', border: '1px solid rgba(124,58,237,.3)',
        color: '#fff', padding: '14px 28px', borderRadius: 100,
        fontSize: 14, backdropFilter: 'blur(20px)', whiteSpace: 'nowrap', zIndex: 9999,
      }}
    >
      {msg}
    </motion.div>
  );
}

function AnalysisCard({ cat, delay }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(cat.pct), 700 + delay * 200);
    return () => clearTimeout(t);
  }, [cat.pct, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.55 + delay * 0.1 }}
      style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 22, padding: 24, backdropFilter: 'blur(20px)',
      }}
    >
      <div style={{ fontSize: 26, marginBottom: 10 }}>{cat.icon}</div>
      <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.3px', marginBottom: 6 }}>
        {cat.label}
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{cat.valueLabel}</div>
      <div style={{ height: 3, background: 'rgba(255,255,255,.08)', borderRadius: 100, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 100,
          background: 'linear-gradient(90deg,#7c3aed,#ec4899)',
          width: `${width}%`,
          transition: 'width 1s ease',
        }} />
      </div>
    </motion.div>
  );
}

export default function Result({ answers, gender, age, sharedData, onRetry }) {
  const isShared = !!sharedData;

  // 공유 링크로 온 경우 sharedData에서, 직접 테스트한 경우 answers에서 계산
  const total = isShared ? sharedData.s : calcScore(answers);
  const lv = getLevel(total);
  const analysis = isShared
    ? analysisCats.map((cat, i) => {
        const pct = sharedData.p?.[i] ?? 0;
        return { ...cat, pct, valueLabel: pctToLabel(pct) };
      })
    : getAnalysis(answers);

  const [toast, setToast] = useState('');
  const [sharing, setSharing] = useState(false);

  // 테스트 완료 시 결과를 URL에 인코딩해서 공유 가능하게
  useEffect(() => {
    if (!isShared) {
      try {
        const encoded = btoa(encodeURIComponent(JSON.stringify({
          s: lv.score,
          g: gender,
          a: age,
          p: analysis.map(c => c.pct),
        })));
        window.history.replaceState(null, '', `?r=${encoded}`);
      } catch {}
    }
  }, []);

  // 링크 공유
  async function doShare() {
    setSharing(true);
    try {
      const url = window.location.href;
      const title = `나의 7의 남녀 점수: ${lv.score}점`;
      const text = `나는 ${lv.score}점짜리 사람! ${lv.emoji} ${lv.title}\n나도 테스트 해봐 →`;

      if (navigator.share) {
        await navigator.share({ url, title, text });
      } else {
        await navigator.clipboard.writeText(url);
        setToast('링크가 복사됐어요!');
      }
    } catch (e) {
      if (e?.name !== 'AbortError') setToast('공유에 실패했어요. 다시 시도해주세요.');
    } finally {
      setSharing(false);
    }
  }

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  });

  return (
    <>
      {lv.score >= 7 && <Confetti />}
      <AnimatePresence>{toast && <Toast msg={toast} onHide={() => setToast('')} />}</AnimatePresence>

      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        padding: '60px 20px 80px',
        position: 'relative', zIndex: 1,
        maxWidth: 700, margin: '0 auto', width: '100%',
      }}>

        {/* 공유 링크로 접속한 경우 배너 */}
        {isShared && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'linear-gradient(135deg,rgba(124,58,237,.15),rgba(236,72,153,.15))',
              border: '1px solid rgba(124,58,237,.25)',
              borderRadius: 16, padding: '14px 20px',
              marginBottom: 32, textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', marginBottom: 10 }}>
              친구의 결과를 보고 있어요!
            </div>
            <button
              onClick={onRetry}
              style={{
                background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
                color: '#fff', border: 'none', borderRadius: 100,
                padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              }}
            >
              나도 테스트 해보기 →
            </button>
          </motion.div>
        )}

        {/* Score header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: 16 }}>
            <span style={{
              fontSize: 11, letterSpacing: 3, color: 'rgba(255,255,255,.3)',
              textTransform: 'uppercase', display: 'block', marginBottom: 8,
            }}>
              7의 남녀 테스트
            </span>
            <span style={{
              fontSize: 12, letterSpacing: 2, color: 'var(--muted)',
              textTransform: 'uppercase',
            }}>
              {age} {gender}자의 매력 점수
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            style={{ lineHeight: 1 }}
          >
            <span style={{
              fontSize: 'clamp(100px,20vw,160px)', fontWeight: 900, lineHeight: 1,
              color: '#ffffff',
              textShadow: '0 0 60px rgba(196,181,253,0.6), 0 0 120px rgba(244,114,182,0.3)',
              display: 'inline-block',
            }}>
              {lv.score}
            </span>
            <span style={{ fontSize: 34, fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>/10</span>
          </motion.div>

          {/* Score ladder */}
          <motion.div {...fadeUp(0.35)} style={{
            display: 'flex', gap: 8, justifyContent: 'center', margin: '24px 0 32px',
          }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <div key={n} style={{
                width: 32, height: 32, borderRadius: '50%',
                border: n <= lv.score ? 'none' : '1.5px solid rgba(255,255,255,.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700,
                background: n === lv.score
                  ? 'linear-gradient(135deg,#7c3aed,#ec4899)'
                  : n < lv.score ? 'rgba(124,58,237,.28)' : 'transparent',
                color: n <= lv.score ? '#fff' : 'rgba(255,255,255,.25)',
                transform: n === lv.score ? 'scale(1.25)' : 'scale(1)',
                boxShadow: n === lv.score ? '0 8px 24px rgba(124,58,237,.55)' : 'none',
              }}>
                {n}
              </div>
            ))}
          </motion.div>

          <motion.h2 {...fadeUp(0.45)} style={{
            fontSize: 'clamp(22px,5vw,32px)', fontWeight: 900, marginBottom: 14,
          }}>
            {lv.emoji} {lv.title}
          </motion.h2>

          <motion.p {...fadeUp(0.5)} style={{
            fontSize: 15, color: 'var(--muted)', lineHeight: 1.8,
            maxWidth: 480, margin: '0 auto',
          }}>
            {lv.desc}
          </motion.p>
        </div>

        {/* Analysis grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginBottom: 24,
        }}>
          {analysis.map((cat, i) => (
            <AnalysisCard key={i} cat={cat} delay={i} />
          ))}
        </div>

        {/* Ad Banner — 분석 그리드 아래 */}
        <motion.div {...fadeUp(0.68)} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          marginBottom: 24,
        }}>
          <span style={{
            fontSize: 10, color: 'rgba(255,255,255,.15)',
            letterSpacing: 1, marginBottom: 8,
          }}>
            광고
          </span>
          <div style={{
            width: 320, minHeight: 100,
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,.06)',
            borderRadius: 14, overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ins
              className="kakao_ad_area"
              style={{ display: 'none' }}
              data-ad-unit="DAN-qiZSlb9dWeQeU5Z5"
              data-ad-width="320"
              data-ad-height="100"
            />
          </div>
        </motion.div>

        {/* Advice */}
        <motion.div {...fadeUp(0.72)} style={{
          background: 'linear-gradient(135deg,rgba(124,58,237,.08),rgba(236,72,153,.08))',
          border: '1px solid rgba(124,58,237,.18)',
          borderRadius: 22, padding: 28, marginBottom: 32,
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#c4b5fd', marginBottom: 18 }}>
            💡 당신을 위한 맞춤 조언
          </div>
          <ul style={{ listStyle: 'none' }}>
            {lv.advice.map((a, i) => (
              <li key={i} style={{
                display: 'flex', gap: 12, fontSize: 14, color: 'var(--muted)',
                lineHeight: 1.65, marginBottom: i < lv.advice.length - 1 ? 10 : 0,
              }}>
                <span style={{ color: '#ec4899', flexShrink: 0 }}>→</span>
                {a}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Actions */}
        <motion.div {...fadeUp(0.8)} style={{
          display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center',
        }}>
          <motion.button
            whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(124,58,237,.45)' }}
            whileTap={{ scale: 0.97 }}
            onClick={doShare}
            disabled={sharing}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: sharing ? 'rgba(124,58,237,0.5)' : 'linear-gradient(135deg,#7c3aed,#ec4899)',
              color: '#fff', padding: '16px 38px', borderRadius: 100,
              fontSize: 15, fontWeight: 700,
              cursor: sharing ? 'default' : 'pointer',
              transition: 'background .2s', border: 'none',
            }}
          >
            {sharing ? '공유 중...' : '결과 공유하기 🔗'}
          </motion.button>

          <motion.button
            whileHover={{ background: 'rgba(255,255,255,.09)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onRetry}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,.05)', border: '1px solid var(--border)',
              color: 'var(--muted)', padding: '16px 36px', borderRadius: 100, fontSize: 15,
              cursor: 'pointer',
            }}
          >
            ↺ 다시 테스트
          </motion.button>
        </motion.div>
      </div>

      <SiteFooter />
    </>
  );
}
