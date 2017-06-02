import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Panel extends PureComponent {
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

Panel.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default connect(state => state, actions)(Panel);
