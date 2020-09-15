import React from "react";
import "./App.scss";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import Nav from "./components/Nav/Nav";
import AuthGuard from "./components/Helper/AuthGuard";

import {
  withRouter,
  Switch,
  BrowserRouter,
  Route,
  Redirect,
} from "react-router-dom";
import BackendHome from "./pages/Home/Backend/BackendHome/BackendHome";
import BeneficiariesTable from "./pages/Home/Backend/BackendHome/DataTables/Beneficiaries";
import BeneficiaryLists from "./pages/Home/Backend/Supervisor/BeneficiaryLists";
import Footer from "./components/Footer/Footer";

import Overview from "./pages/Home/Backend/Supervisor/Overview";

import { SchemeProvider } from "./components/ContextAPI/SchemesAPI";

const Main = withRouter(({ location }) => {
  return (
    <>
      {location.pathname !== "/adminlogin" &&
        location.pathname !== "/overview" && (
          <>
            <Nav />
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />

            <SchemeProvider>
              <AuthGuard path="/dashboard" exact component={BackendHome} />
              <AuthGuard
                path="/beneficiaries/:id"
                exact
                component={BeneficiariesTable}
              />
            </SchemeProvider>
            <AuthGuard
              path="/beneficiary-lists"
              exact
              component={BeneficiaryLists}
            />
            <Footer />
          </>
        )}
      <Switch>
        <Route path="/adminlogin" exact component={AdminLogin} />
        <AuthGuard path="/overview" exact component={Overview} />
      </Switch>
    </>
  );
});
function App() {
  return (
    <div>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
