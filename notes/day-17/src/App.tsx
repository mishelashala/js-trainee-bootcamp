import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DashboardView } from "./views/DashboardView";

// container vs component
// smart component vs dumb component
// controller vs view

// dumb/view = display things on the screen
// container/smart = handles data & logic

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={DashboardView} />
      </Switch>
    </Router>
  );
};

export default App;
