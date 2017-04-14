import React from 'react'
import Header from '../shared/header'
import Footer from '../shared/footer'
import {Link} from 'react-router'

require('./app.less')

window.onbeforeunload = function() {
return "Are you sure?"
}

export default React.createClass({
  render() {
    return (
        <section id='app-container'>
          <Header/>
          <section className='the-goods content-container'>
            {this.props.children}
          </section>
          <Footer/>
        </section>
    )
  }
})
