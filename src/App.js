import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import World from './containers/World/World';
import Map from './containers/Map/Map';
import Robot from './components/Robot/Robot';
import Walls from './components/Walls/Walls';

import { connect } from 'react-redux';

/*
          <Robot width="3" height="3" X="31" Y="27"></Robot>
          <Robot width="3" height="3" X="37" Y="27"></Robot>
          <Robot width="3" height="3" X="3" Y="27"></Robot>
          <Robot width="3" height="3" X="14" Y="27"></Robot>
          <Robot width="3" height="3" X="20" Y="27"></Robot>
          <Robot width="3" height="3" X="19" Y="27"></Robot>
          <Robot width="3" height="3" X="7" Y="27"></Robot>
          <Robot width="3" height="3" X="27" Y="27"></Robot>

*/
class App extends Component {
  
  render() {
    return (
      <World>
        <Map>
          <Walls></Walls>
          { 
            Object.keys(this.props.robots).map( el => {                  
              return (
                <Robot 
                  width={this.props.robots[el].width} 
                  height={this.props.robots[el].height} 
                  X={this.props.robots[el].X} 
                  Y={this.props.robots[el].Y}
                  robotType={this.props.robots[el].robotType} 
                  key={el}
                  id={el}
                  >

                </Robot>
              ) 
            })
          }
        </Map>
      </World>
    );
  }
}

const mapStateToProps = state => {
  return {
    robots : state.robots,
  }
}


export default connect(mapStateToProps)(App);
