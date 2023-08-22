import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider  } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import SingleArticle from './pages/singleArticle';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Login from './pages/Login';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/articles/:articleId" element={<SingleArticle/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
          </div>
          <Footer/>
        </div>
      </ApolloProvider>
    </BrowserRouter>

  );
}

export default App;
