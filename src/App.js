import React,{useEffect} from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import {Provider } from "react-redux";
import store from "./store";
import {getUserAuth} from "./actions";
import {connect} from "react-redux";
function App(props) {
  useEffect(()=>{
     props.getUserAuth();
  },[]);
  return (
    <Provider store={store}>
    <div className="App">
      <Router>
        <Switch>

          <Route exact path="/"> <Login /></Route>
          <Route path="/home">
                <Header />
                <Home />
          </Route>
        </Switch>
      </Router>
    </div>
    </Provider>
  );
}
const mapStateToProps =(state)=>{return {};}
const mapDispatchToProps =(dispatch) => ({
  getUserAuth:()=>dispatch(getUserAuth()),
});
export default connect(mapStateToProps,mapDispatchToProps)(App);
