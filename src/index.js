import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
 import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './components/App';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<App/>,
	document.getElementById('root')
);

//registerServiceWorker();
  