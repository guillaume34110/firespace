
import Signup from './dependances/log-sign/Signup';
import { AuthProvider } from './dependances/context/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './dependances/Dashboard';
import Login from './dependances/log-sign/Login';
import PrivateRoute from "./dependances/private-route/PrivateRoute"
import ForgotPassword from'./dependances/log-sign/ForgotPassword';
import UpdateProfile from './dependances/log-sign/UpdateProfile';
import DStrategie from './dependances/DStrategie';
import DReglages from './dependances/DReglages';
import DCreation from './dependances/DCreation';
import DLoadding from './dependances/DLoadding';
function App() {


  return (

   
      
        <Router>
          <AuthProvider>
            <Switch>
            <PrivateRoute  path ="/loadding" component={DLoadding} />
            <PrivateRoute  path ="/creation" component={DCreation} />
            <PrivateRoute  path ="/reglages" component={DReglages} />
            <PrivateRoute  path ="/strategie" component={DStrategie} />   
              <PrivateRoute  path ="/update-profile" component={UpdateProfile} />  
              <PrivateRoute exact path ="/" component={Dashboard} />
              <Route path="/signup" component={Signup}  />
              <Route path="/login" component={Login}  />
              <Route path="/forgot-password" component ={ForgotPassword}></Route>
            </Switch>
          </AuthProvider>
        </Router>
        
     
   
  )
}

export default App;
