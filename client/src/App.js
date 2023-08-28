import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink  } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';


import Header from './components/Header';
import Home from './pages/Home';
import SingleArticle from './pages/singleArticle';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileArticle from './pages/ProfileArticle';
import UpdateArticle from './pages/UpdateArticle';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


// This function is the main function that renders the entire application. 

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
              <Route path="/profile/:articleId" element={<ProfileArticle/>}/>
              <Route path="/update/:articleId" element={<UpdateArticle/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
            </Routes>
          </div>
          <Footer/>
        </div>
      </ApolloProvider>
    </BrowserRouter>

  );
}

export default App;
