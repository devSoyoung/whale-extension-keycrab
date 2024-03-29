import React from 'react';
import useKeywords from '../../hooks/useKeywords';
import KeywordListItem from './KeywordListItem';
import useSearch from '../../hooks/useSearch';

const ListView: React.FC = () => {
  const { keywords } = useKeywords();
  const { input } = useSearch();

  return (
    <main>
      {Object.keys(keywords)
        .filter((keyword) => keyword.match(input))
        .map((keyword, index) => {
          return (
            <KeywordListItem
              key={`${keyword}_${index}`}
              {...{ ...keywords[keyword], title: keyword }}
            />
          );
        })}
    </main>
  );
};

export default ListView;
