import React, { Component } from 'react'

class SearchBar extends Component {
  render () {
    return (
      <div className="searchBar">
        <form>
          <input onChange={this.props.getInput}/>
          <select onChange={(e) => this.props.getInput(e, "district")}>
            <option></option>
             {this.props.districtsList.map((district, k) => <option key={k}>{district}</option>)}
          </select>
        </form>
      </div>
    )
  }
}

export default SearchBar
