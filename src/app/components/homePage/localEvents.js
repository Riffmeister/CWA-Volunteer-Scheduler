import React from 'react';
import ReactDOM from 'react-dom';

require('./home.less')


class LocalEvents extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
           <section className='local-events'>
                   Local Events
           </section>
        )
    }
}
export default LocalEvents;
