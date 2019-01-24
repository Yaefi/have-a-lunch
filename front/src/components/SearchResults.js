import React, { Component } from 'react'
import RestaurantCard from './RestaurantCard'

class SearchResults extends Component {
  render () {
    return (
      <div>
        { this.props.displayedData.length
          ? <div className="containerRestaurantCards">
              {this.props.displayedData.slice(this.props.slice, this.props.slice + 6).map((restaurant, k) => <RestaurantCard key={k} restaurant={restaurant} />)}
          </div>
          : "No matches" }
      </div>
    )
  }
}

export default SearchResults
