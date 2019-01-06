import React from 'react';


import Canvas from './Canvas';
import Simulation from './Simulation';



class Visualisation extends React.Component {

    constructor() {
        super();

        this.state = {
            animating: false,
            entities: [],
            interval: undefined
        };

        this.frameTime = 1 / 15;

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    }

    start() {
        if (this.state.animating) return;
        this.simulation = this.getOrCreateSimulation();
        
        const interval = setInterval(() => {
            const entities = this.simulation.step(this.frameTime);

            this.setState(state => ({
                ...state,
                entities
            }));
        }, this.frameTime);

        this.setState(state => ({
            ...state,
            animating: true,
            interval
        }));
    }

    stop() {
        if (!this.state.animating) return;
        clearInterval(this.state.interval);

        this.setState(state => ({
            ...state,
            animating: false,
            interval: undefined
        }));
    }

    getOrCreateSimulation() {
        if (!this.simulation) {
            this.simulation = new Simulation(this.props.width, this.props.height);
        }
        return this.simulation;
    }

    render() {
        return(
            <div className="Visualisation">
                    <div className="Control">
                        <button disabled={this.state.animating} onClick={this.start}>Start</button>
                        <button disabled={!this.state.animating} onClick={this.stop}>Stop</button>
                    </div>
                    <Canvas render={this.state.animating}
                            entities={this.state.entities} 
                            width={this.props.width}
                            height={this.props.height} />
                    <div><p>{JSON.stringify({...this.state, ...this.props})}</p></div>
            </div>
        );
    }

};


export default Visualisation;
