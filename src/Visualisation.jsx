import React from 'react';


import Canvas from './Canvas';
import Simulation from './Simulation';
import * as vector2 from './vector2';



class Visualisation extends React.Component {

    constructor() {
        super();

        this.state = {
            animating: false,
            entities: [],
            interval: undefined
        };

        this.frameTime = 1 / 15;

        this.reset = this.reset.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    }

    reset() {
        this.simulation = new Simulation(this.props.width, this.props.height);
        return this.simulation;
    }

    start() {
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
            const dt = time - lastTime

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

    stop() {
        if (!this.state.animating) return;

        this.setState(state => ({
            ...state,
            animating: false
        }));
    }

    getOrCreateSimulation() {
        if (!this.simulation) {
            this.simulation = new Simulation(this.props.width, this.props.height);
        }
        return this.simulation;
    }

    renderEntities() {
        return;

        if (this.simulation && this.simulation.entities) {
            const entities = this.simulation.entities.map((entity) => {
                return(<p key={entity.id}>Entity {entity.id}: speed: {Math.round(vector2.mag(entity.velocity), 1)}, direction: {Math.round(Math.atan(-1*entity.velocity[1] / entity.velocity[0]) * 180 / Math.PI, 0)}</p>);
            });
            return (<div>{entities}</div>);
        }
        return;
    }

    render() {
        return(
            <div className="Visualisation">
                    <div className="Control">
                        <button onClick={this.reset}>Reset</button>
                        <button disabled={this.state.animating} onClick={this.start}>Start</button>
                        <button disabled={!this.state.animating} onClick={this.stop}>Stop</button>
                    </div>
                    <Canvas render={this.state.animating}
                            entities={this.state.entities}
                            width={this.props.width}
                            height={this.props.height} />
                    { this.renderEntities() }
            </div>
        );
    }

};


export default Visualisation;
