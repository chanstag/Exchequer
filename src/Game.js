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

need to implement uprgading of checkers

**/

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.checkerpositions = this.initBoard();
      console.log(this.checkerpositions[0]);
      console.log(this.checkerpositions[1]);
      this.state = {player1: false, player1_checkers: this.checkerpositions[0], player2_checkers: this.checkerpositions[1], activechecker: [-1,-1], score: [0,0]};
    this.playerMove = this.playerMove.bind(this);
    this.removeActiveChecker = this.removeActiveChecker.bind(this);
    this.calculateMove = this.calculateMove.bind(this);
    }

    calculateMove(rowid, colid){
        let moves = [];
        if(this.state.activechecker[0] < 0 || this.state.activechecker[1] < 0)
        {
            alert("Active checker not set!");
            return false;
        }
        // moves = this.determineAllowedMoves()
        if(this.state.player1){
            let index = this.isItemInArray(this.state.player1_checkers, this.state.activechecker)
            if(index >= 0 && this.state.player1_checkers[index].crowned){
                moves = this.moveForward(this.state.player1)
                moves.push(this.moveBackward(this.state.player1))
            }
            else{
                moves = this.moveForward(this.state.player1)
            }
        }
        else if(!this.state.player1){
            let index = this.isItemInArray(this.state.player2_checkers, this.state.activechecker)
            if(index >= 0 && this.state.player2_checkers[index].crowned){
                moves = this.moveForward(this.state.player1)
                moves.push(...this.moveBackward(this.state.player1))
            }
            else{
                moves = this.moveForward(this.state.player1)
            }
        }
        
        if(moves){
            for(var i = 0; i < moves.length; i++){
                if(moves[i].position[0] === rowid && moves[i].position[1] === colid){
                    if(this.state.player1){ 
                        let activeindex = this.isItemInArray(this.state.player1_checkers, this.state.activechecker);
                        // let moveindex = this.isItemInArray(moves[i].position, [rowid, colid]);
                        this.state.player1_checkers.splice(activeindex, 1, {position: moves[i].position, crowned:  this.state.player1_checkers[activeindex].crowned});
                        if(moves[i].action === "attack"){
                            let eliminatedopponent = moves[i].opponent;
                            let index = this.isItemInArray(this.state.player2_checkers, eliminatedopponent);
                            this.state.player2_checkers.splice(index, 1);
                            this.state.score[0]++;
                        }
                        //need to check if checker has become crowned
                        if(moves[i].position[0] == 0){
                            //we need to crown the checker
                            if(!this.state.player2_checkers[activeindex].crowned){
                                this.state.player1_checkers[activeindex].crowned = true;
                            }
                        }
                        this.setState({player1_checkers: this.state.player1_checkers, player2_checkers: this.state.player2_checkers, player1: false})
                        return true;
                    }
                    else{
                        let activeindex = this.isItemInArray(this.state.player2_checkers, this.state.activechecker);
                        // let moveindex = this.isItemInArray(moves[i].position, [rowid, colid]);
                        this.state.player2_checkers.splice(activeindex, 1, {position: moves[i].position, crowned: this.state.player2_checkers[activeindex].crowned});
                        if(moves[i].action === "attack"){
                            let eliminatedopponent = moves[i].opponent;
                            let index = this.isItemInArray(this.state.player1_checkers, eliminatedopponent);
                            this.state.player1_checkers.splice(index, 1);
                            this.state.score[1]++;
                        }
                        //need to check if checker has become crowned
                        if(moves[i].position[0]  === 7){
                            if(typeof(this.state.player2_checkers[activeindex].crowned) != "undefined"){
                                // this.state.player2_checkers[activeindex].crowned = true;
                                this.setState(state => {state.player2_checkers[activeindex].crowned = true;}, ()=>{});
                            }
                           
                        }
                        this.setState({player1_checkers: this.state.player1_checkers, player2_checkers: this.state.player2_checkers, player1: true})
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
        let moves = [];
        if (this.state.player1) {
            if ((this.state.activechecker[0] - 1) >= 0) {
                let activeindex = this.isItemInArray(this.state.player1_checkers, this.state.activechecker);
                if (this.state.player1_checkers[activeindex].crowned) {

                }
                else {
                    if ((this.state.activechecker[1] - 1) >= 0) {
                        moves.push({ position: [this.state.activechecker[0] - 1, this.state.activechecker[1] - 1], action: "move" });
                    }
                    if (this.state.activechecker[1] + 1 <= 7) {
                        moves.push({ position: [this.state.activechecker[0] - 1, this.state.activechecker[1] + 1], action: "move" });
                    }

                    let removeindexes = [];
                    let itemstopush = [];
                    for (let i = 0; i < moves.length; i++) {
                        if (this.isItemInArray(this.state.player2_checkers, moves[i].position) >= 0) {
                            removeindexes.push(i);
                            let removed = moves[i];
                            if (this.state.activechecker[1] - 2 >= 0 && this.state.activechecker[0] - 2 >= 0) {
                                if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] - 1, this.state.activechecker[1] - 1]) >= 0) {
                                    if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] - 2]) === -1) {
                                        if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] - 2]) === -1) {
                                            if (moves[i].position[0] !== this.state.activechecker[0] - 2 && moves[i].position[1] !== this.state.activechecker[1] - 2) {
                                                itemstopush.push({ position: [this.state.activechecker[0] - 2, this.state.activechecker[1] - 2], action: "attack", opponent: removed.position })
                                            }
                                        }
                                    }
                                }
                            }
                            if (this.state.activechecker[1] + 2 <= 7 && this.state.activechecker[0] - 2 >= 0) {
                                if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] - 1, this.state.activechecker[1] + 1]) >= 0) {
                                    if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2]) === -1) {
                                        if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2]) === -1) {
                                            if (moves[i].position[0] !== this.state.activechecker[0] - 2 && moves[i].position[1] !== this.state.activechecker[1] + 2) {
                                                // if(this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2 ]) === -1){
                                                itemstopush.push({ position: [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2], action: "attack", opponent: removed.position });
                                                // }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        //can't stack checkers in same Tile
                        else if (this.isItemInArray(this.state.player1_checkers, moves[i].position) >= 0) {
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
                    for (let i = 0; i < removeindexes.length; i++) {
                        moves.splice(removeindexes[i], 1);
                    }
                    for (let i = 0; i < itemstopush.length; i++) {
                        moves.push(itemstopush[i]);
                    }
                }
            }
        }
        else {
            if ((this.state.activechecker[0] + 1) <= 7) {
                if ((this.state.activechecker[1] - 1) >= 0) {
                    moves.push({ position: [this.state.activechecker[0] + 1, this.state.activechecker[1] - 1], action: "move" });
                }
                if (this.state.activechecker[1] + 1 <= 7) {
                    moves.push({ position: [this.state.activechecker[0] + 1, this.state.activechecker[1] + 1], action: "move" });
                }
            }
            let removeindexes = [];
            let itemstopush = [];
            for (let i = 0; i < moves.length; i++) {
                if (this.isItemInArray(this.state.player2_checkers, moves[i].position) >= 0) {
                    removeindexes.push(i)
                    //diagnolly to the left
                }
                else if (this.isItemInArray(this.state.player1_checkers, moves[i].position) >= 0) {
                    removeindexes.push(i)
                    let removed = moves[i]
                    if (this.state.activechecker[0] + 2 <= 7 && this.state.activechecker[1] - 2 >= 0) {
                        // if(this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] - 2 ]) === -1){
                        if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] + 1, this.state.activechecker[1] - 1]) >= 0) {
                            if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] - 2]) === -1) {
                                if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] - 2]) === -1) {
                                    if (moves[i].position[0] !== this.state.activechecker[0] + 2 && moves[i].position[1] !== this.state.activechecker[1] - 2) {
                                        itemstopush.push({ position: [this.state.activechecker[0] + 2, this.state.activechecker[1] - 2], action: "attack", opponent: removed.position });
                                    }
                                }
                            }
                        }
                    }

                    //determine if opponents checker is in the bottom right position
                    if (this.state.activechecker[0] + 2 <= 7 && this.state.activechecker[1] + 2 <= 7) {
                        if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] + 1, this.state.activechecker[1] + 1]) >= 0) {
                            if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] + 2]) === -1) {
                                if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] + 2]) === -1) {
                                    if (moves[i].position[0] !== this.state.activechecker[0] + 2 && moves[i].position[1] !== this.state.activechecker[1] + 2) {
                                        itemstopush.push({ position: [this.state.activechecker[0] + 2, this.state.activechecker[1] + 2], action: "attack", opponent: removed.position });
                                    }
                                }
                            }
                        }
                    }
                    // moves.splice(i, 1);
                }

            }

            for (let i = 0; i < removeindexes.length; i++) {
                moves.splice(removeindexes[i], 1);
            }
            for (let i = 0; i < itemstopush.length; i++) {
                moves.push(itemstopush[i]);
            }

        }
        return moves;
    }

    moveForward = (player_turn)=>{
        let moves = [];
        if(player_turn){ 
            // if(this.state.activechecker.crowned){

            // }
            // else{
                if ((this.state.activechecker[1] - 1) >= 0) {
                    moves.push({ position: [this.state.activechecker[0] - 1, this.state.activechecker[1] - 1], action: "move" });
                }
                if (this.state.activechecker[1] + 1 <= 7) {
                    moves.push({ position: [this.state.activechecker[0] - 1, this.state.activechecker[1] + 1], action: "move" });
                }
        
                let removeindexes = [];
                let itemstopush = [];
                for (let i = 0; i < moves.length; i++) {
                    if (this.isItemInArray(this.state.player2_checkers, moves[i].position) >= 0) {
                        removeindexes.push(i);
                        let removed = moves[i];
                        if (this.state.activechecker[1] - 2 >= 0 && this.state.activechecker[0] - 2 >= 0) {
                            if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] - 1, this.state.activechecker[1] - 1]) >= 0) {
                                if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] - 2]) === -1) {
                                    if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] - 2]) === -1) {
                                        if (moves[i].position[0] !== this.state.activechecker[0] - 2 && moves[i].position[1] !== this.state.activechecker[1] - 2) {
                                            itemstopush.push({ position: [this.state.activechecker[0] - 2, this.state.activechecker[1] - 2], action: "attack", opponent: removed.position })
                                        }
                                    }
                                }
                            }
                        }
                        if (this.state.activechecker[1] + 2 <= 7 && this.state.activechecker[0] - 2 >= 0) {
                            if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] - 1, this.state.activechecker[1] + 1]) >= 0) {
                                if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2]) === -1) {
                                    if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2]) === -1) {
                                        if (moves[i].position[0] !== this.state.activechecker[0] - 2 && moves[i].position[1] !== this.state.activechecker[1] + 2) {
                                            // if(this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2 ]) === -1){
                                            itemstopush.push({ position: [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2], action: "attack", opponent: removed.position });
                                            // }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //can't stack checkers in same Tile
                    else if (this.isItemInArray(this.state.player1_checkers, moves[i].position) >= 0) {
                        removeindexes.push(i);
                        // if(this.state.activechecker.position[0] - 2 >= 0 &&  this.state.activechecker.position[1] + 2 <= 7){
                        //     if(this.isItemInArray(this.state.player2_checkers, [this.state.activechecker.position[0] - 2, this.state.activechecker.position[1] + 2 ]) === -1){
                        //         if(this.isItemInArray(this.state.player1_checkers, [this.state.activechecker.position[0] - 2, this.state.activechecker.position[1] + 2 ]) === -1){
                        //             moves.push([this.state.activechecker.position[0] - 2, this.state.activechecker.position[1] - 2]);
                        //         }
                        //     }
                        // }
                    }
                }
                for (let i = 0; i < removeindexes.length; i++) {
                    moves.splice(removeindexes[i], 1);
                }
                for (let i = 0; i < itemstopush.length; i++) {
                    moves.push(itemstopush[i]);
                }
            }
    // }
    else{
        if ((this.state.activechecker[1] - 1) >= 0) {
            moves.push({ position: [this.state.activechecker[0] + 1, this.state.activechecker[1] - 1], action: "move" });
        }
        if (this.state.activechecker[1] + 1 <= 7) {
            moves.push({ position: [this.state.activechecker[0] + 1, this.state.activechecker[1] + 1], action: "move" });
        }

        let removeindexes = [];
        let itemstopush = [];
        for (let i = 0; i < moves.length; i++) {
            if (this.isItemInArray(this.state.player1_checkers, moves[i].position) >= 0) {
                removeindexes.push(i);
                let removed = moves[i];
                if (this.state.activechecker[1] + 2 <= 7 && this.state.activechecker[0] + 2 <= 7) {
                    if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] + 1, this.state.activechecker[1] + 1]) >= 0) {
                        if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] + 2]) === - 1) {
                            if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] + 2]) === - 1) {
                                if (moves[i].position[0] !== this.state.activechecker[0] + 2 && moves[i].position[1] !== this.state.activechecker[1] - 2) {
                                    itemstopush.push({ position: [this.state.activechecker[0] + 2, this.state.activechecker[1] + 2], action: "attack", opponent: removed.position })
                                }
                            }
                        }
                    }
                }
                if (this.state.activechecker[1] - 2 >= 0 && this.state.activechecker[0] + 2 <= 7) {
                    if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] + 1, this.state.activechecker[1] - 1]) >= 0) {
                        if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] - 2]) === -1) {
                            if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] - 2]) === -1) {
                                if (moves[i].position[0] !== this.state.activechecker[0] + 2 && moves[i].position[1] !== this.state.activechecker[1] - 2) {
                                    // if(this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2 ]) === -1){
                                    itemstopush.push({ position: [this.state.activechecker[0] + 2, this.state.activechecker[1] - 2], action: "attack", opponent: removed.position });
                                    // }
                                }
                            }
                        }
                    }
                }
            }
            //can't stack checkers in same Tile
            else if (this.isItemInArray(this.state.player2_checkers, moves[i].position) >= 0) {
                removeindexes.push(i);
                // if(this.state.activechecker.position[0] - 2 >= 0 &&  this.state.activechecker.position[1] + 2 <= 7){
                //     if(this.isItemInArray(this.state.player2_checkers, [this.state.activechecker.position[0] - 2, this.state.activechecker.position[1] + 2 ]) === -1){
                //         if(this.isItemInArray(this.state.player2_checkers, [this.state.activechecker.position[0] - 2, this.state.activechecker.position[1] + 2 ]) === -1){
                //             moves.push([this.state.activechecker.position[0] - 2, this.state.activechecker.position[1] - 2]);
                //         }
                //     }
                // }
            }
        }
        for (let i = 0; i < removeindexes.length; i++) {
            moves.splice(removeindexes[i], 1);
        }
        for (let i = 0; i < itemstopush.length; i++) {
            moves.push(itemstopush[i]);
        }
    }
    return moves;
        
    }

    moveBackward(player1){
        let moves = [];
        if(player1){
            if ((this.state.activechecker[0] + 1) <= 7) {
                if ((this.state.activechecker[1] - 1) >= 0) {
                    moves.push({ position: [this.state.activechecker[0] + 1, this.state.activechecker[1] - 1], action: "move" });
                }
                if (this.state.activechecker[1] + 1 <= 7) {
                    moves.push({ position: [this.state.activechecker[0] + 1, this.state.activechecker[1] + 1], action: "move" });
                }
            }
            let removeindexes = [];
            let itemstopush = [];
            for (let i = 0; i < moves.length; i++) {
                if (this.isItemInArray(this.state.player1_checkers, moves[i].position) >= 0) {
                    removeindexes.push(i)
                    //diagnolly to the left
                }
                else if (this.isItemInArray(this.state.player2_checkers, moves[i].position) >= 0) {
                    removeindexes.push(i)
                    let removed = moves[i]
                    if (this.state.activechecker[0] + 2 <= 7 && this.state.activechecker[1] - 2 >= 0) {
                        // if(this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] - 2 ]) === -1){
                        if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] + 1, this.state.activechecker[1] - 1]) >= 0) {
                            if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] - 2]) === -1) {
                                if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] - 2]) === -1) {
                                    if (moves[i].position[0] !== this.state.activechecker[0] + 2 && moves[i].position[1] !== this.state.activechecker[1] - 2) {
                                        itemstopush.push({ position: [this.state.activechecker[0] + 2, this.state.activechecker[1] - 2], action: "attack", opponent: removed.position });
                                    }
                                }
                            }
                        }
                    }

                    //determine if opponents checker is in the bottom right position
                    if (this.state.activechecker[0] + 2 <= 7 && this.state.activechecker[1] + 2 <= 7) {
                        if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] + 1, this.state.activechecker[1] + 1]) >= 0) {
                            if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] + 2]) === -1) {
                                if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] + 2]) === -1) {
                                    if (moves[i].position[0] !== this.state.activechecker[0] + 2 && moves[i].position[1] !== this.state.activechecker[1] + 2) {
                                        itemstopush.push({ position: [this.state.activechecker[0] + 2, this.state.activechecker[1] + 2], action: "attack", opponent: removed.position });
                                    }
                                }
                            }
                        }
                    }
                    // moves.splice(i, 1);
                }

            }

            for (let i = 0; i < removeindexes.length; i++) {
                moves.splice(removeindexes[i], 1);
            }
            for (let i = 0; i < itemstopush.length; i++) {
                moves.push(itemstopush[i]);
            }
        }
        else{
            if ((this.state.activechecker[0] - 1) >= 0) {
                if ((this.state.activechecker[1] - 1) >= 0) {
                    moves.push({ position: [this.state.activechecker[0] - 1, this.state.activechecker[1] - 1], action: "move" });
                }
                if (this.state.activechecker[1] + 1 <= 7) {
                    moves.push({ position: [this.state.activechecker[0] - 1, this.state.activechecker[1] + 1], action: "move" });
                }
            }
            let removeindexes = [];
            let itemstopush = [];
            for (let i = 0; i < moves.length; i++) {
                if (this.isItemInArray(this.state.player2_checkers, moves[i].position) >= 0) {
                    removeindexes.push(i)
                    //diagnolly to the left
                }
                else if (this.isItemInArray(this.state.player1_checkers, moves[i].position) >= 0) {
                    removeindexes.push(i)
                    let removed = moves[i]
                    if (this.state.activechecker[0] - 2 >=  0 && this.state.activechecker[1] - 2 >= 0) {
                        // if(this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] + 2, this.state.activechecker[1] - 2 ]) === -1){
                        if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] - 1, this.state.activechecker[1] - 1]) >= 0) {
                            if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] - 2]) === -1) {
                                if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] - 2]) === -1) {
                                    if (moves[i].position[0] !== this.state.activechecker[0] - 2 && moves[i].position[1] !== this.state.activechecker[1] - 2) {
                                        itemstopush.push({ position: [this.state.activechecker[0] - 2, this.state.activechecker[1] - 2], action: "attack", opponent: removed.position });
                                    }
                                }
                            }
                        }
                    }

                    //determine if opponents checker is in the bottom right position
                    if (this.state.activechecker[0] - 2 >= 0 && this.state.activechecker[1] + 2 <= 7) {
                        if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] - 1, this.state.activechecker[1] + 1]) >= 0) {
                            if (this.isItemInArray(this.state.player1_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2]) === -1) {
                                if (this.isItemInArray(this.state.player2_checkers, [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2]) === -1) {
                                    if (moves[i].position[0] !== this.state.activechecker[0] - 2 && moves[i].position[1] !== this.state.activechecker[1] + 2) {
                                        itemstopush.push({ position: [this.state.activechecker[0] - 2, this.state.activechecker[1] + 2], action: "attack", opponent: removed.position });
                                    }
                                }
                            }
                        }
                    }
                    // moves.splice(i, 1);
                }

            }

            for (let i = 0; i < removeindexes.length; i++) {
                moves.splice(removeindexes[i], 1);
            }
            for (let i = 0; i < itemstopush.length; i++) {
                moves.push(itemstopush[i]);
            }

        }
        return moves
        
    }
    

    isItemInArray = (array, item)=>{
        for (var i = 0; i < array.length; i++) {
            // This if statement depends on the format of your array
            //changing this to be compatible with code in determineAllowedMoves
            if(typeof(array[i].position) != "undefined"){
                if(array[i].position[0] == item[0] && array[i].position[1] == item[1]){
                    return i;
                }
            }
            else if (array[i][0] == item[0] && array[i][1] == item[1]) {
                return i;   // Found it
            }

        }
        return -1;   // Not found
    }

    initBoard = ()=>{
        let player1=[];
        let player2=[];
        let startingpositions = [];
        for(let i = 0 ; i < 2; i++){
            for(let j = 0; j < 8; j++){
                player1.push({position: [i+6,j], crowned: false});
                player2.push({position: [i, j], crowned: false});
            }
        }
        startingpositions.push(player1);
        startingpositions.push(player2);
        return startingpositions;
    }

    playerMove = (rowid, colid, fnc)=>{
        // alert("Player Move!");
        this.setState(state => ({
            // player1: !state.player1,
            activechecker: [rowid, colid]
          }), fnc);
    }

    removeActiveChecker = ()=>{
        this.setState({activechecker: [-1, -1]});
    }
    
    componentDidMount = ()=>{
    }
    
     componentWillUnmount = ()=>{
    }

    
     render = ()=> {
         if(this.state.player1 == true){
            return(
                <div>
                <Board player1_checkers={this.state.player1_checkers} calculateMove={this.calculateMove} destroyactivechecker={this.removeActiveChecker} activechecker={this.state.activechecker} player2_checkers={this.state.player2_checkers} player1={this.state.player1} playermove={this.playerMove}/>
                
                <Display playerturn={1} score={this.state.score[0]}/>
                 </div>
                );
         }
         else{
            return(
                <div>
                <Board player1_checkers={this.state.player1_checkers}  calculateMove={this.calculateMove} destroyactivechecker={this.removeActiveChecker} activechecker={this.state.activechecker} player2_checkers={this.state.player2_checkers} player1={this.state.player1} playermove={this.playerMove}/>
                
                <Display playerturn={2} score={this.state.score[1]} activechecker={this.state.activechecker}/>
                 </div>
                );
         }
       
     }
  }

  export default Game;