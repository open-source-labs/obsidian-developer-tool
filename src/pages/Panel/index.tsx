require('file-loader?name=[name].[ext]!./index.html');
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import FakeApp from './FakeApp';


ReactDOM.render(
  <FakeApp />,
  document.getElementById('app')
);
