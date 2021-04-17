import React, { useEffect } from 'react';
import Header from './components/header';
import ListView from './components/listview';
import useKeywords from './components/hooks/useKeywords';

const App: React.FC = () => {
  const { fetchKeywordList } = useKeywords();
  useEffect(() => {
    // 데이터 초기화
    fetchKeywordList();

    // 웨일 스토리지 변경 감지 시 상태 최신화
    whale.storage.onChanged.addListener(() => {
      fetchKeywordList();
    });
  }, []);

  return (
    <>
      <Header />
      <ListView />
    </>
  );
};

export default App;
