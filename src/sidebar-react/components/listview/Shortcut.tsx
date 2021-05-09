import React from 'react';

interface ShortCutProps {
  keyword: string;
}

const Shortcut: React.FC<ShortCutProps> = ({ keyword }) => {
  return (
    <ul className="card--header__shortcuts">
      <a
        href={`https://search.naver.com/search.naver?query=${keyword}`}
        target="_blank"
        rel="noreferrer"
      >
        <li className="naver-search">
          <img src="../../images/naver.png" alt="네이버로고" />
          <span>네이버</span>
        </li>
      </a>
      <a
        href={`https://www.google.com/search?q=${keyword}`}
        target="_blank"
        rel="noreferrer"
      >
        <li className="google-search">
          <img src="../../images/google.png" alt="구글로고" />
          구글
        </li>
      </a>
      <a
        href={`https://www.youtube.com/results?search_query=${keyword}`}
        target="_blank"
        rel="noreferrer"
      >
        <li className="youtube-search">
          <img src="../../images/youtube.png" alt="유튜로고" />
          유튜브
        </li>
      </a>
    </ul>
  );
};

export default Shortcut;
