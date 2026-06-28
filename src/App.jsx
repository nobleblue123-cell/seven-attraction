import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './components/Background';
import Landing from './pages/Landing';
import GenderSelect from './pages/GenderSelect';
import AgeSelect from './pages/AgeSelect';
import Quiz from './pages/Quiz';
import Loading from './pages/Loading';
import AdScreen from './pages/AdScreen';
import Result from './pages/Result';
import CookieConsent from './components/CookieConsent';

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [answers, setAnswers] = useState([]);

  useEffect(() => { window.scrollTo(0, 0); }, [screen]);

  function handleFinish(ans) {
    setAnswers(ans);
    setScreen('loading');
    setTimeout(() => setScreen('ad'), 2800);
  }

  function handleRetry() {
    setScreen('landing');
    setGender('');
    setAge('');
    setAnswers([]);
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Background />
      <CookieConsent />
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {screen === 'landing' && <Landing onStart={() => setScreen('gender')} />}
          {screen === 'gender' && (
            <GenderSelect onSelect={g => { setGender(g); setScreen('age'); }} />
          )}
          {screen === 'age' && (
            <AgeSelect onSelect={a => { setAge(a); setScreen('quiz'); }} />
          )}
          {screen === 'quiz' && <Quiz onFinish={handleFinish} />}
          {screen === 'loading' && <Loading />}
          {screen === 'ad' && <AdScreen onDone={() => setScreen('result')} />}
          {screen === 'result' && (
            <Result answers={answers} gender={gender} age={age} onRetry={handleRetry} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
