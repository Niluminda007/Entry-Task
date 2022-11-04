import React, { PureComponent } from "react";
import Header from "./Header";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import ItemArea from "./ItemArea";
import Cart from "../pages/Cart";
import ProductPage from "../pages/ProductPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./Layout";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

class App extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="container">
            <Header />
            <Switch>
              <Layout>
                <Route exact path={`/`} component={ItemArea} />
                <Route path={`/ItemArea/:id`} component={ItemArea} />
                <Route path="/Cart" component={Cart} />
                <Route path={`/Products/:id`} component={ProductPage} />
              </Layout>
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
