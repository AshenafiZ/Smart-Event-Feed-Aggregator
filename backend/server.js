require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const startCronJobs = require('./utils/cron');
const { fetchAndSaveEvents } = require('./services/eventFetcher');
 
const app = express();
 
// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Connect DB
connectDB();

// REST Routes
app.use('/api', eventRoutes);

// GraphQL
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  
  console.log('🚀 GraphQL ready at http://localhost:5000/graphql');
}

startApolloServer();

// Initial fetch
fetchAndSaveEvents();

// Start cron jobs
startCronJobs();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
  console.log(`📊 REST: http://localhost:${PORT}/api/events`);
  console.log(`📈 Stats: http://localhost:${PORT}/api/stats`);
});
