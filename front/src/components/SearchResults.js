import React, { Component } from 'react'

class SearchResults extends Component {
  render () {
    return (
      <div>
        { this.props.data.length
          ? <ul>
              { this.props.data.map((restaurant, k) => <li key={k}>{`${k} - ${restaurant.name}`}</li>) }
            </ul>
          : "No matches" }
      </div>
    )
  }
}

export default SearchResults
