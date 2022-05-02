import React from 'react';
import Tile from './Tile'

class Row extends React.Component {
    constructor(props) {
      super(props);
      console.log("Row", this.props)
    }
    componentDidMount() {
    }

    componentWillUnmount() {
    }
    
    renderRow(){
      let tiles = []
      for(let i = 0; i < 8; i++){
          if(this.props.redcheckers.includes(i)){
                if(this.props.color == true){
                    if(i%2 == 1){
                        tiles.push(<Tile fill={true} rowid={this.props.rowid} calculateMove={this.props.calculateMove} activechecker={this.props.activechecker} destroyactivechecker={this.props.destroyactivechecker}  playermove={this.props.playermove} player1={this.props.player1} checkercolor="red" colid={i}/>)
                    }
                    else{
                        tiles.push(<Tile fill={false} rowid={this.props.rowid} calculateMove={this.props.calculateMove} activechecker={this.props.activechecker} destroyactivechecker={this.props.destroyactivechecker}  playermove={this.props.playermove} player1={this.props.player1} checkercolor="red" colid={i}/>)
                    }
                }
                else{
                    if(i%2 == 1){
                        tiles.push(<Tile fill={false} rowid={this.props.rowid} calculateMove={this.props.calculateMove} activechecker={this.props.activechecker} destroyactivechecker={this.props.destroyactivechecker}  playermove={this.props.playermove} player1={this.props.player1} checkercolor="red" colid={i}/>)
                    }
                    else{
                        tiles.push(<Tile fill={true} rowid={this.props.rowid} calculateMove={this.props.calculateMove} activechecker={this.props.activechecker} destroyactivechecker={this.props.destroyactivechecker}  playermove={this.props.playermove} player1={this.props.player1} checkercolor="red" colid={i}/>)
                    }
                
                }
            }
          else if(this.props.greencheckers.includes(i)){
            if(this.props.color == true){
                if(i%2 == 1){
                    tiles.push(<Tile fill={true}  rowid={this.props.rowid} calculateMove={this.props.calculateMove} playermove={this.props.playermove} activechecker={this.props.activechecker} destroyactivechecker={this.props.destroyactivechecker} player1={this.props.player1} checkercolor="green"  colid={i}/>)
                  }
                  else{
                    tiles.push(<Tile fill={false} rowid={this.props.rowid} calculateMove={this.props.calculateMove} playermove={this.props.playermove} activechecker={this.props.activechecker} destroyactivechecker={this.props.destroyactivechecker} player1={this.props.player1} checkercolor="green" colid={i}/>)
                  }
              }
              else{
                if(i%2 == 1){
                    tiles.push(<Tile fill={false} rowid={this.props.rowid} calculateMove={this.props.calculateMove} playermove={this.props.playermove} activechecker={this.props.activechecker} destroyactivechecker={this.props.destroyactivechecker} player1={this.props.player1} checkercolor="green" colid={i}/>)
                  }
                  else{
                    tiles.push(<Tile fill={true} rowid={this.props.rowid} calculateMove={this.props.calculateMove} playermove={this.props.playermove} activechecker={this.props.activechecker} destroyactivechecker={this.props.destroyactivechecker} player1={this.props.player1} checkercolor="green" colid={i}/>)
                }
              }

          }
          else{
            if(this.props.color == true){
                if(i%2 == 1){
                    tiles.push(<Tile fill={true} rowid={this.props.rowid} calculateMove={this.props.calculateMove} playermove={this.props.playermove} activechecker={this.props.activechecker} destroyactivechecker={this.props.destroyactivechecker} player1={this.props.player1} checkercolor={null} colid={i}/>)
                  }
                  else{
                    tiles.push(<Tile fill={false} rowid={this.props.rowid} calculateMove={this.props.calculateMove} playermove={this.props.playermove} activechecker={this.props.activechecker} destroyactivechecker={this.props.destroyactivechecker} player1={this.props.player1} checkercolor={null} colid={i}/>)
                  }
              }
              else{
                if(i%2 == 1){
                    tiles.push(<Tile fill={false} rowid={this.props.rowid} calculateMove={this.props.calculateMove} playermove={this.props.playermove} activechecker={this.props.activechecker} destroyactivechecker={this.props.destroyactivechecker} player1={this.props.player1} checkercolor={null} colid={i}/>)
                  }
                  else{
                    tiles.push(<Tile fill={true} rowid={this.props.rowid} calculateMove={this.props.calculateMove} playermove={this.props.playermove} activechecker={this.props.activechecker} destroyactivechecker={this.props.destroyactivechecker} player1={this.props.player1} checkercolor={null} colid={i}/>)
                }
              }

          }
         
      }
      return tiles;
    }
    
     render() {
       return(
          <div style={{height: '50px'}}> 
           {this.renderRow()}
         </div>);
     }
  }

  export default Row;