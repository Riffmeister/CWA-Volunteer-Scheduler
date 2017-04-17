import { browserHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';

require('./footer.less')

class Footer extends React.Component {

  constructor() {
      super();
      this.state = {
          displayFooter: 'hide-mobile'
      }
  }

  render() {
    return (
		<section className='menu'>
      <footer className='content-container clearfix'>

			<div id='links-footer'>
				<ul>
          <div id="footer-info">
  					<li><a href="http://www.colorado.edu/cwa/" target="out" title="Conference on World Affairs Home"><i className="fa fa-university"></i>CWA Home</a></li>
            <li onClick={this._handleClick.bind(this)}><a>Support</a></li>
          </div>
				</ul>
		  </div>
      </footer>
		</section>)
  }


  _handleClick(redirect){
  	event.preventDefault()
    browserHistory.push('/vms2/support')
    }


}

export default Footer;
