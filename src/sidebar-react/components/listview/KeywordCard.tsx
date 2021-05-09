import React, { useMemo, useState } from 'react';
import { Keyword } from '../../type/keywords';
import Shortcut from './Shortcut';

const BELL_OFF_IMAGE = 'images/icons/bell_off';
const BELL_ON_IMAGE = 'images/icons/bell_on';

const KeywordCard = (props) => {
  return (
    <div className="card">
      <div className="card--header">
        <div className="card--header__row">
          <div className="card--header__title">삼성 벽걸이 에어컨</div>
          <div className="card--header__icons">
            <button className="card--header__bell"/>
            <button className="card--header__discard"/>
          </div>
        </div>
        <div className="card--header__row">
          {/*<Shortcut keyword={"a"}/>*/}
        </div>
      </div>
      <div className="card--main">
        <div className="card--main__link">
          <button className="card--main__pin"/>
          <div className="card--main__origin"/>
          <div className="card--main__desc"/>
          <button className="card--main__remove"/>
        </div>
      </div>
    </div>
  );
};

export default KeywordCard;
