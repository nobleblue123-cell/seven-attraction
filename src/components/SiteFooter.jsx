export default function SiteFooter() {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '28px 20px 20px',
      borderTop: '1px solid rgba(255,255,255,.05)',
      marginTop: 'auto',
    }}>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,.2)', lineHeight: 2 }}>
        © 2026 7의 남녀 테스트 &nbsp;·&nbsp;
        <a href="/privacy" style={{ color: 'rgba(255,255,255,.3)', textDecoration: 'none' }}
          onMouseEnter={e => e.target.style.color = '#c4b5fd'}
          onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.3)'}
        >
          개인정보처리방침
        </a>
        &nbsp;·&nbsp; 이 사이트는 광고를 포함합니다
      </p>
    </footer>
  );
}
