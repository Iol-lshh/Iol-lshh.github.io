import React from 'react';
import PropTypes from 'prop-types';
import buttonStyle from './buttonStyle';
import RedirectButton from './redirectButton';



const HomeButton = ({ style }) => {
  return (
    <RedirectButton style={style} url="/" contents="🏠" />
  );
};

HomeButton.propTypes = {
  style: PropTypes.object,
};

HomeButton.defaultProps = {
  style: buttonStyle,
};

export default HomeButton;
