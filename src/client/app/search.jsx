import React from 'react';
import {render} from 'react-dom';

class Search extends React.Component{
  constructor(props){
    super(props);
    this.close = this.close.bind(this);
  }

  close(){
    var searchBar = this.refs.wrap;
    searchBar.style.top='25%';
    this.props.close();
  }

  render(){
    if(this.props.player == 'on'){
      var searchBar = this.refs.wrap;
      searchBar.style.top='55%';
    }

    return (
        <div className="wrap" ref='wrap'>
          <div className="search">
              <input type="text" className="searchTerm" placeholder="What are you looking for?"/>
              <button type="submit" className="searchButton">
                <i className="fa fa-search"></i>
             </button>
             <button className='closeButton'>
              <i className='fa fa-times' onClick={this.close}></i>
             </button>

         </div>
     </div>
    );
  }
}

export default Search;
