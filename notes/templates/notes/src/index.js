import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Notes from './components/Notes';
import { Router, Route, BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

const Root = () => {
  return (
    <BrowserRouter>
    <div className="container">
        <Route path="/" component={Notes}/>
    </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
