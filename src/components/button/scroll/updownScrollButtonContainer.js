import React from 'react';
import scrollButtonStyle from './scrollButtonStyle';
import ScrollToTopButton from './scrollToTopButton';
import ScrollToBottomButton from './scrollToBottomButton';


const UpdownScrollButtonContainer = () => {
  return (
    <div style={scrollButtonsContainerStyle}>
      <ScrollToTopButton style={scrollButtonStyle} />
      <ScrollToBottomButton style={scrollButtonStyle} />
    </div>
  );
};

const scrollButtonsContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  position: 'fixed',
  bottom: '20px',
  right: '20px',
};

export default UpdownScrollButtonContainer;
