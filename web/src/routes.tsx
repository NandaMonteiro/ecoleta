import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoints';
import PageSuccess from './pages/PageSuccess';

const Routes = () =>{
    return(
        <BrowserRouter>
            <Route component={Home} path="/" exact/>
            <Route component={CreatePoint} path="/create-point"/>
            <Route component={PageSuccess} path="/success" />
        </BrowserRouter>
    );
};

export default Routes;