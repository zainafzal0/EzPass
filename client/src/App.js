import './App.css';
import Start from "./Start"
import Register from "./Register/Register";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import PasswordsPage from "./PasswordsPage/PasswordsPage";
import CardsPage from "./PaymentCardsPage/CardsPage";
import NotesPage from "./NotesPage/NotesPage";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddressesPage from './AddressesPage/AddressesPage';
function App() {
  return (
    <Router>
      <div className="App"> 
          <Switch>
            <Route path="/" exact component={Start}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/dashboard/home" component={Dashboard}/>
            <Route path="/dashboard/passwords" component={PasswordsPage}/>
            <Route path="/dashboard/credit-cards" component={CardsPage}/>
            <Route path="/dashboard/notes" component={NotesPage}/>
            <Route path="/dashboard/addresses" component={AddressesPage}/>
          </Switch>
       </div>
    </Router>
      
      

    
  );
}

export default App;
