import React, { Component } from 'react'

class RestaurantCard extends Component {
  render() {
    return (
      <div className="restaurantCard">
        <img src={this.props.restaurant.image_url} alt="image not found" />
        <div className="cardGradient">
          <div className="cardInformations">
            <p>{this.props.restaurant.favorite}</p>
            <p>{this.props.restaurant.name}</p>
            <p>{this.props.restaurant.address}</p>
            <p>{this.props.restaurant.rating}</p>
            <p>{this.props.restaurant.secondary_categorisation}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default RestaurantCard
