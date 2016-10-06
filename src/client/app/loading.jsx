import React from 'react';

export default class Loading extends React.Component {

componentDidMount(){

}
componentWillReceiveProps(){
  console.log(this.props);
  this.props.loadData();
}
shouldComponentUpdate(){
  console.log(this.props);
  this.props.loadData();
}
componentWillUpdate(){
  console.log(this.props);
  this.props.loadData();
}
componentDidUpdate(){
  console.log(this.props);
  this.props.loadData();
}
componentWillUnmount(){
  console.log(this.props);
  this.props.loadData();
}
  render(){
      return (
          <div>
            <img src='../default.svg'/>
          </div>
      );
  }

}
