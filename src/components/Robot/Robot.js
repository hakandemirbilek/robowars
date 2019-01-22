import React, { Component } from 'react';
import { connect } from 'react-redux';
import ObstacleChecker from './ObstacleChecker';



class Robot extends Component {
    
    pressedKeys = {
        
    };

    keyPressTimeout = null;
    /*
    state = {
        X : parseInt(this.props.X),
        Y : parseInt(this.props.Y),
        width : parseInt(this.props.width),
        height: parseInt(this.props.height),
        incrementX : -1,
        incrementY :0,
    }*/




    componentDidMount = () => {

        if ( this.props.robotType === 'cpu' ) {
            this.moveRandom();
        } else{
            window.addEventListener('keydown', (e) => {
                this.pressedKeys[e.key] = true;
                clearTimeout( this.keyPressTimeout );
                this.moveRobot();
            });
            window.addEventListener('keyup', (e) => {
                this.pressedKeys[e.key] = false;
                clearTimeout( this.keyPressTimeout );
                this.moveRobot();
            });
            
        }
        

    }

    render(){
        let style = {
            left: ( this.props.robots[this.props.id].X * this.props.gridSize ) + "px",
            top: ( this.props.robots[this.props.id].Y * this.props.gridSize ) + "px",
            width : ( this.props.width * this.props.gridSize ) + "px",
            height : ( this.props.height * this.props.gridSize ) + "px",
        }
        let spriteStyle = {};

        let classes= 'Robot';
        let spriteCoordinates =  '0px 120px';
        if (this.props.robots[this.props.id].incrementX == 0 && this.props.robots[this.props.id].incrementY > 0){
            spriteCoordinates = '120px 120px';
        }else if (this.props.robots[this.props.id].incrementX == 0 && this.props.robots[this.props.id].incrementY < 0){
            spriteCoordinates = '-240px 0px';
        }else if (this.props.robots[this.props.id].incrementX > 0 && this.props.robots[this.props.id].incrementY == 0){
            spriteCoordinates = '-240px 60px';
        }else if (this.props.robots[this.props.id].incrementX < 0 && this.props.robots[this.props.id].incrementY == 0){
            spriteCoordinates = '-240px 180px';
        }

        if ( this.props.robotType == 'human' ){
            classes += ' human'; 
            style = {
                ...style,
            }
            spriteStyle = {
                backgroundPosition : spriteCoordinates,
            }
        }
        return (
        <div className={classes} style={style}>
            <div className='sprite' style={spriteStyle}></div>
        </div>
        )
    }



    hitAHuman = () => {
        this.props.setGameOver();
        console.log('hit a human ');


    }

    moveRobot = () => {
       // console.log(this.pressedKeys);
        const obstacleChecker = new ObstacleChecker( this.props );
        let incrementX = 0;

        if ( this.pressedKeys['ArrowLeft'] ) {
            incrementX = -1;

        }
        if ( this.pressedKeys['ArrowRight'] ){
            incrementX = 1;
        }   
        
        let incrementY = 0;
        if ( this.pressedKeys['ArrowUp'] ) {
            incrementY = -1;
        }
        if ( this.pressedKeys['ArrowDown'] ){
            incrementY = 1
        }    

        const x = this.props.robots[this.props.id].X;
        const y = this.props.robots[this.props.id].Y;

        if ( !this.props.gameOver ) {
            let obstacle = obstacleChecker.checkObstacles( incrementX , incrementY );
            if ( obstacle ==  'HIT_A_HUMAN' ) {
                this.hitAHuman();
                return false;
            }
            if ( obstacleChecker.checkObstacles( incrementX, incrementY ) ){
                this.props.setPosition(
                    this.props.id,
                    x + incrementX,
                    y + incrementY,
                    incrementX,
                    incrementY
                );
                this.keyPressTimeout = setTimeout(this.moveRobot, 60 );
                //setTimeout(this.moveRobot, 1 );
            }
        }    
    }




    

    getRandomSpeed = () => {
        return Math.floor( ( Math.random() * 10 ) + 1 ) * 50;
    }

    getRandomDirection = () => {
        // 0 = N , 2 = E, 4 = S, 6 = W
        const direction = Math.floor( Math.random() * 8 );
        //console.log( 'direciton: ', direction );
        let incrementX = 0;
        let incrementY = 0;
        switch (direction){ 
            case 0:
            incrementX = 0;
            incrementY = -1;
            break;
            case 1:
            incrementX = 1;
            incrementY = -1;
            break;
            case 2:
            incrementX = 1;
            incrementY = 0
            break;
            case 3:
            incrementX = 1;
            incrementY = 1;
            break;
            case 4:
            incrementX = 0
            incrementY = 1;
            break;
            case 5:
            incrementX = -1;
            incrementY = 1;
            break;
            case 6:
            incrementX = -1;
            incrementY = 0
            break;
            case 7:
            incrementX = -1;
            incrementY = -1;
            break;
        }
        return [ incrementX, incrementY ];
    }

    moveRandom = () => {         


        const obstacleChecker = new ObstacleChecker( this.props );


        if ( this.props.gameOver ) {
            return false;
        }

        if (!this.props.robotsMoveRandom){
            return false;
        }

        const x = this.props.robots[this.props.id].X;
        const y = this.props.robots[this.props.id].Y;

        let obstacle = obstacleChecker.checkObstacles(this.props.robots[this.props.id].incrementX, this.props.robots[this.props.id].incrementY);


        if ( obstacle ==  'HIT_A_HUMAN' ) {
            this.hitAHuman();
            return false;

        }

        if ( obstacle ) {
            //this direction was free, keep going
            //console.log( ' keep going ');
            this.props.setPosition(
                this.props.id, 
                x + this.props.robots[this.props.id].incrementX, 
                y + this.props.robots[this.props.id].incrementY,  
                this.props.robots[this.props.id].incrementX,
                this.props.robots[this.props.id].incrementY,
                this.props.robots[this.props.id].speed,
                );
        } else { // get new direction if the previous directons hit something
            let direction = this.getRandomDirection();
            let speed = this.getRandomSpeed();
            if ( obstacleChecker.checkObstacles(direction[0], direction[1])) {
                this.props.setPosition(
                    this.props.id, 
                    x + direction[0],
                    y + direction[1],   
                    direction[0],
                    direction[1],
                    speed
                );
            }
        }
        setTimeout( this.moveRandom, this.props.robots[this.props.id].speed );
    }
}




const mapStateToProps = (state) => {
    
    return {
        robotsMoveRandom : state.robotsMoveRandom,
        gameOver : state.gameOver,
        wallMatrix : state.wallMatrix,
        gridSize : state.gridSize,
        mapWidth : state.mapWidth,
        mapHeight : state.mapHeight,
        robots : state.robots,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPosition: (id, X, Y, incrementX, incrementY, speed ) => dispatch( {type:'SET_POSITION',  id : id, X : X, Y : Y, incrementX : incrementX, incrementY : incrementY, speed : speed }),
        setGameOver: () => dispatch( {type:'SET_GAME_OVER'} )
    }
}



export default connect( mapStateToProps,mapDispatchToProps)(Robot);