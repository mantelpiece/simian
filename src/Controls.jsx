import React from 'react';
import PropTypes from 'prop-types';

import './Controls.css';

const Controls = (props) => {
    return (<div>
        <div className="sim-row">
            <div className="sim-rowitem">
                <select className="sim-ctrl" id="simulation-select">
                </select>
            </div>
        </div>
        <div className="sim-row">
            <button className="sim-rowitem" onClick={props.reset}>Reset</button>
            <button className="sim-rowitem" disabled={props.animating} onClick={props.start}>Start</button>
            <button className="sim-rowitem" disabled={props.animating} onClick={props.step}>Step</button>
            <button className="sim-rowitem" disabled={!props.animating} onClick={props.stop}>Stop</button>
        </div>
    </div>);
};

Controls.propTypes = {
    animating: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    step: PropTypes.func.isRequired,
};


export default Controls;
