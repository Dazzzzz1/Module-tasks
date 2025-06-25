import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Timer from '../src/components/Timer/Timer';

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Timer />
      </div>
    </Provider>
  );
};

export default App;