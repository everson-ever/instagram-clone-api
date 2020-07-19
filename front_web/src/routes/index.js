import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';

const routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact={true} component={Login} />
            <Route path='/home' exact={true} component={Home} />
        </Switch>
    </BrowserRouter>
);

export default routes;
