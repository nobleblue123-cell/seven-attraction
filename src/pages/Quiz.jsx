import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../data/questions';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export default function Quiz({ onFinish }) {
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [direction, setDirection] = useState(1);

  const q = questions[cur];
  const total = questions.length;
  const progress = ((cur + 1) / total) * 100;
  const selected = answers[cur];

  function pick(idx) {
    const next = [...answers];
    next[cur] = idx;
    setAnswers(next);
    setTimeout(() => {
      if (cur < total - 1) {
        setDirection(1);
        setCur(c => c + 1);
      } else {
        onFinish(next);
      }
    }, 380);
  }

  function goNext() {
    if (selected === null) return;
    if (cur < total - 1) {
      setDirection(1);
      setCur(c => c + 1);
    } else {
      onFinish(answers);
    }
  }

  function goPrev() {
    if (cur > 0) {
      setDirection(-1);
      setCur(c => c - 1);
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      padding: '40px 20px 60px', position: 'relative', zIndex: 1,
      maxWidth: 700, margin: '0 auto', width: '100%',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
        <span style={{ fontSize: 13, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
          {cur + 1} / {total}
        </span>
        <div style={{
          flex: 1, height: 3, background: 'rgba(255,255,255,.08)',
          borderRadius: 100, overflow: 'hidden',
        }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              height: '100%', borderRadius: 100,
              background: 'linear-gradient(90deg,#7c3aed,#ec4899)',
            }}
          />
        </div>
        <span style={{ fontSize: 20 }}>{q.category.split(' ')[0]}</span>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={cur}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 28, padding: 'clamp(24px,5vw,40px)',
            backdropFilter: 'blur(24px)', flex: 1,
          }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(124,58,237,.13)', border: '1px solid rgba(124,58,237,.22)',
            borderRadius: 100, padding: '5px 14px',
            fontSize: 11, color: '#c4b5fd', letterSpacing: '.3px',
            marginBottom: 22,
          }}>
            {q.category}
          </div>

          <p style={{
            fontSize: 'clamp(17px,4vw,21px)', fontWeight: 700,
            lineHeight: 1.55, marginBottom: 32,
          }}>
            {q.text}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {q.options.map((opt, i) => {
              const isSel = selected === i;
              return (
                <motion.button
                  key={i}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => pick(i)}
                  className="quiz-opt"
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    background: isSel ? 'rgba(124,58,237,.18)' : 'rgba(255,255,255,.025)',
                    border: `1.5px solid ${isSel ? '#7c3aed' : 'var(--border)'}`,
                    borderRadius: 16, padding: '17px 20px',
                    textAlign: 'left', color: '#fff', fontSize: 14, lineHeight: 1.5,
                    transition: 'background .18s, border-color .18s',
                  }}
                >
                  <span style={{
                    width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                    background: isSel ? '#7c3aed' : 'rgba(255,255,255,.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700,
                    color: isSel ? '#fff' : 'var(--muted)',
                    marginTop: 1, transition: 'all .18s',
                  }}>
                    {LETTERS[i]}
                  </span>
                  <span>{opt.text}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28 }}>
        <button
          onClick={goPrev}
          style={{
            visibility: cur > 0 ? 'visible' : 'hidden',
            background: 'rgba(255,255,255,.05)', border: '1px solid var(--border)',
            color: 'var(--muted)', padding: '13px 28px', borderRadius: 100, fontSize: 14,
          }}
        >
          ← 이전
        </button>
        <motion.button
          animate={{ opacity: selected !== null ? 1 : 0.3 }}
          onClick={goNext}
          style={{
            background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
            color: '#fff', padding: '13px 36px', borderRadius: 100,
            fontSize: 14, fontWeight: 700,
            pointerEvents: selected !== null ? 'all' : 'none',
          }}
        >
          {cur === total - 1 ? '결과 보기 →' : '다음 →'}
        </motion.button>
      </div>
    </div>
  );
}
