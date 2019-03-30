import React from 'react';
import { hot } from 'react-hot-loader';


import './App.css';


import Controls from './Controls';
import Simulation from './Simulation';
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

        this.frameTime = 1 / 15;
        this.simulation = this.getOrCreateSimulation();
    }

    reset = () => {
        this.simulation = new Simulation(this.width, this.height);
        return this.simulation;
    }

    start = () => {
        if (this.state.animating) return;
        this.simulation = this.getOrCreateSimulation();

        this.setState(state => ({
            ...state,
            animating: true
        }));

        let lastTime = null;
        const frametime = 1 / 60 * 1000;
        const update = (time) => {
            if (!lastTime) lastTime = time;
            const dt = time - lastTime;

            if (dt >= frametime) {
                const entities = this.simulation.step(dt / 1000 /* dt in seconds */);

                this.setState(state => ({
                    ...state,
                    entities
                }));

                lastTime = time;
            }

            if (this.state.animating) {
                window.requestAnimationFrame(update);
            }
        };

        window.requestAnimationFrame(update);
    }

    stop = () => {
        if (!this.state.animating) return;

        this.setState(state => ({
            ...state,
            animating: false
        }));
    }

    getOrCreateSimulation = () => {
        if (!this.simulation) {
            this.simulation = new Simulation(this.width, this.height);
        }
        return this.simulation;
    }

    render = () => {
        return(
            <div className="sim-App">
                <div className="sim-row">
                    <div  className="sim-rowitem">
                        <Visualisation
                            render={this.state.animating}
                            entities={this.state.entities}
                            width={400}
                            height={400} />
                    </div>
                    <div  className="sim-rowitem">
                        <Controls className="sim-rowitem"
                            animating={this.state.animating}
                            reset={this.reset}
                            start={this.start}
                            stop={this.stop} />
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(module)(App);
