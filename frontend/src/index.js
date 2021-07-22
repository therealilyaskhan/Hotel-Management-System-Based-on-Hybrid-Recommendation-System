//The react application's entry point;
//here importing the react and react-dom from the node_modules
import React from 'react';
import ReactDOM from 'react-dom';

//and here we don't say import dash from dash this is because we are not actually importing the css file but this line is only here to instruct the webpack bundler;
import './bootstrap/bootstrap.css';
import './index.css';
//remember in a react application it is only one single ReactDOM.render() call at the end of the day that is going to mount a single react functional component called App on a 'root' container inside the html markup file; and from inside of that function react component called "App" we are going to refer to all other different components as its children;
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
