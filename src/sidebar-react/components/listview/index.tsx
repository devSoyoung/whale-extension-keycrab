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
      {Object.keys(keywords).map((keyword, index) => {
        return (
          <KeywordCard
            key={`${keyword}_${index}`}
            {...{ ...keywords[keyword], title: keyword }}
          />
        );
      })}
    </main>
  );
};

export default ListView;
