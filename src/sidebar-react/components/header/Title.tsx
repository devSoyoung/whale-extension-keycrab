import React from 'react';

const Title: React.FC = () => {
  return (
    <div className="title-area">
      <img
        className="logo-img"
        alt="키크랩 로고 이미지"
        src="images/crab.png"
      />
      <h1 className="title">
        <strong>key</strong>
        crab
        <span className="sub-title">스마트한 웹 서핑 도우미</span>
      </h1>
    </div>
  );
};

export default Title;
