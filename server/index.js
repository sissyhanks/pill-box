const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config({ path: '.env'});

const app = express();



const PORT = process.env.PORT || 3001;
// const server =  new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware,
// });

// server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://aqueous-ocean-83176.herokuapp.com/",
      
    ],
    credentials: true,
  })
);

// if we're in production, serve client/build as static assets
// If in production, then use static frontend build files.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db();

app.use(routes);

app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));

