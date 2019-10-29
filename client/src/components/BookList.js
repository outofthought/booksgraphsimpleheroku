import React, { Component } from "react";

import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

class BookList extends Component {
  state = {
    selected: null
  };
  displayBooks = () => {
    let { data } = this.props;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => {
        return (
          <li
            key={book.id}
            onClick={ev => {
              this.setState({
                selected: book.id
              });
            }}
          >
            {book.name}
            <br />
            {book.genre}
          </li>
        );
      });
    }
  };
  render() {
    console.log("PROPS:", this.props);
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}
export default graphql(getBooksQuery)(BookList);
