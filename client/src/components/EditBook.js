import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {
  getAuthorsQuery,
  editBookMutation,
  getBooksQuery
} from '../queries/queries';

class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      name: '',
      genre: '',
      authorId: ''
    };
    this.submitForm = this.submitForm.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('nextProps', nextProps);
    // console.log('prevState', prevState);
    if (nextProps.book !== prevState.book) {
      console.log('nextProps', nextProps);
      return { book: nextProps.book };
    } else {
      console.log('prevState', prevState);
    }
    return null;
  }

  displayAuthors() {
    let data = this.props.getAuthorsQuery;
    const { book } = this.state;
    if (data.loading) {
      return <option disabled>Loading Authors..</option>;
    } else {
      return data.authors.map(author => {
        if (book.author.id === author.id) {
          return (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          );
        } else {
          return (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          );
        }
      });
    }
  }

  displayEditForm() {
    const { book } = this.state;

    console.log('Current State ', this.state);
    if (book) {
      return (
        <form id="edit-book" onSubmit={this.submitForm} key={book.id}>
          <div className="form-title">
            <p>Edit</p>
          </div>
          <div className="field">
            <label>Book Name:</label>
            <input
              type="text"
              defaultValue={book.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Genre:</label>
            <input
              type="text"
              defaultValue={book.genre}
              onChange={e => this.setState({ genre: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Author:</label>
            <select
              onChange={e =>
                this.setState({
                  authorId: e.target.value
                })
              }
              // key={this.state.book.author.id}
              defaultValue={this.state.book.author.id}
            >
              <option>Select Author</option>
              {this.displayAuthors()}
            </select>
          </div>

          <button id="update_button">+ update</button>
        </form>
      );
    } else {
      return <p>Book Edit Form Goes Headers..</p>;
    }
  }

  submitForm(e) {
    e.preventDefault();
    let name =
      this.state.name === '' ? this.state.book.name : this.state.name;
    let genre =
      this.state.genre === ''
        ? this.state.book.genre
        : this.state.genre;
    let authorId =
      this.state.authorId === ''
        ? this.state.book.author.id
        : this.state.authorId;
    console.log('submitted ', authorId);
    this.props.editBookMutation({
      variables: {
        id: this.state.book.id,
        name: name,
        genre: genre,
        authorId: authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  render() {
    return <div>{this.displayEditForm()}</div>;
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(editBookMutation, { name: 'editBookMutation' })
)(EditBook);
