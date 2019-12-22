import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

import './index.scss';

const store = createStore(moviesApp);

class ReelCreationsApplication extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }  
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(ReelCreationsApplication), container);
