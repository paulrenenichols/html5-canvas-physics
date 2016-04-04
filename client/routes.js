import React                      from 'react'
import { Route, IndexRoute }      from 'react-router'
import App                        from './containers/App'
import Index                      from './containers/pages/Index';
import BouncingBallDemo           from './containers/pages/BouncingBallDemo';
import ResponsiveCanvasDemo       from './containers/pages/ResponsiveCanvasDemo';
import SizeAwareContainerDemo     from './containers/pages/SizeAwareContainerDemo';

export default (
  <Route          path="/"                  component={App}>
    <IndexRoute                             component={Index} />
    <Route        path='bouncing-ball'      component={BouncingBallDemo}/>
    <Route        path='responsive-canvas'  component={ResponsiveCanvasDemo}/>
    <Route        path='size-aware'         component={SizeAwareContainerDemo}/>
  </Route>
)
