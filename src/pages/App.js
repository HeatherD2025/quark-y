import React from "react";
import { Provider } from 'react-redux';
import { store } from "../redux/store";
import NewsFeed from "../components/NewsFeed";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Science Feed</h1>
        <NewsFeed />
      </div>
    </Provider>
  );
}

export default App;
