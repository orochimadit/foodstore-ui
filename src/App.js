import './styles/tailwind.css';
import {HashRouter as Router , Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
//import provider
import {Provider} from 'react-redux';
import 'upkit/dist/style.min.css';

//import store 
import store from './app/store';
import { listen } from './app/listener';
import Register from './pages/Register';
import React from 'react';
function App() {
  React.useEffect(() =>{
    listen();
  },[])
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/register" component ={Register}/>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
