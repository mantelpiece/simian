import React from 'react';
import PropTypes from 'prop-types';


import Canvas from './Canvas';
import Controls from './Controls';
import Simulation from './Simulation';


import './SimulationAnimation.css';


class SimulationAnimation extends React.Component {
    constructor(props) {
        super(props);

        this.fps = 60;
        this.width = props.width;
        this.height = props.height;

        this.fpsTrack = [ 60, 60, 60, 60, 60];

        this.state = {
            animating: false,
            entities: []
        };

        // TODO: Simulation should be passed in I reckon.
        this.simulation = this.getOrCreateSimulation();


        this.reset = this.reset.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.step = this.step.bind(this);
    }

    componentDidMount() {
        // FIXME: Re-connect the controls component.
        this.start();
    }

    render() {
        return(
            <div className="sim-row relativePositioned">
                <div className="absolutePositioned topLeft colorDebug margin2px">
                    {Math.round(this.fpsTrack.reduce((s, e) => (s + e), 0) / 5, 0)}FPS
                </div>
                <div className="sim-rowitem">
                    <Canvas
                        render={this.animating}
                        entities={this.state.entities}
                        width={this.props.width}
                        height={this.props.height} />
                </div>

                <div  className="sim-rowitem">
                    <Controls
                        animating={this.state.animating}
                        reset={this.reset}
                        start={this.start}
                        step={this.step}
                        stop={this.stop} />
                </div>
            </div>
        );
    }

    start() {
        if (this.state.animating) return;

        this.setState(state => ({
            ...state,
            animating: true
        }));


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

                this.fpsTrack.push(1000 / dt);
                this.fpsTrack.shift();
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

    step() {
        if (this.state.animating) return;

        const entities = this.simulation.step(0.1 /* seconds */);
        this.setState(state => ({
            ...state,
            entities
        }));
    }

    reset() {
        this.simulation = new Simulation(this.width, this.height);
        this.setState(state => ({
            ...state,
            animating: false,
            entities: this.simulation.entities,
        }));
        return this.simulation;
    }

    getOrCreateSimulation = () => {
        if (!this.simulation) {
            this.simulation = new Simulation(this.width, this.height);
        }
        return this.simulation;
    }
}

SimulationAnimation.propTypes = {
    animating: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};


export default SimulationAnimation;
