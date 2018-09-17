import React, { Component } from 'react'

class SearchResults extends Component {
  state = {
    data: []
  }

  componentDidMount () {
    fetch("/auth/data")
    .then(res => res.json())
    .then(data => this.setState({data}))
  }

  render () {
    return (
      <ul>
        {this.state.data.map((restaurant, k) => <li key={k}>{restaurant.name}</li>)}
      </ul>
    )
  }
}

export default SearchResults
