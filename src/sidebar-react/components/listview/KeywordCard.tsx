import React, { useMemo, useState } from 'react';
import { Keyword } from '../../type/keywords';
import Shortcut from './Shortcut';

const BELL_OFF_IMAGE = 'images/icons/bell_off.png';
const BELL_ON_IMAGE = 'images/icons/bell_on.png';
const GARBAGE_IMAGE = 'images/icons/garbage.png';
const FOLD_IMAGE = 'images/icons/fold.png';

interface FollowButtonProps {
  isFollow: boolean;
}

interface KeywordProps {
  title: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isFollow,
}: FollowButtonProps) => {
  const [imageProps, setImageProps] = useState({});

  useMemo(() => {
    setImageProps({
      src: isFollow ? BELL_ON_IMAGE : BELL_OFF_IMAGE,
      alt: isFollow ? '알림 설정 됨 아이콘' : '알림 해제 됨 아이콘',
      className: isFollow ? 'bell-on' : 'bell-off',
    });
  }, [isFollow]);

  return (
    <button className="card--header__bell">
      <img {...imageProps} />
    </button>
  );
};

const KeywordCard = (props: KeywordProps & Keyword) => {
  const { title, tracking } = props;
  return (
    <div className="card">
      <div className="card--header">
        <div className="card--header__row">
          <div className="card--header__title">
            <FollowButton isFollow={tracking} />
            {title}
          </div>
          <div className="card--header__icons">
            <button className="card--header__discard">
              <img src={GARBAGE_IMAGE} alt="키워드 삭제 아이콘" />
            </button>
            <button className="card--header__fold">
              <img src={FOLD_IMAGE} alt="키워드 접기 아이콘" />
            </button>
          </div>
        </div>
        <div className="card--header__row">
          <Shortcut keyword={title} />
        </div>
      </div>
      <div className="card--main">
        <div className="card--main__link">
          <button className="card--main__pin" />
          <div className="card--main__origin" />
          <div className="card--main__desc" />
          <button className="card--main__remove" />
        </div>
      </div>
    </div>
  );
};

export default KeywordCard;
