import React from 'react';
import Board from './Board';
import Display from './Display'

/*

Logic considerations

Initially creating the checker positions and passing them down to components

Deleting checkers once they're eliminated from the game

implementing possible moves for the checkers

checkers cannot occupy the same space

checkers must remain within the dimensions of the board

**/

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.checkerpositions = this.initBoard();
      console.log(this.checkerpositions[0]);
      console.log(this.checkerpositions[1]);
      this.state = {player1: false, player1_checkers: this.checkerpositions[0], player2_checkers: this.checkerpositions[1], activechecker: [-1,-1]};
    this.playerMove = this.playerMove.bind(this);
    this.removeActiveChecker = this.removeActiveChecker.bind(this);
    this.calculateMove = this.calculateMove.bind(this);
    }

    calculateMove(rowid, colid){
        if(this.state.activechecker[0] < 0 || this.state.activechecker[1] < 0)
        {
            alert("Active checker not set!");
        }
        let moves = this.determineAllowedMoves()
        if(moves){
            for(var i = 0; i < moves.length; i++){
                if(moves[i].position[0] == rowid && moves[i].position[1] == colid){
                    if(this.state.player1){
                        let activeindex = this.isItemInArray(this.state.player1_checkers, this.state.activechecker);
                        // let moveindex = this.isItemInArray(moves[i].position, [rowid, colid]);
                        this.state.player1_checkers.splice(activeindex, 1, moves[i].position);
                        if(moves[i].action === "attack"){
                            let eliminatedopponent = moves[i].opponent;
                            let index = this.isItemInArray(this.state.player2_checkers, eliminatedopponent);
                            this.state.player2_checkers.splice(index, 1);
                        }
                        this.setState({player1_checkers: this.state.player1_checkers, player2_checkers: this.state.player2_checkers, player1: false})
                        return true;
                    }
                    else{
                        let activeindex = this.isItemInArray(this.state.player2_checkers, this.state.activechecker);
                        // let moveindex = this.isItemInArray(moves[i].position, [rowid, colid]);
                        this.state.player2_checkers.splice(activeindex, 1, moves[i].position);
                        if(moves[i].action === "attack"){
                            let eliminatedopponent = moves[i].opponent;
                            let index = this.isItemInArray(this.state.player1_checkers, eliminatedopponent);
                            this.state.player1_checkers.splice(index, 1);
                        }
                        this.setState({player2_checkers: this.state.player2_checkers,player2_checkers: this.state.player2_checkers, player1: true})
                        return true;
                    }
                }
            }
        }
        else{
            return false;
        }
}

    determineAllowedMoves(){
        let moves = []
        if(this.state.player1){
            if((this.state.activechecker[0] - 1) >=0){
                if((this.state.activechecker[1] - 1) >=0){
                    moves.push({position: [this.state.activechecker[0]-1, this.state.activechecker[1]-1], action: "move"});
                }
                if (this.state.activechecker[1] + 1 <= 7){
                    moves.push({position: [this.state.activechecker[0]-1, this.state.activechecker[1]+1], action: "move"});
                }
            }
            let removeindexes = [];
            let itemstopush = [];
            for(let i = 0; i < moves.length; i++){
                if(this.isItemInArray(this.state.player2_checkers, moves[i].position) >= 0){
                   removeindexes.push(i);
                   let removed = moves[i];
                    if(this.state.activechecker[1] - 2 >=0 && this.state.activechecker[0] - 2 >=0){
                        if(this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] - 1, this.state.activechecker[1] - 1 ]) >= 0){
                            if(this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] - 2 ]) === -1){
                                if(this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] - 2 ]) === -1){
                                    if(moves[i].position[0] !== this.state.activechecker[0] - 2 && moves[i].position[1] !== this.state.activechecker[1] - 2){
                                        itemstopush.push({position: [this.state.activechecker[0] - 2, this.state.activechecker[1] - 2], action: "attack", opponent: removed.position})
                                    }
                                }
                            }
                        }
                    }
                    if(this.state.activechecker[1] + 2 <=7 && this.state.activechecker[0] - 2 >=0){
                        if(this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] - 1, this.state.activechecker[1] + 1 ]) >= 0){
                            if(this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2 ]) === -1){
                                if(this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2 ]) === -1){
                                    if( moves[i].position[0] !== this.state.activechecker[0] - 2 && moves[i].position[1] !== this.state.activechecker[1] + 2 ){
                                    // if(this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2 ]) === -1){
                                        itemstopush.push({position: [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2], action: "attack", opponent: removed.position});
                                    // }
                                    }
                                }
                            }
                        }
                    }
                }
                //can't stack checkers in same Tile
                else if(this.isItemInArray(this.state.player1_checkers, moves[i].position) >= 0){
                    removeindexes.push(i);
                    // if(this.state.activechecker[0] - 2 >= 0 &&  this.state.activechecker[1] + 2 <= 7){
                    //     if(this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2 ]) === -1){
                    //         if(this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2 ]) === -1){
                    //             moves.push([this.state.activechecker[0] - 2, this.state.activechecker[1] - 2]);
                    //         }
                    //     }
                    // }
                }
            }
            for(let i = 0; i < removeindexes.length; i++){
                moves.splice(removeindexes[i], 1);
            }
            for(let i = 0; i < itemstopush.length; i++){
                moves.push(itemstopush[i]);
            }
                

        }
        else{
            if((this.state.activechecker[0] + 1) <= 7){
                if((this.state.activechecker[1] - 1) >= 0){
                    moves.push({position: [this.state.activechecker[0]+1, this.state.activechecker[1]-1], action: "move"});
                }
                if (this.state.activechecker[1] + 1 <= 7){
                    moves.push({position: [this.state.activechecker[0]+1, this.state.activechecker[1]+1], action:"move"});
                }
            }
            let removeindexes = [];
            let itemstopush = [];
            for(let i = 0; i < moves.length; i++){
                if(this.isItemInArray(this.state.player2_checkers, moves[i].position) >= 0){
                    removeindexes.push(i)
                    //diagnolly to the left
                }
                else if(this.isItemInArray(this.state.player1_checkers, moves[i].position) >= 0){
                    removeindexes.push(i)
                    let removed = moves[i]
                    if(this.state.activechecker[0] + 2 <= 7 && this.state.activechecker[1] - 2 >=0){
                        // if(this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] - 2 ]) === -1){
                        if(this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] + 1, this.state.activechecker[1] - 1 ]) >= 0){
                            if(this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] - 2 ]) === -1){
                                    if(this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] - 2 ]) === -1){
                                        if( moves[i].position[0] !== this.state.activechecker[0] + 2 && moves[i].position[1] !== this.state.activechecker[1] - 2 ){
                                            itemstopush.push({position:[this.state.activechecker[0] + 2, this.state.activechecker[1] - 2], action: "attack", opponent: removed.position});
                                        }
                                    }
                                }
                            }
                    }
                    
                    //determine if opponents checker is in the bottom right position
                    if(this.state.activechecker[0] + 2 <= 7 && this.state.activechecker[1] + 2 <=7){
                        if(this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] + 1, this.state.activechecker[1] + 1 ]) >= 0){
                            if(this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] + 2 ]) === -1){
                                if(this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] + 2 ]) === -1){
                                    if( moves[i].position[0] !== this.state.activechecker[0] + 2 && moves[i].position[1] !== this.state.activechecker[1] + 2 ){
                                        itemstopush.push({postion:[this.state.activechecker[0] + 2, this.state.activechecker[1] + 2], action: "attack", opponent: removed.position});
                                    }
                                }
                            }
                        }
                    }
                    // moves.splice(i, 1);
                }
                
            }

            for(let i = 0; i < removeindexes.length; i++){
                moves.splice(removeindexes[i], 1);
            }
            for(let i = 0; i < itemstopush.length; i++){
                moves.push(itemstopush[i]);
            }
       
    }
    return moves;
}

    isItemInArray(array, item) {
        for (var i = 0; i < array.length; i++) {
            // This if statement depends on the format of your array
            if (array[i][0] == item[0] && array[i][1] == item[1]) {
                return i;   // Found it
            }
        }
        return -1;   // Not found
    }

    initBoard(){
        let player1=[];
        let player2=[];
        let startingpositions = []
        for(let i = 0 ; i < 2; i++){
            for(let j = 0; j < 8; j++){
                player1.push([i+6,j]);
                player2.push([i, j]);
            }
        }
        startingpositions.push(player1);
        startingpositions.push(player2);
        return startingpositions;
    }

    playerMove(rowid, colid, fnc){
        // alert("Player Move!");
        this.setState(state => ({
            // player1: !state.player1,
            activechecker: [rowid, colid]
          }), fnc);
    }

    removeActiveChecker(){
        this.setState({activechecker: [-1, -1]});
    }
    
    componentDidMount() {
    }
    
     componentWillUnmount() {
    }

    
     render() {
         if(this.state.player1 == true){
            return(
                <div>
                <Board player1_checkers={this.state.player1_checkers} calculateMove={this.calculateMove} destroyactivechecker={this.removeActiveChecker} activechecker={this.state.activechecker} player2_checkers={this.state.player2_checkers} player1={this.state.player1} playermove={this.playerMove}/>
                
                <Display playerturn={1}/>
                 </div>
                );
         }
         else{
            return(
                <div>
                <Board player1_checkers={this.state.player1_checkers}  calculateMove={this.calculateMove} destroyactivechecker={this.removeActiveChecker} activechecker={this.state.activechecker} player2_checkers={this.state.player2_checkers} player1={this.state.player1} playermove={this.playerMove}/>
                
                <Display playerturn={2} activechecker={this.state.activechecker}/>
                 </div>
                );
         }
       
     }
  }

  export default Game;