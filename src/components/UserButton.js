/**
 * Created by chao on 2017/10/25.
 */

import React, { Component } from 'react';
import Gesture from 'rc-gesture';

import icon from '../assets/button-user@2x.png';

export default class UserButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 720 - 18 - 90,
      y: 18,
      starx:0,
      stary:0,
    };
  }
  render () {
    return (
      <div style={Object.assign({}, styles.container, {
        top:this.state.y / 100 + 'rem',
        left: this.state.x / 100 + 'rem' })}
           onClick={this.props.onClick}
      >
        <Gesture onPanStart={(event) => {
          this.setState({
            starx:event.moveStatus.x * 2,
            stary:event.moveStatus.y * 2
          });
        }} onPanEnd={(event) => {
          this.setState({
            x :this.state.x + event.moveStatus.x * 2 - this.state.starx,
            y:this.state.y + event.moveStatus.y * 2 - this.state.stary
          });
        }} onPanMove={(event) => {
          this.setState({
            x :this.state.x + event.moveStatus.x * 2 - this.state.starx,
            y:this.state.y + event.moveStatus.y * 2 - this.state.stary,
            starx: event.moveStatus.x * 2,
            stary: event.moveStatus.y * 2
          });
        }}
        >
          <img
            style={styles.icon}
            src={icon} alt='我的' />
        </Gesture>
      </div>
    );
  }
};

const styles = {
  icon: {
    height:'0.9rem',
    width:'0.9rem'
  },
  container: {
    position:'fixed'
  }
};
