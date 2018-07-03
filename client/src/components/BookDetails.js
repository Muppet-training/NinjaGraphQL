import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {
  getBookQuery,
  getBooksQuery,
  deleteBookMutation
} from '../queries/queries';

// components
import EditBook from './EditBook';

class BookDetails extends Component {
  onDeleteClick(id) {
    console.log('this is:', this);
    console.log('ID:', id);
    this.props.deleteBookMutation({
      variables: {
        id: id
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  displayBookDetails() {
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <small>{book.id}</small>
          <p>{book.genre}</p>
          <p>
            {book.author.name} - {book.author.id}
          </p>
          <p>All Books by this author</p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
          <button onClick={this.onDeleteClick.bind(this, book.id)}>
            Delete Book
          </button>
          <EditBook book={book} />
        </div>
      );
    } else {
      return (
        <div id="book-details">
          <p>Book Details Go Here...</p>
        </div>
      );
    }
  }

  render() {
    return <div id="book-details">{this.displayBookDetails()}</div>;
  }
}

export default compose(
  graphql(deleteBookMutation, { name: 'deleteBookMutation' }),
  graphql(getBookQuery, {
    options: props => {
      return {
        variables: {
          id: props.bookId
        }
      };
    }
  })
)(BookDetails);
