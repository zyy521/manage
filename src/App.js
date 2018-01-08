
import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
import LoginView from './Login'
import MainView from './MainView'
import "./App.css"

class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Route path="/index" component={MainView}/>
                    <Route path="/login" component={LoginView}/>
                </div>
            </Router>
        )
    }
}

export default App;
