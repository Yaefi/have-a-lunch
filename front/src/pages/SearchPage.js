import React, { Component } from 'react'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'

class SearchPage extends Component {
  constructor (props) {
    super (props)
    this.state = {
        input: "",
        fixedData:[],
        data: [],
        favoriteList: [],
        districts: []
    }
    this.getInput = this.getInput.bind(this)
  }

  getFilteredData(input, data, district) {
    const regex = new RegExp(input, 'i')
    let filteredData = data
      .filter(restaurant => restaurant.name.match(regex)
        || restaurant.address.match(regex)
        || restaurant.primary_categorisation.match(regex)
        || (restaurant.secondary_categorisation && restaurant.secondary_categorisation.match(regex)))
    if (district && district.length <= 3) {
      filteredData = filteredData.filter(restaurant => restaurant.district === district)
    }
    return filteredData
  }

  sortByRating(restaurants) {
    return restaurants.sort((a, b) => a.rating - b.rating)
  }

  getDistricts(restaurantsList) {
    const districts = []
    for (let restaurant of restaurantsList) {
      if (districts.length < 20
            && restaurant.district !== "8è"
            && restaurant.district
            && restaurant.district.length < 4
            && !districts.includes(restaurant.district)) {
        districts.push(restaurant.district)
      }
    }
    const firstPart = districts.sort().splice(10, 1)
    const lastPart = districts.splice(0, 11)
    return firstPart.concat(districts).concat(lastPart)
  }

  getInput(e, district) {
    if (district) {
      this.setState({ data: this.getFilteredData(this.state.input, this.state.fixedData, e.target.value) })
    }
    else if (e.target.value.length === 0) {
      this.setState({ input: e.target.value, data: this.state.favoriteList })
    }
    else {
      this.setState({ input: e.target.value, data: this.getFilteredData(e.target.value, this.state.fixedData) })
    }
  }

  componentDidMount () {
    fetch("/auth/data")
    .then(res => res.json())
    .then(data => {
      const favoriteList = this.sortByRating(data.filter(restaurant => restaurant.favorite))
      this.setState({ fixedData: this.sortByRating(data), data: favoriteList, favoriteList, districts: this.getDistricts(data) })
    })
  }

  render () {
    return (
      <div>
        <SearchBar
          getInput={this.getInput}
          districts={this.state.districts}
        />
        <SearchResults
          data={this.state.data}
        />
      </div>
    )
  }
}

export default SearchPage
