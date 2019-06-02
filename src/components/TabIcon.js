import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabIcon = ({ name, size, color }) => <Icon name={name} size={size} color={color} />;

TabIcon.defaultProps = {
  size: 20,
};

TabIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string.isRequired,
};

export default TabIcon;
