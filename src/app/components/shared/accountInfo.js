import { browserHistory } from 'react-router';
import React from 'react'

require('./support.less')

class AccountInfo extends React.Component {
  render() {
    return (
      <section id="account-info">
        <h2>AccountInfo</h2>

        <button onClick={this._handleBackClick.bind(this)}>Back</button>
      </section>
    )
  }

  _handleBackClick(event) {
    event.preventDefault()
    browserHistory.goBack()
  }
}

export default AccountInfo;
