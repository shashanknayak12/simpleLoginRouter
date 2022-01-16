import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Dashboard from './Dashboard'
import { Route, Switch } from 'react-router-dom';
import { Component } from 'react';
import Login from './Login';
import Alert from './Alert';


class App extends Component {


  state = {
    message: '',
    type: '',
  }


  setMessage = ({ message, type }) => {
    this.setState({
      message,
      type
    })
    setTimeout(() => {
      this.setState({
        message: '',
        type: ''
      })
    }, 2000)
  }





  render() {
    return (
      <div>


        <div>
          <Switch>
            <Route path='/login' render={(props) => <Login {...props} setMessage={this.setMessage} />} />

            <Route path='/:activetab?' render={(props) => <Dashboard {...props} setMessage={this.setMessage} />} />

          </Switch>
        </div>
        {
          this.state.message ?
            <Alert type={this.state.type} message={this.state.message} />
            : null
        }

      </div>
    );
  }

}

export default App;
