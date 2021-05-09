import React, { useEffect } from 'react';
import useKeywords from '../hooks/useKeywords';
import Keyword from './Keyword';

const ListView: React.FC = () => {
  const { keywords } = useKeywords();

  useEffect(() => {
    console.log('In app, state ', keywords);
  }, [keywords]);
  return (
    <main className="content-area">
      {/*Filter*/}

      {/*Keywords*/}
      <div className="keyword-items-area">
        <ul className="keyword-items-list">
          {Object.keys(keywords).map((keyword, index) => {
            return (
              <Keyword
                key={`${keyword}_${index}`}
                {...{ ...keywords[keyword], title: keyword }}
              />
            );
          })}
        </ul>
      </div>
      {/*EmptyBox*/}
    </main>
  );
};

export default ListView;
