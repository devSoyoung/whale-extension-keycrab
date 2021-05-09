import React from 'react';
import { Link as LinkProps } from '../../type/keywords';

const Link = ({ favorite, origin, title, url }: LinkProps) => {
  return (
    <div className="card--main__link">
      <button className="card--main__pin" />
      <div className="card--main__origin">{origin}</div>
      <div className="card--main__desc">{title}</div>
      <button className="card--main__remove" />
    </div>
  );
};

export default Link;
