import React from 'react';
import {render} from 'react-dom';
import VideoContainer from './VideoContainer.jsx';
import Search from './search.jsx';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={loggedIn:false,player:'off'}
    this.startPlayer =  this.startPlayer.bind(this);
    this.tveAuth = this.tveAuth.bind(this);
    this.tveLogOut = this.tveLogOut.bind(this);
    this.removePlayer = this.removePlayer.bind(this);

  }
  componentDidMount(){


  }
  tveLogOut(){
    TVEAuth.API.logout();
    TVEAuth.API.getLogoutScreen();
    this.setState({loggedIn:false,player:'on'});
    TVEAuth.Callback.logoutCompleted= ()=>{
      TVEAuth.API.logout();
      TVEAuth.API.getLogoutScreen();

    }

    TVEAuth.Callback.logoutCompleted= ()=>{
      TVEAuth.API.logout();
      TVEAuth.API.getLogoutScreen();
    }
    TVEAuth.Callback.checkStatusCompleted = (TVESubscriber)=> {
      console.log('CHECK STATUS COMPLETED: ', TVESubscriber);
    }
  }
  tveAuth(video){
    if(video.props.auth == 'false'){
      console.log('props');
      if(this.state.loggedIn == true){
          this.setState({loggedIn:true,player:'on'});
          this.startPlayer(video.props.uri);
      }else{
        this.setState({loggedIn:false,player:'on'});
        this.startPlayer(video.props.uri);
      }


    } else if (this.state.loggedIn == true) {
      console.log('log');
      this.setState({loggedIn:true,player:'on'});
        this.startPlayer(video.props.uri);
    }
    else{
          TVEAuth.API.init({
            requestor: 'ComedyCentral',
            resource: 'ComedyCentral',
            customCSS: false
          });

          TVEAuth.Callback.componentLoaded = ()=> {
            console.log('inside componentLoaded Callback');
            TVEAuth.API.checkStatus(true);
          };

          TVEAuth.Callback.checkStatusCompleted = (TVESubscriber)=> {
            console.log('CHECK STATUS COMPLETED: ', TVESubscriber);
            TVEAuth.API.login();
            console.log('LOGGED IN? : ', TVESubscriber.isLoggedIn);
            if(TVESubscriber.isLoggedIn == true){
              this.startPlayer(video.props.uri);
              this.setState({loggedIn:true,player:'on'});

            }
          };
        }

    }

  removePlayer(){
    var header = this.refs.header;
    var playerHTML = this.refs.videoplayer;
    playerHTML.innerHTML='';
    playerHTML.style.visibility='hidden';
    playerHTML.style.display='inline';
    header.style.display='block';
  }

  startPlayer(url){
    var w = window.innerWidth;
    var h = window.innerHeight;
    var videoSize = h/2;
    var header = this.refs.header;
    header.style.display='none';
    var playerHTML = this.refs.videoplayer;
    window.alert(this.state.player)
    if(this.state.player == 'on'){
      playerHTML.innerHTML = '';
      playerHTML.style.visibility='visible';
      playerHTML.style.display='block';
    }
  //   playerHTML.style.display = "block";
      var element = document.querySelector(".videoplayer");
        var config = {
            uri: url,
            test:{
            useSegmentedScrubber:true,
            contentType:'episode',
            autoPlay:true,
            "freewheelSiteSection": "comedy_central_videos_mob",
  "freewheelFlashSiteSection": "comedy_central_videos"

          },
            width:w,
            height:videoSize,
        };

        var player = new EdgePlayer.Player(element, config);


      window.scrollTo(0, 0);

  }
  render () {
    var logOut;
    if(this.state.loggedIn == true){
        logOut = <input onClick={this.tveLogOut} type="button" className="button" value="Logout"/>;
    }else{
      logOut = <span></span>
    }


    return (
        <div className="App">
          <div className='videoplayer' ref='videoplayer'></div>
            <div className="App-header" ref='header'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/Viacom_logo.svg" className="App-logo" alt="logo" />
            {logOut}
            </div>
            <Search player={this.state.player} close={this.removePlayer}/>
            <VideoContainer startPlayer={this.startPlayer.bind(this)} tveAuth={this.tveAuth} tveLogOut={this.tveLogOut} url='/videos' pollInterval='2000'/>
        </div>
    );
  }
}

render(<App/>, document.getElementById('app'));

//freewheelFlashSiteSection: 'automated_tests',
// freewheelSiteSection: 'automated_tests',
// networkID: 82124,
