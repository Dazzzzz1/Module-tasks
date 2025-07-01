import React, { Component } from 'react';

class Button extends Component {
  state = {
    isClicked: false
  };

  handleClick() {
    this.setState(prevState => ({
      isClicked: !prevState.isClicked
    }));
  }

  render() {
    return (
      <button onClick={() => this.handleClick()}>
        {this.state.isClicked ? 'Show' : 'Hidden'}
      </button>
    );
  }
}
export default Button;