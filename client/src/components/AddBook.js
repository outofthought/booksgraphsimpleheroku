import React, { Component } from "react";

import { graphql, compose } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

class AddBook extends Component {
  state = {
    name: "",
    genre: "",
    authorId: ""
  };
  dispalayAuthor() {
    //var data=this.props.data
    var data = this.props.getAuthorsQuery;
    console.log(this.props);
    if (data.loading) {
      return <option disabled> Loading authors...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }
  onSubmitForm = ev => {
    ev.preventDefault();
    //console.log(this.state)
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };
  render() {
    console.log(this.props);
    return (
      <form className="add-book" onSubmit={this.onSubmitForm}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            onChange={ev => this.setState({ name: ev.target.value })}
          />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={ev => this.setState({ genre: ev.target.value })}
          />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={ev => this.setState({ authorId: ev.target.value })}>
            <option>Select Author</option>
            {this.dispalayAuthor()}
          </select>
        </div>

        <button>ADD</button>
      </form>
    );
  }
}
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
