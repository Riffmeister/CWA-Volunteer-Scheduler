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
          <li id="footer-visible-menu"><button  onClick={this._toggleMenu.bind(this)}><i className="fa fa-bars"></i>Social Media Links<i className="fa fa-bars"></i></button></li>
          <div className={this.state.displayFooter}>
          <div id="footer-info">
  					<li><a href="http://www.facebook.com/cwaboulder" target="out" title="Conference on World Affairs Facebook"><i className="fa fa-home"></i>Facebook</a></li>
  					<li><a href="https://twitter.com/cwaboulder" target="out" title="Conference on World Affairs Twitter"><i className="fa fa-twitter-square"></i>Twitter</a></li>
  					<li><a href="https://www.youtube.com/channel/UCBcqpKo9jqETiNd-FwyALoA" target="out" title="Conference on World Affairs Youtube"><i className="fa fa-youtube-play"></i>Youtube</a></li>
            <li><a href="https://www.instagram.com/cwaboulder/" target="out" title="Conference on World Affairs Instagram"><i className="fa fa-instagram"></i>Instagram</a></li>
          </div>
        </div>
				</ul>
		  </div>

        <div id="contact-info">
          <div>
              <h2><a href="http://www.colorado.edu/cwa/">Conference on World Affairs </a></h2>
              <div>
                <p>1344 Grandview Avenue<br />Boulder, CO 80309<br />465 UCB</p>
                <p><a href="mailto:cwa@colorado.edu">cwa@colorado.edu</a><br />Office: (303) 492-2525<br />Fax: (303) 492-3934</p>
              </div>
        </div>

        <div>
          <p><a href="//www.colorado.edu"><img src="http://www.colorado.edu/cwa/profiles/express/themes/expressbase/images/beboulder/be-boulder-white.png" alt="University of Colorado Boulder"/></a></p>
          <p><strong><a href="http://www.colorado.edu">University of Colorado Boulder</a></strong><br />&copy; Regents of the University of Colorado<br />
          <span ><a href="http://www.colorado.edu/about/privacy-statement">Privacy</a> &bull; <a href="http://www.colorado.edu/about/legal-trademarks">Legal &amp; Trademarks</a></span></p>
        </div>

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
