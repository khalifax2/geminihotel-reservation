import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";

import Homepage from "./pages/homepage/homepage";
import Reservation from "./pages/reservation/reservation";
import { store, persistor } from "./redux/store";
import { loadUser } from "./redux/actions/auth";

import "./App.css";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <PersistGate persistor={persistor}>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/reservation" component={Reservation} />
          </Switch>
        </PersistGate>
      </Router>
    </Provider>
  );
}

export default App;
