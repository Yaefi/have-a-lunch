import React, { Component } from 'react'

class RestaurantCard extends Component {

getStars(rating) {
  let array = []
  for (let i = 1; i <= rating; i++) {
    array.push("https://upload.wikimedia.org/wikipedia/commons/2/29/Gold_Star.svg")
  }
  return array
}

  render() {
    return (
      <div className="restaurantCard">
        <img src={this.props.restaurant.image_url} alt="image not found" />
        <div className="cardGradient">
          <div className="favorite">
            {this.props.restaurant.favorite
              ? <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Heart_coraz%C3%B3n.svg" alt="heart" className="heart" />
              : <img src="https://openclipart.org/download/234835/heart-outline.svg" className="heart" />}
          </div>
          <div className="cardInformations">
            <p>{this.props.restaurant.name}</p>
            <p>{this.props.restaurant.secondary_categorisation}</p>
            <p className="rating">
              {this.getStars(this.props.restaurant.rating).map((star, k) => <img key={k} src={star} alt="star" className="stars" />)}
            </p>
            <p>{this.props.restaurant.address}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default RestaurantCard
