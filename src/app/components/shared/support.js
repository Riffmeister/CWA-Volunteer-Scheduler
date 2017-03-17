import React from 'react'

require('./support.less')

class Support extends React.Component {
  render() {
    return (
      <section id="support">
        <h2>Support</h2>
        <article>
          <h3>Conference on World Affairs Problems/Issues</h3>
          <p>For general questions about the conference or events, please contact The Conference on World Affairs directly at <a href="mailto:cwa@colorado.edu">cwa@colorado.edy</a> or by phone at (303) 492-2525</p>
        </article>
        <article>
          <h3>Website Problems/Issues</h3>
          <p>For any issues with the Volunter Manament System Application, please contanct the VMS Team at <a href="mailto:cwajazzvms@gmail.com">cwajazzvms@gmail.com</a>.</p>
          <p>Please include a destription of your issue and any screenshots/images that display your problem.</p>
        </article>
      </section>
    )
  }
}

export default Support;
