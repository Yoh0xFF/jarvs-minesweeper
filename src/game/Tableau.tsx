import React from 'react';

import './Tableau.scss';

export interface Props {
  number: number;
}

export default function Tableau({ number }: Props) {
  const x = Math.floor(number / 100);
  const y = Math.floor(number / 10) % 10;
  const z = number % 10;

  return (
    <div className='tableau'>
      <div className={`digit-${x}`} />
      <div className='separator' />
      <div className={`digit-${y}`} />
      <div className='separator' />
      <div className={`digit-${z}`} />
    </div>
  );
}
