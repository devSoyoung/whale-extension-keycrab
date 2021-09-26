import React from 'react';
import Shortcut from './Shortcut';
import useKeywords from '../../hooks/useKeywords';

interface DropdownProps {
  keyword: string;
}

const RemoveButton = ({ keyword }) => {
  const { removeKeyword } = useKeywords();
  const handleClick = () => {
    removeKeyword({ keyword });
  };
  return (
    <button onClick={handleClick} className="dropdown-button--remove-link">
      링크 삭제
    </button>
  );
};

const Dropdown = ({ keyword }: DropdownProps) => {
  return (
    <div className="dropdown">
      <h1>바로가기</h1>
      <Shortcut keyword={keyword} />
      <RemoveButton keyword={keyword} />
    </div>
  );
};

export default Dropdown;
