import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    const { fakeThemeChange } = this.props;
    fakeThemeChange();
  }
  render() {
    const { theme } = this.props;
    return <div id="page" className={theme.name} onClick={this.handleClick}>{ theme.name }</div>;
  }
}

Popup.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default connect(state => state, actions)(Popup);
