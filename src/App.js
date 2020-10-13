import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "./components/Context";

import AddContact from "./components/contact/AddContact";
import Header from "./components/layout/Header";
import Contacts from "./components/contact/Contacts";
import "./App.css";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import EditContact from "./components/contact/EditComponent";

function App() {
  return (
    <Provider>
      <div>
        <Router>
          <Header branding="Contact Manager" />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <div className="row">
                  <div className="col-md-6">
                    <AddContact />
                  </div>
                  <div className="col-md-6">
                    <Contacts />
                  </div>
                </div>
              </Route>
              <Route exact path="/about" component={About} />
              <Route exact path="/contact/edit/:id" component={EditContact} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
