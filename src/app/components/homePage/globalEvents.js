import React from 'react';
import ReactDOM from 'react-dom';

require('./home.less')

class GlobalEvents extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
           <section className='global-events'>
                   Global Events
           </section>
        )
    }
}
export default GlobalEvents;
