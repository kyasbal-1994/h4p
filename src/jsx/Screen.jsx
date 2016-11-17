import React, { PropTypes } from 'react';


export const SrcDocEnabled = !!('srcdoc' in document.createElement('iframe'));

const Screen = ({ display, frameRef }) => {

  const style = {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(gray, black)',
    display: display ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const frameStyle = {
    border: '0 none',
    flex: '0 0 auto'
  };

  const sandbox = SrcDocEnabled ?
    "allow-scripts allow-modals allow-popups" :
    "allow-scripts allow-modals allow-popups allow-same-origin";

  return (
    <div style={style}>
      <iframe
        sandbox={sandbox}
        style={frameStyle}
        ref={frameRef}
      ></iframe>
    </div>
  );

};

export default Screen;
