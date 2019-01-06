import Entity from './Entity';
import * as vector2 from './vector2';


const randomEntity = (width, height) => {
    const r = Math.random;
    return new Entity(
        [r() * width, r() * height],
        [r() * 19 + 1, r() * 19 + 1],
        [0, 0]
    );
}


class Simulation {

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.entities = [
            randomEntity(width, height),
            randomEntity(width, height),
            randomEntity(width, height),
            randomEntity(width, height),
            randomEntity(width, height),
            randomEntity(width, height),
            randomEntity(width, height),
            randomEntity(width, height),
            randomEntity(width, height),
            randomEntity(width, height),
            randomEntity(width, height)
        ];
    }

    step(dt) {
        const entities = this.entities.map(entity => this.updateEntity(dt, entity));

        this.entities = entities;
        return entities;
    }

    updateEntity(dt, entity) {
        const { position, velocity, acceleration } = entity;

        const newVelocity = vector2.add(velocity, acceleration);
        const newPosition = vector2.add(position, vector2.scale(velocity, dt));
        const newAcceleration = [0, 0];

        if ((newPosition[0] < 5 && newVelocity[0] < 0) ||
            (newPosition[0] > (this.width - 5) && newVelocity[0] > 0)) {
            newAcceleration[0] -= 2 * newVelocity[0];
        }

        if ((newPosition[1] < 5 && newVelocity[1] < 0) ||
            (newPosition[1] > (this.height - 5) && newVelocity[1] > 0)) {
            newAcceleration[1] -= 2 * newVelocity[1];
        }

        return {
            ...entity,
            position: newPosition,
            velocity: newVelocity,
            acceleration: newAcceleration
        };
    }
}


export default Simulation;
