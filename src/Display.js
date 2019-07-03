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
        
        return(<h2>It is player {this.props.playerturn}'s turn</h2>)
    }
  
}

export default Display;