import React, { Component } from 'react'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'

class SearchPage extends Component {
  constructor (props) {
    super (props)
    this.state = {
        input: "",
        fixedData:[],
        data: []
    }
    this.getInput = this.getInput.bind(this)
  }

  getFilteredData(input, data) {
    const regex = new RegExp(input, 'i')
     const filteredData = data
      .filter(restaurant => restaurant.name.match(regex)
        || restaurant.address.match(regex)
        || restaurant.primary_categorisation.match(regex)
        || (restaurant.secondary_categorisation && restaurant.secondary_categorisation.match(regex)))
    return filteredData
  }

  getInput(e) {
    this.setState({input: e.target.value, data: this.getFilteredData(e.target.value, this.state.data)})
  }

  componentDidMount () {
    fetch("/auth/data")
    .then(res => res.json())
    .then(data => this.setState({ fixedData: data, data }))
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.input.length < prevState.input.length) {
      this.setState({ data: this.getFilteredData(this.state.input, this.state.fixedData) })
    }
  }

  render () {
    return (
      <div>
        <SearchBar
          getInput={this.getInput}
        />
        <SearchResults
          data={this.state.data}
        />
      </div>
    )
  }
}

export default SearchPage
