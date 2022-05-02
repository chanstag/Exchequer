import React from 'react';
import Board from './Board';

class Display extends React.Component{

    constructor(props) {
        super(props)
        // this.state.rerender = 0;
    }


    // restartGame(){
        
    //     this.checkerpositions = this.props.initBoard();
    //     this.setState({player1: false, player1_checkers: this.checkerpositions[0], player2_checkers: this.checkerpositions[1], activechecker: [-1,-1], score: [0,0]});
    //     // this.state.rerender = 1;
    // }

    componentDidMount() {
    }

     componentWillUnmount() {
    }

    render=()=>{
            return(
                <div>
                    <h2>It is player {this.props.playerturn}'s turn</h2>
                    <p> Their score is {this.props.score}</p>
                    <button type="button" onClick={this.props.restartGame.bind(this)}>
                        <span>Reload</span>
                    </button>
                </div>
                );
        }
    }



export default Display;