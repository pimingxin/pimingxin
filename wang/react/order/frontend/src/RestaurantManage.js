import React from 'react'
import { Link , Route , Switch } from 'react-router-dom'

import OrderManage from './OrderManage'
import FoodManage from './FoodManage'
import DeskManage from './DeskManage'


export default function(props){
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/manage/order">订单管理</Link>
          </li>
          <li>
            <Link to="/manage/food">菜品管理</Link>
          </li>
          <li>
            <Link to="/manage/desk">桌面管理</Link>
          </li>
        </ul>
      </nav>
      <main>
      <Switch>
        <Route path="/manage/order" component={OrderManage} />
        <Route path="/manage/food" component={FoodManage} />
        <Route path="/manage/desk" component={DeskManage} />
      </Switch>
      </main>
    </div>
  )
}