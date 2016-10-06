import React from 'react';
import $ from 'jquery';
import VideoList from './VideoList.jsx';
//import Loading from './loading.jsx';

class VideoContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state={data:"",loading:true};
    this.loadVideosFromServer = this.loadVideosFromServer.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

  }
  handleScroll(ev) {

        var h = window.innerHeight;
       let scrollTop = ev.srcElement.body.scrollTop;
       if( scrollTop > (h/2) && this.state.data.length <=100){
            $.ajax({
                url: '/update',
                dataType:'json',
                cache: false,
                success:function(data){
                    var newD = data.response;
                    var arr = Object.keys(newD).map(function (key) {return newD[key]});
                    this.setState({data:this.state.data.concat(arr)});
                }.bind(this),
                error:function(xhr,status,err){
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
       }
    }

  loadVideosFromServer(){
        $.ajax({
            url: this.props.url,
            dataType:'json',
            cache: false,
            success:function(data){
                var newD = data.response;
                var arr = Object.keys(newD).map(function (key) {
                    return (key,newD[key])
                });

                this.setState({data:arr,loading:false});
            }.bind(this),
            error:function(xhr,status,err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount(){
      this.loadVideosFromServer();
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    componentWillUpdate(){
        window.addEventListener('scroll', this.handleScroll);
    }

    render(){
        return (
            <div onScroll={this.handleScroll} ref='scroll' className = 'VideoContainer'>
              <VideoList startFn= {this.props.startPlayer} tveAuth={this.props.tveAuth} tveLogOut={this.props.tveLogOut}   data={this.state.data}/>
            </div>
        );
    }

}

export default VideoContainer;
