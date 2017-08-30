import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './pages/App/App';
import About from './pages/About/About';
import Skill from './pages/Skill/Skill';
import Career from './pages/Career/Career';
import './main.css';

ReactDom.render(
  <BrowserRouter>
    <App>
      <Route exact path="/" component={About} />
      <Route path="skill" component={Skill} />
      <Route path="career" component={Career} />
    </App>
  </BrowserRouter>,
  document.getElementById('app'),
);
