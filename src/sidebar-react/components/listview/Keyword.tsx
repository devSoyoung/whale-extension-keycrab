import React, { useMemo, useState } from 'react';
import { Keyword } from '../../type/keywords';

const BELL_OFF_IMAGE = 'images/icons/bell_off';
const BELL_ON_IMAGE = 'images/icons/bell_on';

interface FollowButtonProps {
  isFollow: boolean;
}

interface KeywordProps {
  title: string;
}
/*
<Keyword />
  <FollowButton />
  <div class="keyword-item-content">
    타이틀 영역
    <ShortCut />
    <LinkList />
      <LinkItem />
  </div>
</ Keyword>*/

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
    <div className="bell-icon">
      <img {...imageProps} />
    </div>
  );
};

const Keyword: React.FC<KeywordProps & Keyword> = (props) => {
  const { title, tracking } = props;
  return (
    <li className="keyword-item">
      <FollowButton isFollow={tracking} />
      <div>
        <div className="keyword-title">{title}</div>
      </div>
    </li>
  );
};

export default Keyword;
