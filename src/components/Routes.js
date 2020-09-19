import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import ProfilePage from "./Profile";

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/" component={Home} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
