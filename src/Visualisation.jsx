import React from 'react';
import PropTypes from 'prop-types';


import Canvas from './Canvas';
import * as vector2 from './vector2';


class Visualisation extends React.Component {

    renderEntities() {
        if (this.props.entities) {
            const entities = this.props.entities.map((entity) => {
                const speed = Math.round(vector2.mag(entity.velocity), 1);
                const direction = Math.round(Math.atan(-1*entity.velocity[1] / entity.velocity[0]) * 180 / Math.PI, 0);
                const position = `position [${Math.round(entity.position[0], 0)}, ${Math.round(entity.position[1], 0)}]`;
                const entityDescription = `Entity ${entity.id}: speed ${speed}, direction ${direction} ${position}`;
                return(<p key={entity.id}>{entityDescription}</p>);
            });
            return (<div>{entities}</div>);
        }
        return (<div>No entities</div>);
    }

    render() {
        return(
            <div className="Visualisation">
                <Canvas
                    render={this.props.render}
                    entities={this.props.entities}
                    width={this.props.width}
                    height={this.props.height} />
                { this.renderEntities() }
            </div>
        );
    }

}


Visualisation.propTypes = {
    render: PropTypes.bool,
    entities: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number
};


export default Visualisation;
