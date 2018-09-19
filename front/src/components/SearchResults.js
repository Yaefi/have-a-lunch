import React, { Component } from 'react'

class SearchResults extends Component {
  render () {
    return (
      <ul>
        {
          this.props.data.map((restaurant, k) => <li key={k}>{`${k} - ${restaurant.name}`}</li>)
        }
      </ul>
    )
  }
}

export default SearchResults
