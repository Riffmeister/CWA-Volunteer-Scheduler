import React from 'react';
import ReactDOM from 'react-dom';

class Footer extends React.Component {
  render() {
    return (
		<section className='menu'>
			<div id='footer' className='content-container'>
				<ul>
					<li><a href="http://www.facebook.com/cwaboulder" target="out" title="Link to Conference on World Affairs Facebook Page"><i className="fa fa-facebook-square fa-2x" aria-hidden="true"></i></a></li>
					<li><a>Twitter</a></li>
					<li><a>Youtube</a></li>
					<li><a>Contact Us</a></li>
				</ul>

		    </div>
		</section>)
  }
}

export default Footer;
