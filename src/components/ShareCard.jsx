import { forwardRef } from 'react';

const ShareCard = forwardRef(function ShareCard({ lv, gender, age, analysis }, ref) {
  const barColor = (pct) =>
    pct >= 80 ? '#a78bfa' : pct >= 60 ? '#c4b5fd' : pct >= 40 ? '#e9d5ff' : '#6b7280';

  return (
    <div ref={ref} style={{
      position: 'fixed',
      left: -9999,
      top: 0,
      width: 400,
      height: 711,
      background: 'linear-gradient(160deg, #0d0820 0%, #1a0a2e 40%, #200a1e 100%)',
      color: '#fff',
      fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 32px 60px',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      {/* 배경 orb */}
      <div style={{
        position: 'absolute', top: -60, left: -60,
        width: 280, height: 280,
        background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: 80, right: -40,
        width: 240, height: 240,
        background: 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />

      {/* 상단 레이블 */}
      <div style={{
        fontSize: 12, letterSpacing: 3, color: 'rgba(255,255,255,0.35)',
        textTransform: 'uppercase', marginBottom: 8, position: 'relative',
      }}>
        7의 남녀 테스트
      </div>

      {/* 나이·성별 */}
      <div style={{
        fontSize: 13, color: 'rgba(255,255,255,0.45)',
        marginBottom: 28, position: 'relative',
      }}>
        {age} {gender}자
      </div>

      {/* 점수 */}
      <div style={{
        position: 'relative',
        display: 'flex', alignItems: 'baseline', gap: 4,
        marginBottom: 6,
      }}>
        <span style={{
          fontSize: 130, fontWeight: 900, lineHeight: 1,
          color: '#ffffff',
          textShadow: '0 0 60px rgba(196,181,253,0.5)',
        }}>
          {lv.score}
        </span>
        <span style={{ fontSize: 28, fontWeight: 700, color: 'rgba(255,255,255,0.3)' }}>
          /10
        </span>
      </div>

      {/* 타이틀 */}
      <div style={{
        fontSize: 20, fontWeight: 900, marginBottom: 6, position: 'relative',
      }}>
        {lv.emoji} {lv.title}
      </div>

      {/* 설명 */}
      <div style={{
        fontSize: 12, color: 'rgba(255,255,255,0.45)', textAlign: 'center',
        lineHeight: 1.7, marginBottom: 28, maxWidth: 300, position: 'relative',
      }}>
        {lv.desc.length > 60 ? lv.desc.slice(0, 60) + '...' : lv.desc}
      </div>

      {/* 점수 사다리 */}
      <div style={{
        display: 'flex', gap: 6, marginBottom: 32, position: 'relative',
      }}>
        {[1,2,3,4,5,6,7,8,9,10].map(n => (
          <div key={n} style={{
            width: 26, height: 26, borderRadius: '50%',
            fontSize: 11, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: n === lv.score
              ? 'linear-gradient(135deg,#7c3aed,#ec4899)'
              : n < lv.score ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.07)',
            color: n <= lv.score ? '#fff' : 'rgba(255,255,255,0.2)',
            border: n === lv.score ? 'none' : '1px solid rgba(255,255,255,0.08)',
          }}>
            {n}
          </div>
        ))}
      </div>

      {/* 분석 바 */}
      {analysis && (
        <div style={{
          width: '100%', position: 'relative',
          display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28,
        }}>
          {analysis.map((cat, i) => (
            <div key={i}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: 12, marginBottom: 5,
              }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {cat.icon} {cat.label}
                </span>
                <span style={{ color: barColor(cat.pct), fontWeight: 700 }}>
                  {cat.valueLabel}
                </span>
              </div>
              <div style={{
                height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 100,
              }}>
                <div style={{
                  height: '100%',
                  width: `${cat.pct}%`,
                  background: 'linear-gradient(90deg,#7c3aed,#ec4899)',
                  borderRadius: 100,
                }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 하단 CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(135deg, rgba(124,58,237,0.9), rgba(236,72,153,0.9))',
        padding: '14px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>
            나도 테스트 해보기
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: 0.5 }}>
            seven-attraction.vercel.app
          </div>
        </div>
        <div style={{
          fontSize: 22, fontWeight: 900, color: '#fff',
          background: 'rgba(255,255,255,0.2)', borderRadius: 20,
          padding: '4px 14px',
        }}>
          →
        </div>
      </div>
    </div>
  );
});

export default ShareCard;
