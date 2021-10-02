import React from 'react';

interface ShortCutProps {
  keyword: string;
}

const Shortcut: React.FC<ShortCutProps> = ({ keyword }) => {
  return (
    <ul className="dropdown--menu">
      <a
        href={`https://search.naver.com/search.naver?query=${keyword}`}
        target="_blank"
        rel="noreferrer"
      >
        <li>
          <img src="svgs/shortcut-naver.svg" alt={`네이버로 ${keyword} 검색`} />
        </li>
      </a>
      <a
        href={`https://www.google.com/search?q=${keyword}`}
        target="_blank"
        rel="noreferrer"
      >
        <li>
          <img src="svgs/shortcut-google.svg" alt={`구글로 ${keyword} 검색`} />
        </li>
      </a>
      <a
        href={`https://www.youtube.com/results?search_query=${keyword}`}
        target="_blank"
        rel="noreferrer"
      >
        <li>
          <img src="svgs/shortcut-yt.svg" alt={`유튜브로 ${keyword} 검색`} />
        </li>
      </a>
    </ul>
  );
};

export default Shortcut;
