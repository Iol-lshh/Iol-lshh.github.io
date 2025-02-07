import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import defaultScrollButtonStyle from './scrollButtonStyle';

const ScrollToBottomButton = ({ style }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < document.documentElement.scrollHeight - window.innerHeight - 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    showButton && (
        <button onClick={scrollToBottom} style={style}>
            ↓
        </button>
    )
  );
};

ScrollToBottomButton.propTypes = {
  style: PropTypes.object,
};

ScrollToBottomButton.defaultProps = {
  style: defaultScrollButtonStyle,
};

export default ScrollToBottomButton;
