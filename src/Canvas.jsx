import React from 'react';
import PropTypes from 'prop-types';


import PureCanvas from './PureCanvas';


import './Canvas.css';


const TWO_PI = 2 * Math.PI;


class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();
        this.saveContext = this.saveContext.bind(this);
        this.updateCanvas = this.updateCanvas.bind(this);
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    updateCanvas() {
        if (this.props.render) {
            const canvasContext = this.canvasContext; // this.canvasRef.current.getContext('2d');

            canvasContext.clearRect(0, 0, this.props.width, this.props.height);
            canvasContext.save();

            canvasContext.fillStyle = 'grey';
            for (const entity of this.props.entities) {
                canvasContext.beginPath();
                canvasContext.ellipse(entity.position[0], entity.position[1], 5, 5, 0, 0, TWO_PI);
                canvasContext.fill();
            }

            canvasContext.restore();
        }
    }

    saveContext(canvasContext) {
        this.canvasContext = canvasContext;
    }

    render() {
        return(
            <div className="Canvas">
                <PureCanvas
                    saveContext={this.saveContext}
                    width={this.props.width}
                    height={this.props.height} />
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
