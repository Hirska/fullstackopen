const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

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
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Token {
    value: String!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
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
    me: (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Not authenticated");
      }
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Not authenticated");
      }

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
      if (!context.currentUser) {
        throw new AuthenticationError("Not authenticated");
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

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
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("Invalid credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
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
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
