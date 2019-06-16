import React from 'react';
import { hot } from 'react-hot-loader';
import CssBaseLine from '@material-ui/core/CssBaseline';


import './App.css';


import Controls from './Controls';
import SimulationAnimation from './SimulationAnimation';
import Visualisation from './Visualisation';


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
                    <div className="sim-row">
                        <div  className="sim-rowitem">
                            <SimulationAnimation
                                animating={true}
                                width={this.width}
                                height={this.height} />

                            {/* <Visualisation
                                render={true}
                                entities={this.state.entities}/> */}
                        </div>
                        {/*
                        <div  className="sim-rowitem">
                            <Controls className="sim-rowitem"
                                animating={this.state.animating}
                                reset={this.reset}
                                start={this.start}
                                step={this.step}
                                stop={this.stop} />
                        </div>
                        */}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default hot(module)(App);
