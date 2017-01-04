import React from 'react'
import Header from '../shared/header'
import Footer from '../shared/footer'
import {Link} from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
	  <Header/>
		{this.props.children}
		<Footer/>
      </div>
    )
  }
})
