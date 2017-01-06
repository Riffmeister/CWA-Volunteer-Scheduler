import React from 'react';
import ReactDOM from 'react-dom';
import Header from './../../shared/header';

require('./home.less')
class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
			<section id='home'>
				Home
			</section>
        )
    }
}
export default Home;
