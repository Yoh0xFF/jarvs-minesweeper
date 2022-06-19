import React from 'react';

import './GameHeader.scss';
import Tableau from './Tableau';

export default function GameHeader() {
  return (
    <div className='game-header'>
      <div className='header'>
        <div className='corner corner-top-left' />
        <div className='border border-horizontal' />
        <div className='corner corner-top-right' />
      </div>

      <div className='content'>
        <div className='border border-vertical' />

        <div className='controls'>
          <Tableau number={123} />
          <div className='face face-unpressed' />
          <Tableau number={123} />
        </div>

        <div className='border border-vertical' />
      </div>

      <div className='footer'>
        <div className='joint joint-left' />
        <div className='border border-horizontal' />
        <div className='joint joint-right' />
      </div>
    </div>
  );
}
