import React, { useMemo, useState } from 'react';
import { Keyword } from '../../type/keywords';
import Link from './Link';
import useKeywords from '../../hooks/useKeywords';

const BELL_OFF_IMAGE = 'images/icons/bell_off.png';
const BELL_ON_IMAGE = 'images/icons/bell_on.png';
const MENU_IMAGE = 'images/icons/kebob-menu.svg';
const FOLD_IMAGE = 'images/icons/fold.svg';

interface FollowButtonProps {
  tracking: boolean;
  title: string;
}

interface KeywordProps {
  title: string;
}

const FollowButton = ({ tracking, title }: FollowButtonProps) => {
  const [imageProps, setImageProps] = useState({});
  const { toggleFollowKeyword } = useKeywords();

  const handleClick = () => {
    toggleFollowKeyword({ tracking, keyword: title });
  };

  useMemo(() => {
    setImageProps({
      src: tracking ? BELL_ON_IMAGE : BELL_OFF_IMAGE,
      alt: tracking ? '알림 설정 됨 아이콘' : '알림 해제 됨 아이콘',
      className: tracking ? 'bell-on' : 'bell-off',
    });
  }, [tracking]);

  return (
    <button className="card--header__bell" onClick={handleClick}>
      <img {...imageProps} />
    </button>
  );
};

const KeywordListItem = (props: KeywordProps & Keyword) => {
  const { title, tracking, link, fold = false } = props;
  const { toggleFoldKeyword } = useKeywords();

  const handleClick = () => {
    toggleFoldKeyword({ fold, keyword: title });
  };

  return (
    <div className="list-item">
      <div className="card--header">
        <div className="card--header__row">
          <div className="card--header__title bold">
            <FollowButton tracking={tracking} title={title} />
            {title}
          </div>
          <div className="card--header__icons">
            <button
              className={`card--header__fold ${fold ? 'folded' : ''}`}
              onClick={handleClick}
            >
              <img src={FOLD_IMAGE} alt="키워드 접기 아이콘" />
            </button>
            <button className="card--header__discard">
              <img src={MENU_IMAGE} alt="메뉴 더 보기" />
            </button>
          </div>
        </div>
      </div>
      <div className={`card--main ${fold ? 'hidden' : ''}`}>
        {link?.map((item, index) => (
          <Link key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default KeywordListItem;
