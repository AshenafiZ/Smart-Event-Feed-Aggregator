// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
// src/main.jsx
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';
// import { ApolloProvider } from '@apollo/client';
// import { client } from './apollo/client.js';  // ← Make sure this path is correct

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//   </StrictMode>
// );

import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'  
import App from './App.jsx'
import client from './apollo/client.js'  
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>  {/* ✅ Wrap App */}
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
