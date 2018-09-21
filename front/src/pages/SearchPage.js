import React, { Component } from 'react'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'
import Pagination from '../components/Pagination'

class SearchPage extends Component {
  constructor (props) {
    super (props)
    this.state = {
        input: "",
        fixedData:[],
        data: [],
        favoriteList: [],
        districts: [],
        prevInput: "",
        slice: 0,
        currentPage: "",
        totalPages: ""
    }
    this.getInput = this.getInput.bind(this)
    this.getPage = this.getPage.bind(this)
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
    this.setState({ currentPage: 1, slice: 0, totalPages: Math.ceil(filteredData.length / 6) })
    return filteredData
  }

  sortByRating(restaurants) {
    return restaurants.sort((a, b) => b.rating - a.rating)
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
    else if (!e.target.value.length) {
      this.setState({ prevInput: "", input: e.target.value, data: this.state.favoriteList, slice: 0, currentPage: 1}, () => this.setState({ totalPages: Math.ceil(this.state.data.length / 6) }))
    }
    else {
      let newLetter = e.target.value.charAt(e.target.value.length - 1)
      const regexA = new RegExp('[aáàâä]','i')
      const regexE = new RegExp('[eéèêë]','i')
      const regexI = new RegExp('[iíìîï]','i')
      const regexO = new RegExp('[oóòôö]', 'i')
      const regexU = new RegExp('[uúùûü]', 'i')
      if (newLetter.match(regexA)) {
        newLetter = '[aáàâä]'
      }
      if (newLetter.match(regexE)) {
        newLetter = '[eéèêë]'
      }
      if (newLetter.match(regexI)) {
        newLetter = '[iíìîï]'
      }
      if (newLetter.match(regexO)) {
        newLetter = '[oóòôö]'
      }
      if (newLetter.match(regexU)) {
        newLetter = '[uúùûü]'
      }
      let modifiedInput = this.state.input
      if (e.target.value.length < this.state.prevInput.length && this.state.input.endsWith("]")) {
        modifiedInput = modifiedInput.slice(0, modifiedInput.length - 7)
      }
      else if (e.target.value.length < this.state.prevInput.length) {
        modifiedInput = modifiedInput.slice(0, modifiedInput.length - 1)
      }
      else {
        modifiedInput = this.state.input.concat(newLetter)
      }
      this.setState({ prevInput: e.target.value, input: modifiedInput }, () => this.setState({ data: this.getFilteredData(this.state.input, this.state.fixedData) }))
    }
  }

  getPage(number) {
    this.setState({ slice: this.state.slice + (number * 6), currentPage: this.state.currentPage + number })
  }

  componentDidMount () {
    fetch("/auth/data")
    .then(res => res.json())
    .then(data => {
      const favoriteList = this.sortByRating(data.filter(restaurant => restaurant.favorite))
      this.setState({ fixedData: this.sortByRating(data), data: favoriteList, favoriteList, districts: this.getDistricts(data), currentPage: 1 }, () => this.setState({ totalPages: Math.ceil(this.state.data.length / 6) }))
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
          slice={this.state.slice}
        />
        <Pagination
          getPage={this.getPage}
          currentPage={this.state.currentPage}
          totalPages={this.state.totalPages}
        />
      </div>
    )
  }
}

export default SearchPage
