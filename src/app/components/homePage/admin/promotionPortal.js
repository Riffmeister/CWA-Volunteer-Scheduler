import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';

@observer
class PromotionPortal extends React.Component {

    render() {
        return (
           <div className='jobs admin'>
            <h2>Jobs</h2>
            <div className='jobs-body'>
              {jobElements}
            </div>
           </div>
        )
    }
}
export default PromotionPortal;
