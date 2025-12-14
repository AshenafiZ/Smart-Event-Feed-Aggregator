import { ApolloProvider } from '@apollo/client';
import HomePage from './pages/HomePage';
import client from './apollo/client';
import './index.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <HomePage />
      </div>
    </ApolloProvider>
  );
}

export default App;
