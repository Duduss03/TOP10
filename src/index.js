import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';

import ranking from './resources/ranking.json';

ReactDOM.render(
  <React.StrictMode>
    <App platforms={ranking}/>
  </React.StrictMode>,
  document.getElementById('root')
);
