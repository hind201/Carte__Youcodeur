import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Home from   '.core/Home ';
import Login from  '.user/Login';
import Signup from '.user/Signup ';


const Routes =()=> {
    return (
      <BrowserRouter>
      <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/Login' exact component={Login}/>
          <Route path='/Signup' exact component={Signup}/>
         

      </Switch>
      </BrowserRouter>
    )
}

export default Routes
