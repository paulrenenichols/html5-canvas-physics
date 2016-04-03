import React                      from 'react'
import { Route, IndexRoute }      from 'react-router'
import App                        from './containers/App'
import Index                      from './containers/pages/Index';
import BouncingBallDemo           from './containers/pages/BouncingBallDemo';

export default (
  <Route          path="/"              component={App}>
    <IndexRoute                         component={Index} />
    <Route        path='bouncing-ball'  component={BouncingBallDemo}/>
  </Route>
)
