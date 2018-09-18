import React, { Component } from 'react'

class SearchBar extends Component {
  render () {
    return (
      <div>
        <input onChange={this.props.getInput}/>
      </div>
    )
  }
}

export default SearchBar
