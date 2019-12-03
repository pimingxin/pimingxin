import React from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import { HashRouter, Route , Switch } from 'react-router-dom'

import LandingPage from './LandingPage';
import FoodCart from './FoodCart';
import RestaurantManage from './RestaurantManage';
import Login from './Login';
import HomePage from './HomePage'


// 扫码进入 /langding/restaurant/35/desk/20 
// 点餐页面 
function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          {/* exact 完全匹配 */}
          <Route path="/" exact component={HomePage} />
          <Route path="/landing/r/:rid/d/:did" component={LandingPage} />
          <Route path="/r/:rid/d/:did" component={FoodCart} />
          
          <Route path="/manage" component={RestaurantManage} />
          <Route path="/login" component={Login} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
