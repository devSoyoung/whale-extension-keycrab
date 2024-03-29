import React from 'react';
import { LinkProps } from '../../type/keywords';
import LinkDelete from '../icons/LinkDelete';
import useKeywords from '../../hooks/useKeywords';

const OriginMap = {
  total: '통합검색',
  blog: '블로그',
  cafe: '카페',
  shopping: '쇼핑',
  kin: '지식iN',
  post: '포스트',
  video: '동영상',
  news: '뉴스',
  website: '사이트',
  google: '구글',
  view: 'VIEW',
};

const DEFAULT_ORIGIN = '네이버';

const PIN_IMAGE = 'images/icons/jjim-on.svg';
const UNPIN_IMAGE = 'images/icons/jjim-off.svg';
// 임시, x 표 아이콘 생성 필요

const Link = ({ favorite, origin, title, url, ownKeyword }: LinkProps) => {
  const { removeLink, togglePinLink } = useKeywords();
  const handleClickRemove = () => {
    removeLink({ url, keyword: ownKeyword });
  };

  const handleClickPin = () => {
    togglePinLink({ url, keyword: ownKeyword, favorite });
  };

  return (
    <div className="card--main__link">
      <button className="card--main__pin" onClick={handleClickPin}>
        <img src={favorite ? PIN_IMAGE : UNPIN_IMAGE} alt="고정하기" />
      </button>
      <div className="card--main__origin">
        {OriginMap[origin] ?? DEFAULT_ORIGIN}
      </div>
      <div className="card--main__desc">
        <a target="_blank" href={url} rel="noreferrer">
          {title}
        </a>
      </div>
      <button className="card--main__remove" onClick={handleClickRemove}>
        <LinkDelete />
      </button>
    </div>
  );
};

export default Link;
