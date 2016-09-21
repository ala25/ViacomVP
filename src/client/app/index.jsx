import VideoContainer from './VideoContainer.jsx';
import React from 'react';
import {render} from 'react-dom';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.startPlayer =  this.startPlayer.bind(this);
  }
  componentDidMount(){
  }
  startPlayer(url){
    var w = window.innerWidth;
    var h = window.innerHeight;
    var videoSize = h/2;
    var header = this.refs.header;
    header.style.display='none';
      var element = document.querySelector(".videoplayer");
      var config = {
          uri: url,
          test:{
          "freewheelSiteSection": "comedy_central_videos_mob",
          "freewheelFlashSiteSection": "comedy_central_videos",
        },
          width:w,
          height:videoSize,
          autoPlay:true,
      };

      var player = new EdgePlayer.Player(element, config);
      window.scrollTo(0, 0);

  }
  render () {
    return (
        <div className="App">
          <div className='videoplayer'></div>
            <div className="App-header" ref='header'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/Viacom_logo.svg" className="App-logo" alt="logo" />
            </div>
            <VideoContainer startPlayer={this.startPlayer.bind(this)} url='/videos' pollInterval='2000'/>
        </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
