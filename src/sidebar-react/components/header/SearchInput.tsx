import React from 'react';
import useSearch from '../../hooks/useSearch';

const SearchInput: React.FC = () => {
  const { setInput } = useSearch();
  const onChange = (e) => {
    const { target } = e;
    setInput(target.value);
  };

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
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
