import React from 'react';
import { hot } from 'react-hot-loader';
import CssBaseLine from '@material-ui/core/CssBaseline';


import './App.css';


import SimulationAnimation from './SimulationAnimation';


class App extends React.Component {

    constructor() {
        super();

        this.state = {
            animating: false,
            entities: [],
            interval: undefined
        };

        this.width = 400;
        this.height = 400;
    }

    render = () => {
        return(
            <React.Fragment>
                <CssBaseLine />
                <div className="sim-App">
                    <h1>Simulation Engine Doodad Thingo</h1>

                    <SimulationAnimation
                        animating={true}
                        width={this.width}
                        height={this.height} />
                </div>
            </React.Fragment>
        );
    }
}

export default hot(module)(App);
