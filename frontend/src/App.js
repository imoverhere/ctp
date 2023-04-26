import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ContactListPage from './components/ContactListPage';
import AddContact from './components/AddContact';
import EditContactPage from './components/EditContactPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/contacts" component={ContactListPage} />
          <Route path="/add-contact" component={AddContact} />
          <Route path="/edit/:id" component={EditContactPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
