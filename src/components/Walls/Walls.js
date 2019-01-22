import React, { Component } from 'react';
import { connect } from 'react-redux';


class Walls extends Component {

    render() {
        let blocks = this.props.wallMatrix.map ( (row, rowIndex) => {
            return (
                row.map( (column, columnIndex ) => {
                    if ( column === 1) {
                        return (
                            <div 
                                className="block"
                                key = {rowIndex + ',' + columnIndex} 
                                style={{
                                    top : (rowIndex * this.props.gridSize) + 'px', 
                                    left : (columnIndex * this.props.gridSize) + 'px',
                                    width : this.props.gridSize,
                                    height: this.props.gridSize,
                                    }}>
                                .
                            </div>
                        );
                    }
                })
            );
        });
    
    
        return(
            <div className='Walls'>
                {blocks}
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        wallMatrix : state.wallMatrix,
        gridSize: state.gridSize,
    }    
}




export default connect( mapStateToProps) (Walls);