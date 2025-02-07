import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import defaultScrollButtonStyle from './scrollButtonStyle';


const ScrollToTopButton = ({style}) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    showButton && (
        <button onClick={scrollToTop} style={style}>
            ↑
        </button>
    )
  );
};

ScrollToTopButton.propTypes = {
  style: PropTypes.object,
};

ScrollToTopButton.defaultProps = {
  style: defaultScrollButtonStyle,
};

export default ScrollToTopButton;
