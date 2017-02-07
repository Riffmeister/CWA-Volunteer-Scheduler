import React from 'react';
import ReactDOM from 'react-dom';

class Footer extends React.Component {
  render() {
    return (
		<section className='menu'>
      <footer className='content-container clearfix'>

			<div id='links-footer'>
				<ul>
          <li id="footer-visible-menu"><a><i className="fa fa-bars"></i></a></li>
          <div id="footer-info">
  					<li><a href="http://www.facebook.com/cwaboulder" target="out" title="Link to Conference on World Affairs Facebook Page"><i className="fa fa-home"></i>Facebook</a></li>
  					<li><a><i className="fa fa-twitter-square"></i>Twitter</a></li>
  					<li><a><i className="fa fa-youtube-play"></i>Youtube</a></li>
            <li><a><i className="fa fa-instagram"></i>Instagram</a></li>
          </div>
				</ul>
		  </div>

        <div id="contact-info">
          <div>
              <h2><a href="http://www.colorado.edu/cwa/">Conference on World Affairs </a></h2>
              <div className="content">
                <p>1344 Grandview Avenue<br />Boulder, CO 80309<br />465 UCB</p>
                <p><a href="mailto:cwa@colorado.edu">cwa@colorado.edu</a><br />Office: (303) 492-2525<br />Fax: (303) 492-3934</p>
              </div>
        </div>

        <div >
          <p><a href="//www.colorado.edu"><img src="http://www.colorado.edu/cwa/profiles/express/themes/expressbase/images/beboulder/be-boulder-white.png" alt="University of Colorado Boulder"/></a></p>
          <p><strong><a href="http://www.colorado.edu">University of Colorado Boulder</a></strong><br />&copy; Regents of the University of Colorado<br />
          <span ><a href="http://www.colorado.edu/about/privacy-statement">Privacy</a> &bull; <a href="http://www.colorado.edu/about/legal-trademarks">Legal &amp; Trademarks</a></span></p>
        </div>

        </div>
      </footer>
		</section>)
  }
}

export default Footer;
