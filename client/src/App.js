import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider  } from '@apollo/client';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';



const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header/>
        <div className="container">
          {/* <Home/> */}
        </div>
        {/* <Footer/> */}
      </div>
    </ApolloProvider>

  );
}

export default App;
