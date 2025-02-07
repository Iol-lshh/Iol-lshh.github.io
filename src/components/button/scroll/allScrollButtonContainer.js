import React from 'react';
import PropTypes from 'prop-types';
import scrollButtonStyle from './scrollButtonStyle';
import ScrollToTopButton from './scrollToTopButton';
import ScrollToBottomButton from './scrollToBottomButton';
import HomeButtons from '../homeButton';
import RedirectButton from '../redirectButton';

const AllScrollButtonContainer = ({ previousLink, nextLink }) => {
  return (
    <div style={scrollButtonsContainerStyle}>
      {previousLink && <RedirectButton style={scrollButtonStyle} url={previousLink} contents={"←"}/>}
      <ScrollToTopButton style={scrollButtonStyle} />
      <HomeButtons style={scrollButtonStyle} />
      <ScrollToBottomButton style={scrollButtonStyle} />
      {nextLink && <RedirectButton style={scrollButtonStyle} url={nextLink} contents={"→"}/>}
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

AllScrollButtonContainer.propTypes = {
  previousLink: PropTypes.string,
  nextLink: PropTypes.string,
};

export default AllScrollButtonContainer;
