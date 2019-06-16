import React from 'react';
import PropTypes from 'prop-types';


import Canvas from './Canvas';
import Simulation from './Simulation';


class SimulationAnimation extends React.Component {
    constructor(props) {
        super(props);

        this.animating = false;
        this.fps = 60;
        this.width = props.width;
        this.height = props.height;

        this.state = {
            entities: []
        };

        // TODO: Simulation should be passed in I reckon.
        this.simulation = this.getOrCreateSimulation();
    }

    componentDidMount() {
        // FIXME: Re-connect the controls component.
        this.start();
    }

    render() {
        return(
            <Canvas
                render={this.animating}
                entities={this.state.entities}
                width={this.props.width}
                height={this.props.height} />
        );
    }

    start() {
        if (this.animating) return;
        this.animating = true;

        const frametime = 1 / this.fps * 1000;

        let lastTime = null;
        const simulation = this.simulation;

        const update = (time) => {
            if (!lastTime) lastTime = time;
            const dt = time - lastTime;

            if (dt >= frametime) {

                const entities = simulation.step(dt / 1000 /* dt in seconds */);

                this.setState(state => ({
                    ...state,
                    entities
                }));

                lastTime = time;
            }

            if (this.animating) {
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

    step() {
        if (this.state.animating) return;

        const entities = this.simulation.step(0.1 /* seconds */);
        this.setState(state => ({
            ...state,
            entities
        }));
    }

    getOrCreateSimulation = () => {
        if (!this.simulation) {
            this.simulation = new Simulation(this.width, this.height);
        }
        return this.simulation;
    }

    reset() {
        this.simulation = new Simulation(this.width, this.height);
        return this.simulation;
    }
}

SimulationAnimation.propTypes = {
    animating: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};


export default SimulationAnimation;
