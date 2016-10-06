import React from 'react';
class Video extends React.Component {
    constructor(props){
        super(props);
        this.getLocalDate =this.getLocalDate.bind(this);
        this.readMore = this.readMore.bind(this);
        this.readLess = this.readLess.bind(this);
        this.startPlayer = this.startPlayer.bind(this);
        this.getRatingIcon = this.getRatingIcon.bind(this);
        this.getDuration = this.getDuration.bind(this);
        this.tveAuthVideo = this.tveAuthVideo.bind(this);
    }
     getLocalDate(orgDate){
        var d = new Date(orgDate);
         var n = d.toLocaleString();
         var date = n.split(',');
        return date[0];
    }

    getDuration(time){
      var date = new Date(null);
      date.setSeconds(time); // specify value for SECONDS here
      return date.toISOString().substr(11, 8);
    }

    getRatingIcon(rating){
        var tv14 = '../TV-14_icon.svg';
        var tvPG = '../TV-PG_icon.svg';
        if(rating == 'TV-14'){
            return tv14;
        }else{
            return tvPG;
        }

    }

    readMore(){
        var more = document.getElementsByClassName('more');
        var toggleLess = document.getElementsByClassName('readLess');
        var toggleMore = document.getElementsByClassName('readMore');
        more[this.props.id].style.display = 'inline';
        toggleLess[this.props.id].style.display = 'inline';
        toggleMore[this.props.id].style.display = 'none';

    }
    readLess(){
        var toggle = document.getElementById(this.props.id);
        var more = document.getElementsByClassName('more');
        var toggleMore = document.getElementsByClassName('readMore');
        var toggleLess = document.getElementsByClassName('readLess');
        toggle.style.display = 'inline-block';
        more[this.props.id].style.display = 'none';
        toggleMore[this.props.id].style.display = 'inline-block';
        toggleLess[this.props.id].style.display = 'none';

    }
    startPlayer(){
      // console.log(this.props.uri);
        this.props.startFb(this.props.uri);
    }

    tveAuthVideo(){
      this.props.tveAuth(this);
    }


    render(){

      var lock ;
        if(this.props.auth == 'true' ){
          lock = <span><img className='lockIcon' src='./lock.svg'/></span>;
        }else if (this.props.auth == 'false') {
          lock = <span><img/></span>;
        }
        var x = this.props.desc.split(',');
        var rest="";

        for(var i =1;i<x.length;i++) rest += ' '+x[i];
        return (
            <div>

                <div className="primary">
                    <img className=" video" src={this.props.image+"&width=330"} id={this.props.id}  alt=""  />
                    <span className='ratingIcon' ><img className='icon' src={this.getRatingIcon(this.props.rating)} /></span>
                    {lock}

                    <div className='overlay'>
                        <h3>{this.props.title}</h3>
                    </div>
                    <div className="secondary">
                        <p className='desc'>{x[0]}</p>
                        <span className='readMore' onClick={this.readMore} id={this.props.id}> Read More ...</span>
                        <span className='more' id={this.props.id}>{rest}</span>
                        <span className='readLess' onClick={this.readLess} id={this.props.id} > Show Less</span>
                        <span className='date'>Org. Air Date: {this.getLocalDate(this.props.date)}</span>
                        <span className='duration'>Duration : {this.getDuration(this.props.runTime)}</span>
                        <span></span>
                        <div onClick={this.tveAuthVideo} className="play-button secondary ">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Video;
