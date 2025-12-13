const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Event {
    _id: ID!
    eventId: String!
    title: String!
    description: String
    date: String!
    location: String
    source: String!
    url: String!
    imageUrl: String
    category: String
    classifications: [Classification]
    venueName: String
    city: String
    status: String
    ticketLimit: String
    pleaseNote: String
    createdAt: String
    updatedAt: String
  }

  type Classification {
    segment: String
    genre: String
    subGenre: String
  }

  type Stats {
    total: Int!
    bySource: [SourceCount]
  }

  type SourceCount {
    _id: String
    count: Int
  }

  type Query {
    events(search: String, source: String, category: String, limit: Int): [Event]
    event(eventId: String!): Event
    stats: Stats
  }

  type Mutation {
    refreshEvents: Boolean
  }
`;

module.exports = typeDefs;
