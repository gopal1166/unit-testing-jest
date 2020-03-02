import React from 'react';
import PropTypes from 'prop-types';

export default class SimpleInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleKeyDown(event) {
    if (event.which === 13) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.onSave(this.state.value);
      this.setState({ value: '' });
    }
  }

  render() {
    const { value } = this.state;
    return (
      <input
        value={value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

SimpleInput.propTypes = {
  initialValue: PropTypes.string,
  onSave: PropTypes.func,
};

SimpleInput.defaultProps = {
  initialValue: '',
  onSave: () => {},
};
