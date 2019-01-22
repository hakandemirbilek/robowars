import React, { Component } from 'react';


class World extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default World;