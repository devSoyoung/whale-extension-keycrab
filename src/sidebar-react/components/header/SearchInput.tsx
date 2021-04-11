import React from 'react';

const SearchInput: React.FC = () => {
  return (
    <div className="search-input-area">
      <img
        src="images/icons/search.png"
        alt="검색아이콘"
        className="search-icon"
      />
      <input
        placeholder="검색할 키워드를 입력해주세요."
        className="search-input"
        type="text"
      />
    </div>
  );
};

export default SearchInput;
