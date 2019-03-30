import React from 'react';
import PropTypes from 'prop-types';

const Controls = (props) => {
    return (<div>
        <div className="Control">
            <button onClick={props.reset}>Reset</button>
            <button disabled={props.animating} onClick={props.start}>Start</button>
            <button disabled={props.animating} onClick={props.step}>Step</button>
            <button disabled={!props.animating} onClick={props.stop}>Stop</button>
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
