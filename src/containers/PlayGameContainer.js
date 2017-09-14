/**
 * Created by chao on 2017/9/13.
 */
import React, { Component } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  height: ${(props) => props.h / 100}rem;
`;

export default class PlayGameContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      err: false
    };
  }
  render () {
    let height = document.getElementsByTagName('html')[0].clientHeight;
    console.log(height);
    return (
      <Box id='playGameBox' h={height} />
    );
  }
  componentDidMount () {
    // window.Cloudplay.initSDK({
    //   accessKeyID: '9599e53c',
    //   accesskey:'0ce9fabd44f7c819001f17f1b788f6bd',
    //   channelId: 100000,
    //   pkg_name: 'com.monstronauts.potionpunch',
    //   onSceneChanged: function (sceneId, extraInfo) {
    //     console.log('sceneId & extraInfo', sceneId, extraInfo);
    //   },
    //
    //   MessageHandler: function (message) {
    //     console.log(message);
    //   }
    // });
    // let gameOptions = {
    //   appid: 0,
    //   userinfo: {
    //     uId: '123',
    //     utoken: '123456'
    //   },
    //   priority: 0,
    //   extraId: 'miguh5',
    //   pkg_name: 'com.monstronauts.potionpunch',
    //   playingtime: 600000,
    //   configinfo: 'miguh5',
    //   c_token: 'abcd',
    //   isPortrait: false
    // };
    // window.Cloudplay.startSDK(gameOptions);
  }
  componentWillUnmount () {
    // window.location.reload();
    // window.Cloudplay.stopSDK();
  }
};
