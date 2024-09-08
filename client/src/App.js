import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Project from './pages/Project';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Header />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/projects/:projectId' element={<Project />} />
            <Route exact path='/' element={<Project />} />
            <Route exact path='*' element={<NotFound />} />
          </Routes>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
