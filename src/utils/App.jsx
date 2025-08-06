import React from 'react';
import NewsFeed from '../components/NewsFeed';
import LoginForm from '../components/Login';

function App() {
  return (
    <div className="App">
      <h1>Quark-y</h1>
      <LoginForm />
      <NewsFeed />
    </div>
  );
}

export default App;
