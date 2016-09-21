import React from 'react';
import Video from './Video.jsx';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class VideoList extends React.Component {
    constructor(props){
        super(props);


    }

    render(){
        var data = this.props.data;
        var items = [];
        var vals = [];
        for(var x in data){
            if(data[x].length == 20){
                items.push(data[x]);
            }
        }
        for(var y in items){
            for(var j in items[y]){
                vals.push(items[y][j])
            }
        }
        var count = 0;
        var videoNodes = vals.map(function(video) {
            count ++;
            return (
                <Video startFb={this.props.startFn}  image={video['images'][0]['url']} runTime={video['duration']} date={video['originalAirDate']} rating={video['rating']} desc={video['description']} title={video['title']} id={(count-1)} uri={video['mgid']}/>
            );
        },this);
        return (
            <div className="videoWrapper">
                    {videoNodes}
            </div>
        );
    }
}

export default VideoList;
