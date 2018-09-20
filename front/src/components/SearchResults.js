import React, { Component } from 'react'
import RestaurantCard from './RestaurantCard'

class SearchResults extends Component {
  render () {
    return (
      <div>
        { this.props.data.length
          ? <div className="containerRestaurantCards">
              {this.props.data.slice(0, 6).map((restaurant, k) => <RestaurantCard key={k} restaurant={restaurant} />)}
          </div>
          : "No matches" }
      </div>
    )
  }
}

export default SearchResults
