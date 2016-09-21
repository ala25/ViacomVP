import React from 'react';
class Video extends React.Component {
    constructor(props){
        super(props);
        this.getLocalDate =this.getLocalDate.bind(this);
        this.readMore = this.readMore.bind(this);
        this.readLess = this.readLess.bind(this);
        this.startPlayer = this.startPlayer.bind(this);
        this.getRatingIcon = this.getRatingIcon.bind(this);
    }
     getLocalDate(orgDate){
        var d = new Date(orgDate);
         var n = d.toLocaleString();
         var date = n.split(',');
        return date[0];
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
        var toggle = document.getElementById(this.props.id);
        var more = document.getElementsByClassName('more');
        var toggleLess = document.getElementsByClassName('readLess');
        toggle.style.display = 'none';
        more[this.props.id].style.display = 'inline';
        toggleLess[this.props.id].style.display = 'inline';

    }
    readLess(){
        var toggle = document.getElementById(this.props.id);
        var more = document.getElementsByClassName('more');
        var toggleMore = document.getElementsByClassName('readMore');
        var toggleLess = document.getElementsByClassName('readLess');
        toggle.style.display = 'inline';
        more[this.props.id].style.display = 'none';
        toggleMore[this.props.id].style.display = 'inline';
        toggleLess[this.props.id].style.display = 'none';

    }
    startPlayer(){
      // console.log(this.props.uri);
        this.props.startFb(this.props.uri);
    }



    render(){
        var x = this.props.desc.split(',');
        var rest="";

        for(var i =1;i<x.length;i++) rest += ' '+x[i];
        return (
            <div>

                <div className="primary">
                    <img className=" video" src={this.props.image+"&width=330"} alt=""  />
                    <span className='ratingIcon' ><img className='icon' src={this.getRatingIcon(this.props.rating)} /></span>
                    <div className='overlay'>
                        <h3>{this.props.title}</h3>
                    </div>
                    <div className="secondary">
                        <p className='desc'>{x[0]}</p>
                        <span className='readMore' onClick={this.readMore} id={this.props.id}> Read More ...</span>
                        <span className='more' id={this.props.id}>{rest}</span>
                        <span className='readLess' onClick={this.readLess} id={this.props.id} > Show Less</span>
                        <span className='date'>{this.getLocalDate(this.props.date)}</span>
                        <span></span>
                        <div onClick={this.startPlayer} className="play-button secondary ">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Video;
