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
  					<li><a href="http://www.colorado.edu/cwa/" target="out" title="Conference on World Affairs Home"><i className="fa fa-home"></i>CWA Home</a></li>
          </div>
				</ul>
		  </div>
      </footer>
		</section>)
  }


  _toggleMenu(){
    if(this.state.displayFooter == 'hide-mobile'){
      this.setState({displayFooter: 'make-visible-mobile'});
    } else {
      this.setState({displayFooter: 'hide-mobile'});
    }
  }
}

export default Footer;
