import { browserHistory } from 'react-router';
import React from 'react'

require('./support.less')

class Support extends React.Component {
  render() {
    return (
      <section id="support">
        <h2>Support</h2>
        <article>
          <h3>Conference on World Affairs Administration</h3>
          <p>For questions about the conference, please contact The Conference on World Affairs at <a href="mailto:cwa@colorado.edu">cwa@colorado.edu</a> or by phone at <a href="tel:303-492-2525">(303) 492-2525</a>.</p>
        </article>
        <article>
          <h3>Website Technical Issues</h3>
          <p>For any issues with the Volunteer Management System Application, please contact the vms2 at <a href="mailto:cwajazzvms2@gmail.com">cwajazzvms2@gmail.com</a>.</p>
          <p>Please include a destription of your issue and any screenshots/images that display your problem.</p>
        </article>
        <button onClick={this._handleBackClick.bind(this)}>Back to Previous Page</button>
      </section>
    )
  }

  _handleBackClick(event) {
    event.preventDefault()
    browserHistory.goBack()
  }
}

export default Support;
