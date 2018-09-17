import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar.js'
import SearchResults from './components/SearchResults.js'

class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <SearchResults />
      </div>
    );
  }
}

export default App;
