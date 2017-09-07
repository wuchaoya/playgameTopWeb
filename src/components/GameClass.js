/**
 * Created by chao on 2017/9/6.
 */

import styled from 'styled-components';
import React, { Component } from 'react';

const GameClassText = styled.span`
  color: #666;
  font-size: 0.24rem;
  display: flex;
  justify-content: center;
  margin-left: 0.06rem;
  margin-right: 0.06rem;
  align-items: center;
  `;

const GameClassContainer = styled.div`
 border: 0.01rem solid #ccc;
 border-radius: 0.1rem;
 margin-right: 0.1rem;
 display: flex;
 justify-content: center;
`;

export default class TopImg extends Component {
  render () {
    return (
      <GameClassContainer>
        <GameClassText>{this.props.name}</GameClassText>
      </GameClassContainer>
    );
  }
};

