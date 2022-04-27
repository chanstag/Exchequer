import React from 'react';


class Display extends React.Component{

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }
    
     componentWillUnmount() {
    }

    render(){
        
        return(
        <div>
            <h2>It is player {this.props.playerturn}'s turn</h2>
            <p> Their score is {this.props.score}</p>
        </div>
        
        );
    }
  
}

export default Display;