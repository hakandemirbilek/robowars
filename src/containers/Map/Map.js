import React, { Component } from 'react';
import { connect } from 'react-redux';

class Map extends Component {
    render() {
        return (
            <div className='Map' style={{width: this.props.mapWidth * this.props.gridSize, height: this.props.mapHeight * this.props.gridSize }}>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        mapWidth : state.mapWidth,
        mapHeight : state.mapHeight,
        gridSize: state.gridSize,
    }
}


export default connect(mapStateToProps)(Map);