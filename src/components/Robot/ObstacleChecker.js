class ObstacleChecker {

    constructor( props ) {
        this.props = props;
    }



    checkMapBorders = (incrementX, incrementY) => {
        const hitbox = [
            [this.props.robots[this.props.id].X, this.props.robots[this.props.id].Y],
            [this.props.robots[this.props.id].X + (this.props.width-1), this.props.robots[this.props.id].Y ],
            [this.props.robots[this.props.id].X + (this.props.width-1), this.props.robots[this.props.id].Y + (this.props.height-1) ],
            [this.props.robots[this.props.id].X, this.props.robots[this.props.id].Y + (this.props.height-1) ]
        ];

       
        //check document boundaries
        if ( hitbox[0][0] + incrementX < 0 
            || hitbox[0][1] + incrementY < 0 
            || hitbox[1][0] + incrementX >= 40
            || hitbox[2][1] + incrementY >= this.props.mapHeight ) {                
            return false;
        }
        return true;
    }



    checkWalls = (incrementX, incrementY ) => {
        
        //check walls
        if ( incrementX < 0 ){ //move left
            //check diagonal obstacles.
            if ( incrementY < 0 ) { // move left & up
                if ( this.props.wallMatrix[this.props.robots[this.props.id].Y + incrementY][this.props.robots[this.props.id].X + incrementX] === 1 ){                    
                    //console.log( 'TOP LEFT CORNER' );   
                    return false;
                }
             } else if ( incrementY > 0 ) {// move left & down
                if ( this.props.wallMatrix[this.props.robots[this.props.id].Y + (this.props.height-1) +  incrementY][this.props.robots[this.props.id].X + incrementX] === 1 ){                    
                    //console.log( 'BOTTOM LEFT CORNER' );   
                    return false;
                }
            }

            for (let i=0; i < this.props.height; i++ ) { // check left edge from top to bottom
                //console.log( this.props.robots[this.props.id].Y + i,this.props.robots[this.props.id].X + incrementX );
                if ( this.props.wallMatrix[this.props.robots[this.props.id].Y + i][this.props.robots[this.props.id].X + incrementX] === 1 ){ 
                    //console.log( 'LEFT EDGE' );                   
                    return false;
                }
            }
        }

        if ( incrementX > 0 ){ //move right
            
            //check diagonal obstacles.
            if ( incrementY < 0 ) { // move right & up
                if ( this.props.wallMatrix[this.props.robots[this.props.id].Y  + incrementY][this.props.robots[this.props.id].X + (this.props.width-1) + incrementX] === 1 ){                    
                    //console.log( 'TOP RIGHT CORNER' );   
                    return false;
                }
            }else  if ( incrementY > 0 ) { // move right & down
                if ( this.props.wallMatrix[this.props.robots[this.props.id].Y + (this.props.height-1) + incrementY][this.props.robots[this.props.id].X + (this.props.width-1) + incrementX] === 1 ){                    
                    //console.log( 'BOTTOM RIGHT CORNER' );  ;
                    return false;
                }
            }
            for (let i=0; i < this.props.height; i++ ) { // check left edge from top to bottom
                if ( this.props.wallMatrix[this.props.robots[this.props.id].Y + i][this.props.robots[this.props.id].X + (this.props.width -1) + incrementX] === 1 ){                    
                    //console.log( 'RIGHT EDGE' );    
                    return false;
                }
            }
        }

        if ( incrementY < 0 ){ //move up
            for (let i=0; i < this.props.width; i++ ) { // check left edge from top to bottom
                //console.log( this.props.robots[this.props.id].Y + i , this.props.robots[this.props.id].X + this.props.width + incrementX );
                if ( this.props.wallMatrix[this.props.robots[this.props.id].Y + incrementY][this.props.robots[this.props.id].X + i] === 1 ){                    
                    //console.log( 'TOP EDGE' );
                    return false;
                }
            }
        }


        if ( incrementY > 0 ){ //move down
            for (let i=0; i < this.props.width; i++ ) { // check left edge from top to bottom
                //console.log( this.props.robots[this.props.id].Y + this.props.height + incrementY,this.props.robots[this.props.id].X + i);
                if ( this.props.wallMatrix[this.props.robots[this.props.id].Y + (this.props.height-1) + incrementY][this.props.robots[this.props.id].X + i] === 1 ){                    
                    //console.log( 'BOTTOM EDGE' );
                    return false;
                }
            }
        }
        return true;
    }



    checkRobots = (incrementX, incrementY) => {
        
        if ( incrementX < 0 ){ 
            let me = this.props.robots[this.props.id];
            for (let i=0; i < Object.keys(this.props.robots).length; i++ ){
                if (Object.keys(this.props.robots)[i] !== this.props.id ){
                    let robot = this.props.robots[Object.keys(this.props.robots)[i]]; 
                    if ( 
                        me.X + incrementX <= ( robot.X + ( robot.width -1 ) )
                        && ( me.X + ( me.width - 1 ) + incrementX ) >= ( robot.X )
                        && ( me.Y + ( me.height - 1 ) ) >= robot.Y
                        && ( me.Y <= robot.Y + ( robot.height -1 ) )
                    ){
                        //console.log( this.props.id, 'hit a robot LEFT EDGE ');
                        if ( robot.robotType === 'human' || me.robotType === 'human' ) {
                            
                            return 'HIT_A_HUMAN';
                        }
                        return false;
                    }
                    if ( incrementY > 0 ) {
                        if ( 
                            me.X + incrementX == robot.X + ( robot.width - 1 ) &&
                            me.Y + incrementY + ( me.height - 1 ) == robot.Y
                        ){
                            if ( robot.robotType === 'human' || me.robotType === 'human'  ) {
                                
                                return 'HIT_A_HUMAN';
                            }
                            //console.log( this.props.id, 'hit a robot BOTTOM LEFT CORNER' );
                            return false;
                        }
                    }else if ( incrementY < 0 ) {
                        if ( 
                            me.X + incrementX == robot.X + ( robot.width - 1 ) &&
                            me.Y + incrementY == robot.Y + ( robot.height - 1 )
                        ){
                            if ( robot.robotType === 'human' || me.robotType === 'human'  ) {
                                
                                return 'HIT_A_HUMAN';
                            }
                            //console.log( this.props.id, 'hit a robot TOP LEFT CORNER' );
                            return false;
                        }
                    }
                }
            }    
        }

        if ( incrementX > 0 ){ 
            let me = this.props.robots[this.props.id];
            for (let i=0; i < Object.keys(this.props.robots).length; i++ ){
                if (Object.keys(this.props.robots)[i] !== this.props.id ){
                    let robot = this.props.robots[Object.keys(this.props.robots)[i]]; 
                    if ( 
                        ( me.X + ( me.width - 1 ) + incrementX ) >= ( robot.X )
                        && ( me.X + incrementX ) <= ( robot.X + ( robot.width - 1 ) )
                        && ( me.Y + ( me.height - 1 ) ) >= robot.Y
                        && ( me.Y <= robot.Y + ( robot.height -1 ) )
                    ){
                        //console.log( this.props.id, 'hit a robot RIGHT EDGE ');
                        if ( robot.robotType === 'human' || me.robotType === 'human'  ) {
                            
                            return 'HIT_A_HUMAN';
                        }
                        return false;
                    }
                    if ( incrementY > 0 ) {
                        if ( 
                            me.X + ( me.width - 1 ) + incrementX == robot.X &&
                            me.Y + ( me.height - 1 ) + incrementY == robot.Y 
                        ){
                            //console.log( this.props.id, 'hit a robot BOTTOM RIGHT CORNER' );
                            if ( robot.robotType === 'human' || me.robotType === 'human'  ) {
                                
                                return 'HIT_A_HUMAN';
                            }
                            return false;
                        }
                    }else if ( incrementY < 0 ) {
                        if ( 
                            me.X + ( me.width -1 ) + incrementX == robot.X &&
                            me.Y + incrementY == robot.Y + ( robot.height -1 )

                        ){
                            //console.log( this.props.id, 'hit a robot TOP RIGHT CORNER' );
                            if ( robot.robotType === 'human' || me.robotType === 'human'  ) {
                                
                                return 'HIT_A_HUMAN';
                            }
                            return false;
                        }
                    }
                }
            }    
        }


        if ( incrementY > 0 ){ 
            let me = this.props.robots[this.props.id];
            for (let i=0; i < Object.keys(this.props.robots).length; i++ ){
                if (Object.keys(this.props.robots)[i] !== this.props.id ){
                    let robot = this.props.robots[Object.keys(this.props.robots)[i]]; 
                    if ( 
                        ( me.X + ( me.width - 1 ) ) >= ( robot.X )
                        && ( me.X ) <= ( robot.X + ( robot.width - 1 ) )
                        && ( me.Y + ( me.height - 1 ) + incrementY ) >= robot.Y
                        && ( me.Y + incrementY )<= robot.Y + ( robot.height - 1 ) 
                    ){
                        //console.log( this.props.id, 'hit a robot BOTTOM EDGE ');
                        if ( robot.robotType === 'human'  || me.robotType === 'human'  ) {
                            
                            return 'HIT_A_HUMAN';
                        }
                        return false;
                    }
                }
            }    
        }

        if ( incrementY < 0 ){ 
            let me = this.props.robots[this.props.id];
            for (let i=0; i < Object.keys(this.props.robots).length; i++ ){
                if (Object.keys(this.props.robots)[i] !== this.props.id ){
                    let robot = this.props.robots[Object.keys(this.props.robots)[i]]; 
                    if ( 
                        ( me.X + ( me.width - 1 ) ) >= ( robot.X )
                        && ( me.X ) <= ( robot.X + ( robot.width - 1 ) )
                        && ( me.Y + incrementY ) <= robot.Y + ( robot.height - 1 ) 
                        && ( me.Y + incrementY ) >= robot.Y
                    ){
                        //console.log( this.props.id, 'hit a robot TOP EDGE ');
                        if ( robot.robotType === 'human' || me.robotType === 'human'  ) {
                            
                            return 'HIT_A_HUMAN';
                        }
                        return false;
                    }
                }
            }    
        }
        return true;
    }



    checkObstacles = ( incrementX, incrementY ) => {
        
        if ( !this.checkMapBorders(incrementX, incrementY)) {
            return false;
        }

        if ( !this.checkWalls(incrementX, incrementY)) {
            return false;
        }

        return this.checkRobots(incrementX, incrementY);

    }
}

export default ObstacleChecker;