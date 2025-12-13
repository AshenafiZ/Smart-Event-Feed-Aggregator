// import { ApolloClient, InMemoryCache } from '@apollo/client/core'; 
// import { HttpLink } from '@apollo/client/link/http'; 

// export const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });
// import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: '/graphql',  
//   }),
//   cache: new InMemoryCache(),
// });

// export default client;

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache({
    resultCaching: false,  
  }),
});

export default client;
