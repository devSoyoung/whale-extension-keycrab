import React, { useEffect } from 'react';
import Header from './components/header';
import ListView from './components/listview';
import useKeywords from './components/hooks/useKeywords';

const App: React.FC = () => {
  const { keywords, fetchKeywordList } = useKeywords();
  useEffect(() => {
    fetchKeywordList();
  }, []);

  useEffect(() => {
    console.log('In app, state ', keywords);
  }, [keywords]);

  return (
    <>
      <Header />
      <ListView />
    </>
  );
};

export default App;
