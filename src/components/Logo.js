import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="./static/game.ico"
      width="32"
      height="32"
      {...props}
    />
  );
};

export default Logo;