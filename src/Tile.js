import React from 'react';
import { throwStatement } from '@babel/types';


class Tile extends React.Component{

    constructor(props){
      super(props);
      this.updateChecker = this.updateChecker;
      this.flashChecker = this.flashChecker;
      this.onSelection = this.onSelection;
      this.updateTile = this.updateTile;
      this.state = {flashcolor: false, intervalFlash: {}};
    }          

    onSelection = ()=>{
      let binaryaction = this.props.calculateMove(this.props.rowid, this.props.colid);
      if(binaryaction){
        this.props.destroyactivechecker();
        clearInterval(this.intervalFlash);
        this.updateTile();
      }
    }

    updateChecker = ()=>{
      const canvas = this.refs[this.props.colid];
      const ctx = canvas.getContext("2d");
      const originalcolor = ctx.fillStyle;
      if(this.intervalFlash !== "undefined"){
        clearInterval(this.intervalFlash);
      }
      this.intervalFlash = setInterval(()=>{this.flashChecker(ctx, originalcolor)}, 100);
    }

    updateTile = ()=>{
        const canvas = this.refs[this.props.colid]
        const ctx = canvas.getContext("2d");
        ctx.moveTo(0,0);
        ctx.lineTo(50,0);
        ctx.lineTo(50,50);
        ctx.lineTo(0, 50);
        ctx.lineTo(0, 0);
        ctx.stroke();
        if(this.props.fill == true){
          ctx.fillStyle =  "#000000";
          ctx.fillRect(0,0,50,50);
        }
        else{
          ctx.fillStyle =  "#FFFFFF";
          ctx.fillRect(0,0,50,50);
        }
        if(this.props.checkercolor == "red"){
          if(this.props.activechecker[0] == this.props.rowid && this.props.activechecker[1] == this.props.colid){
            ctx.beginPath();
            ctx.arc(25, 25, 20, 0, 2*Math.PI);
            ctx.fillStyle = "#FF0000";
            ctx.fill()
            this.intervalFlash = setInterval(()=>{this.flashChecker(ctx, ctx.fillStyle)}, 100);
          }
          else{
            if(typeof(this.intervalFlash) !== "undefined"){
              clearInterval(this.intervalFlash);
            }
            ctx.beginPath();
            ctx.arc(25, 25, 20, 0, 2*Math.PI);
            ctx.fillStyle = "#FF0000";
            ctx.fill();
          }
        }
        else if(this.props.checkercolor == "green"){
          if(this.props.activechecker[0] == this.props.rowid && this.props.activechecker[1] == this.props.colid){
            ctx.beginPath();
            ctx.arc(25, 25, 20, 0, 2*Math.PI);
            ctx.fillStyle = "#008000";
            ctx.fill()
            // this.setState({flashing: this.flashChecker});
            this.intervalFlash = setInterval(()=>{this.flashChecker(ctx, ctx.fillStyle)}, 100)
          }
          else{
            if(typeof(this.intervalFlash) !== "undefined"){
              clearInterval(this.intervalFlash);
            }
            ctx.beginPath();
            ctx.arc(25, 25, 20, 0, 2*Math.PI);
            ctx.fillStyle = "#008000";
            ctx.fill();
            
          }
        }
    }

    componentDidUpdate(prevprops){
      if(this.props.activechecker[0] !== this.props.rowid || this.props.activechecker[1] !== this.props.colid){
        this.updateTile();
      }
      if(this.props.checkercolor !== prevprops.checkercolor){
        this.updateTile();
      }
      if(this.props.activechecker[0] === -1 && this.props.activechecker[0] === -1 && prevprops.activechecker[0] >= 0 && prevprops.activechecker[1] >= 0){
        clearInterval(this.intervalFlash);
        this.updateTile();
      }
      if(this.props.activechecker[0] ==! prevprops.activechecker[0] && this.props.activechecker[1] ==! prevprops.activechecker[1]){
        clearInterval(this.intervalFlash);
        this.updateTile();
      }
    }

    componentDidMount() {
      this.updateTile();
    }

    flashChecker = (ctx, originalcolor) =>{
      this.setState({flashcolor: !(this.state.flashcolor)}, ()=>{
      ctx.beginPath();
      ctx.arc(25, 25, 20, 0, 2*Math.PI);
      if(this.state.flashcolor){
        ctx.fillStyle = "#0e11cc";
      }
      else{
        ctx.fillStyle = originalcolor;
      }
      
      ctx.fill()
      });
    }
    
     componentWillUnmount() {
    }             
      render() {

        //I'm pretty sure this decision making being done here violates the abstract state principle, this should be performed in component above
        if(this.props.checkercolor == "red" && this.props.player1 == true){
            return(<canvas ref={this.props.colid} width="50" onClick={(e) => this.props.playermove(this.props.rowid, this.props.colid, this.updateChecker, e)} height="50"></canvas>);
        }
        else if(this.props.checkercolor == "green" && this.props.player1 == false){
            return(<canvas ref={this.props.colid} width="50" onClick={(e) => this.props.playermove(this.props.rowid, this.props.colid, this.updateChecker, e)} height="50"></canvas>);
        }
        else{
            return(<canvas ref={this.props.colid} width="50" onClick={(e)=>{this.onSelection();}} height="50"></canvas>);
        }
       
     }
    
  }

  export default Tile;