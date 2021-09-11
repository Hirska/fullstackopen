const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");

const Book = require("./models/book");
const Author = require("./models/author");

require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log("error connecting to mongoDB:", error.message);
  });

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments({}),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author });
      const query = {};

      if (author) {
        query.author = author._id;
      }
      if (args.genre) {
        query.genres = args.genre;
      }

      return Book.find(query).populate("author");
    },
    authorCount: () => Author.countDocuments({}),
    allAuthors: () => Author.find({}),
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        try {
          author = new Author({ name: args.author });
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      const book = new Book({ ...args, author: author._id });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message);
      }

      return book;
    },
    editAuthor: async (root, args) => {
      //Same object as in authors is referenced
      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      //Change referenced object
      author.born = args.setBornTo;
      try {
        author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
  },
  Author: {
    bookCount: (root) => {
      return Book.countDocuments({ author: root._id });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

// 8.1 toteutettu
