import React from 'react';
import ReactDOM from 'react-dom';
import Header from './../shared/header';

class Home extends React.Component {

    constructor(props) {
        super(props);
    }
    //will need an action and method="post" on this form tag to direct to server

    render() {
        return (
            <div><h1>Home</h1></div>
        )
    }
}
export default Home;
