import React from 'react';
import PropTypes from 'prop-types';


class PureCanvas extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <canvas
                width={this.props.width}
                height={this.props.height}
                ref={node => node ? this.props.saveContext(node.getContext('2d')) : null} />
        );
    }
}


PureCanvas.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    saveContext: PropTypes.func.isRequired,
};


export default PureCanvas;
