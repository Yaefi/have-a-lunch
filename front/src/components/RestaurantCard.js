import React, { Component } from 'react'

class RestaurantCard extends Component {

getStars () {
  let array = []
  for (let i = 1; i <= this.props.restaurant.rating; i++) {
    array.push("https://upload.wikimedia.org/wikipedia/commons/2/29/Gold_Star.svg")
  }
  array.map(star => <img src={star} alt="star" className="stars" />)
  console.log(array.join(","))
}

  render() {
    return (
      <div className="restaurantCard">
        <img src={this.props.restaurant.image_url} alt="image not found" />
        <div className="cardGradient">
          <div className="cardInformations">
            {this.props.restaurant.favorite
              ? <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Heart_coraz%C3%B3n.svg" alt="heart" className="heart" />
              : <img src="https://openclipart.org/download/234835/heart-outline.svg" className="heart" />}
            <p>{this.props.restaurant.name}</p>
            <p>{this.props.restaurant.address}</p>
            <div className="rating">{this.props.restaurant.rating}</div>
            <p>{this.props.restaurant.secondary_categorisation}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default RestaurantCard
