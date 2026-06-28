export default function Background() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes fl1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,50px)} }
        @keyframes fl2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-40px)} }
        @keyframes fl3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,30px)} }
        .orb { position:absolute; border-radius:50%; filter:blur(100px); opacity:.11; }
        .orb1 { width:700px;height:700px;background:#7c3aed;top:-200px;right:-150px;animation:fl1 9s ease-in-out infinite; }
        .orb2 { width:550px;height:550px;background:#ec4899;bottom:-150px;left:-150px;animation:fl2 11s ease-in-out infinite; }
        .orb3 { width:350px;height:350px;background:#f59e0b;top:45%;left:35%;animation:fl3 13s ease-in-out infinite; }
      `}</style>
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
    </div>
  );
}
