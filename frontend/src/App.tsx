import React from 'react';
import Layout from './Layout/Layout';
import { Provider } from 'react-redux';
import store from './Store/Store';

const App = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;