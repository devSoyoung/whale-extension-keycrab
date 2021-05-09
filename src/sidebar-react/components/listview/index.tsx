import React, { useEffect } from 'react';
import useKeywords from '../../hooks/useKeywords';
import KeywordCard from './KeywordCard';

const ListView: React.FC = () => {
  const { keywords } = useKeywords();

  useEffect(() => {
    console.log('In app, state ', keywords);
  }, [keywords]);
  return (
    <main>
      <KeywordCard/>
    </main>
  );
};

export default ListView;
