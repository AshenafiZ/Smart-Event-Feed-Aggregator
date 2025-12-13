// import HomePage from './pages/HomePage';

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 shadow-xl">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <h1 className="text-4xl md:text-6xl font-extrabold">Event Aggregator</h1>
//           <p className="mt-3 text-lg opacity-90">Powered by Eventbrite & Ticketmaster</p>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-6 py-12">
//         <HomePage />
//       </main>

//       <footer className="bg-gray-900 text-gray-400 py-8 text-center mt-20">
//         <p>Events updated every 6 hours • Built with ❤️ using React + Vite</p>
//       </footer>
//     </div>
//   );
// }

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
