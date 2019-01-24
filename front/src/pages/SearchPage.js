import React, { Component } from 'react'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'
import Pagination from '../components/Pagination'

class SearchPage extends Component {
  constructor (props) {
    super (props)
    this.state = {
        rawData:[],
        displayedData: [],
        favoriteList: [],
        splittedKeyword: [],
        district: "",
        districtsList: [],
        slice: 0,
        currentPage: 1,
        totalPages: ""
    }
    this.getDisplayedData = this.getDisplayedData.bind(this)
    this.getPage = this.getPage.bind(this)
    this.getInput = this.getInput.bind(this)
  }

  sortByRating(restaurants) {
    return restaurants.sort((a, b) => b.rating - a.rating)
  }

  getDistricts(restaurantsList) {
    const districtsList = []
    for (let restaurant of restaurantsList) {
      if (districtsList.length < 20
            && restaurant.district !== "8è"
            && restaurant.district !== "11è"
            && restaurant.district
            && restaurant.district.length < 4
            && !districtsList.includes(restaurant.district)) {
        districtsList.push(restaurant.district)
      }
    }
    const firstPart = districtsList.sort().splice(10, 1)
    const lastPart = districtsList.splice(10, 1)
    const secondPart = districtsList.splice(10, 8)
    return firstPart.concat(secondPart, districtsList, lastPart)
  }

  getDisplayedData(keyword, district) {
    let displayedData
    if (!keyword.length && !district.length) {
      displayedData = this.state.favoriteList
      this.setState({ displayedData })
      this.getPage(displayedData)
    }
    else {
      displayedData = this.state.rawData
      if (keyword.length) {
        const regex = new RegExp(keyword, 'i')
        displayedData = displayedData.filter(restaurant => restaurant.name.match(regex)
          || restaurant.address.match(regex)
          || restaurant.primary_categorisation.match(regex)
          || (restaurant.secondary_categorisation && restaurant.secondary_categorisation.match(regex))
        )
      }
      if (district.length) {
        displayedData = displayedData.filter(restaurant => restaurant.district === district)
      }
    }
    this.setState({ displayedData })
    this.getPage(displayedData)
  }

  getPage(value) {
    if (Number.isInteger(value)) {
      this.setState({ slice: this.state.slice + (value * 6), currentPage: this.state.currentPage + value })
    }
    else {
      this.setState({ slice: 0, currentPage: 1, totalPages: Math.ceil(value.length / 6) })
    }
  }

  getInput(e, district) {
    if (district) {
      this.setState({ district: e.target.value })
      this.getDisplayedData(this.state.splittedKeyword.join(""), e.target.value)
    }
    else {
      let splittedKeyword = this.state.splittedKeyword
      const differenceIndex = this.getDifferenceIndex(e.target.value, splittedKeyword)
      if (e.target.value.length < splittedKeyword.length) {
        splittedKeyword.splice(differenceIndex, 1)
        this.setState({ splittedKeyword })
        this.getDisplayedData(splittedKeyword.join(""), this.state.district)
      }
      else {
        splittedKeyword.splice(differenceIndex, 0, this.checkRegex(e.target.value[differenceIndex]))
        this.setState({ splittedKeyword })
        this.getDisplayedData(splittedKeyword.join(""), this.state.district)
      }
    }
  }

  getDifferenceIndex(newKeyword, splittedKeyword) {
    const splittedNewKeyword = []
    for (let letter of newKeyword) {
      splittedNewKeyword.push(this.checkRegex(letter))
    }
    for (let i = 0; i < splittedKeyword.length || i < splittedNewKeyword.length; i++) {
      if ( splittedKeyword[i] !== splittedNewKeyword[i]) {
        return i
      }
    }
  }

  checkRegex(letter) {
    const regexA = new RegExp('[aáàâä]', 'i')
    const regexE = new RegExp('[eéèêë]', 'i')
    const regexI = new RegExp('[iíìîï]', 'i')
    const regexO = new RegExp('[oóòôö]', 'i')
    const regexU = new RegExp('[uúùûü]', 'i')
    if (letter.match(regexA)) {
      letter = "[aáàâä]"
    }
    if (letter.match(regexE)) {
      letter = "[eéèêë]"
    }
    if (letter.match(regexI)) {
      letter = "[iíìîï]"
    }
    if (letter.match(regexO)) {
      letter = "[oóòôö]"
    }
    if (letter.match(regexU)) {
      letter = "[uúùûü]"
    }
    return letter
  }

  componentDidMount () {
    fetch("/auth/data")
    .then(res => res.json())
    .then(data => {
      const favoriteList = this.sortByRating(data.filter(restaurant => restaurant.favorite))
      this.setState({ rawData: this.sortByRating(data), favoriteList, districtsList: this.getDistricts(data) })
      this.getDisplayedData(this.state.splittedKeyword.join(""), this.state.district)
    })
  }

  render () {
    return (
      <div>
        <SearchBar
          getInput={this.getInput}
          districtsList={this.state.districtsList}
        />
        <SearchResults
          displayedData={this.state.displayedData}
          slice={this.state.slice}
        />
        {this.state.totalPages !== 0
          ? <Pagination
              getPage={this.getPage}
              currentPage={this.state.currentPage}
              totalPages={this.state.totalPages}
            />
          : ""}
      </div>
    )
  }
}

export default SearchPage
