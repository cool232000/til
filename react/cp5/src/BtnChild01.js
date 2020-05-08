import React, { Component } from 'react';

class ButtonChild01 extends Component {
  state = {
    title: this.props.title,
    color: this.props.color,
  };
  onClick = () => {
    this.setState({
      title: 'purple button',
    });
  };
  render() {
    const { title, color } = this.state;
    const ButtonStyle = {
      border: 'none',
      width: 100,
      height: 30,
      background: color,
    };
    return (
      <button style={ButtonStyle} onClick={this.onClick}>
        {title}
      </button>
    );
  }
}

export default ButtonChild01;
