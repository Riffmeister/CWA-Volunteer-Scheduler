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
  					<li><a href="http://www.facebook.com/cwaboulder" target="out" title="Conference on World Affairs Facebook"><i className="fa fa-facebook-square"></i>Facebook</a></li>
  					<li><a href="https://twitter.com/cwaboulder" target="out" title="Conference on World Affairs Twitter"><i className="fa fa-twitter-square"></i>Twitter</a></li>
  					<li><a href="https://www.youtube.com/channel/UCBcqpKo9jqETiNd-FwyALoA" target="out" title="Conference on World Affairs Youtube"><i className="fa fa-youtube-play"></i>Youtube</a></li>
            <li><a href="https://www.instagram.com/cwaboulder/" target="out" title="Conference on World Affairs Instagram"><i className="fa fa-instagram"></i>Instagram</a></li>
            <li><a href="http://www.colorado.edu/cwa/" target="out" title="Conference on World Affairs Home"><i className="fa fa-home"></i>CWA Home</a></li>
          </div>
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
