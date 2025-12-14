import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query Events($search: String, $category: String, $source: String, $limit: Int) {
    events(search: $search, category: $category, source: $source, limit: $limit) {
      _id
      eventId
      title
      description
      date
      location
      source
      url
      imageUrl
      category
      venueName
      city
      status
      pleaseNote
      classifications {
        genre
        segment
        subGenre
      }
    }
  }
`;

export const GET_STATS = gql`
  query Stats {
    stats {
      total
      bySource {
        _id
        count
      }
    }
  }
`;
