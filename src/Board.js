import React from 'react';
import Row from './Row';

class Board extends React.Component{
    constructor(props) {
      super(props)
    //   this.state={player1: this.props.player1_checkers, player2: this.props.player2_checkers}
        console.log(this.props)
    }

    componentDidMount() {
    }
    
     componentWillUnmount() {
    }

    drawGrid(){
        let rows = [];
        for(let i = 0; i < 8; i++){
            let redcheckers = [];
            let greencheckers = [];
            for(let coordinate of this.props.player1_checkers){
                if (coordinate[0] == i){
                    redcheckers.push(coordinate[1]);
                }
            }
            for(let coordinate of this.props.player2_checkers){
                if (coordinate[0] == i){
                    greencheckers.push(coordinate[1]);
                }
            }
            if(i % 2 == 1){
                rows.push(<Row rowid={i} color={true} calculateMove={this.props.calculateMove} activechecker={this.props.activechecker} destroyactivechecker={this.props.destroyactivechecker} redcheckers={redcheckers} greencheckers={greencheckers} player1={this.props.player1} playermove={this.props.playermove}/>);
            }
            else{
                rows.push(<Row rowid={i} color={false} calculateMove={this.props.calculateMove} activechecker={this.props.activechecker} destroyactivechecker={this.props.destroyactivechecker} redcheckers={redcheckers} greencheckers={greencheckers} player1={this.props.player1} playermove={this.props.playermove}/>);
            }
            
        }
        return rows;
    }
    
    render() {
       return(
          <div> 
           {this.drawGrid()}
         </div>
       );
     }
  }

  export default Board;