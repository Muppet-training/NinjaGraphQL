import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  {
    books {
      name
      id
      genre
      author {
        id
      }
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const editBookMutation = gql`
  mutation(
    $id: ID!
    $name: String!
    $genre: String!
    $authorId: ID!
  ) {
    editBook(
      id: $id
      name: $name
      genre: $genre
      authorId: $authorId
    ) {
      name
      id
      genre
      author {
        id
      }
    }
  }
`;

const deleteBookMutation = gql`
  mutation($id: ID!) {
    deleteBook(id: $id)
  }
`;

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation,
  editBookMutation,
  deleteBookMutation,
  getBookQuery
};
