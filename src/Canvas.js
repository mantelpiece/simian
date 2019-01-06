import React from 'react';


import Entity from './Entity';
import * as Vector2 from './vector2';


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
                
                // this.context.fillRect(entity.position[0], entity.position[1], 50, 50);
            }
        }
    }

    render() {
        return(
            <div className="Canvas">
                <canvas ref="canvas"
                        className="scene"
                        width={this.props.width}
                        height={this.props.height}></canvas>
                <p>{JSON.stringify(this.props)}</p>
            </div>
        );
    }
};

export default Canvas
