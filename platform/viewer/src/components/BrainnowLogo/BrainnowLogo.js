import './BrainnowLogo.css';
import BrainnowIcon from './brainnow-icon.svg'

import React from 'react';

function BrainnowLogo() {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="header-brand"
      href="http://brainnow.cn"
    >
      <BrainnowIcon className="header-logo-image1"></BrainnowIcon>
      {/* Logo text would fit smaller displays at two lines:
       *
       * Open Health
       * Imaging Foundation
       *
       * Or as `OHIF` on really small displays
       */}
    </a>
  );
}

export default BrainnowLogo;
