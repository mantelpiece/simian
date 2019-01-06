import React from 'react';
import { hot } from 'react-hot-loader';


import './App.css';


// import Simulation from './Simulation';
import Visualisation from './Visualisation';


class App extends React.Component {
    render() {
        return(
            <div className="App">
                <Visualisation width={800} height={800}/>
            </div>
        );
    }
}


export default hot(module)(App);
