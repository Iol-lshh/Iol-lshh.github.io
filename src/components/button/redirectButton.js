import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import defaultButtonStyle from './buttonStyle';

const RedirectButton = ({ style, url, contents}) => {
  return (
    <Link to={url} style={style} rel="prev">
      {contents}
    </Link>
  );
};

RedirectButton.propTypes = {
  style: PropTypes.object,
  url: PropTypes.string,
  contents: PropTypes.string,
};

RedirectButton.defaultProps = {
  style: defaultButtonStyle,
};

export default RedirectButton;