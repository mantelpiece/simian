import React from 'react';
import PropTypes from 'prop-types';


import './Canvas.css';


const TWO_PI = 2 * Math.PI;


class Canvas extends React.Component {
    constructor() {
        super();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    updateCanvas() {
        if (this.props.render) {
            const context = this.refs.canvas.getContext('2d');
            context.clearRect(0, 0, this.props.width, this.props.height);
            context.fillStyle = 'grey';
            for (const entity of this.props.entities) {
                context.beginPath();
                context.ellipse(entity.position[0], entity.position[1], 5, 5, 0, 0, TWO_PI);
                context.fill();
            }
        }
    }

    render() {
        return(
            <div className="Canvas">
                <canvas
                    ref="canvas"
                    className="scene"
                    width={this.props.width}
                    height={this.props.height}></canvas>
            </div>
        );
    }
}


Canvas.propTypes = {
    render: PropTypes.bool,
    entities: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number
};

export default Canvas;
