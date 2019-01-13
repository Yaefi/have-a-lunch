import React, { Component } from 'react'

class Pagination extends Component {
  render () {
    return(
      <div className="pagination">
        {this.props.currentPage !== 1
          ? <button onClick={() => this.props.getPage(-1)}>Page précédente</button>
          : <button onClick={() => this.props.getPage(-1)} style={{visibility: 'hidden'}}>Page précédente</button>}
        <div>{this.props.currentPage} / {this.props.totalPages}</div>
        {(this.props.currentPage !== this.props.totalPages)
          ? <button onClick={() => this.props.getPage(1)}>Page suivante</button>
          : <button onClick={() => this.props.getPage(1)} style={{visibility: 'hidden'}}>Page suivante</button>}
      </div>
    )
  }
}

export default Pagination
