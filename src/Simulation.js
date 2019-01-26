import Entity from './Entity';
import * as physics from './physics';
import * as vector2 from './vector2';


const randomEntity = (width, height, maxSpeed) => {
    const r = Math.random;

    const speed = () => (r() * 2 * maxSpeed) - (maxSpeed / 2);

    return new Entity(
        [r() * width, r() * height],
        [speed(), speed()],
        [0, 0]
    );
}


class Simulation {

    constructor(width, height) {
        this.width = width;
        this.height = height;

        const entityCount = 5;
        this.entities = [];
        for (let i = 0; i <= entityCount; i++) {
            this.entities.push(randomEntity(width, height, 10));
        }
    }

    step(dt) {
        const entities = this.entities.map(entity => this.updateEntity(dt, entity, entities));

        this.entities = entities;
        return entities;
    }

    updateEntity(dt, entity, others) {
        const { position, velocity, acceleration } = entity;

        const newVelocity = vector2.add(velocity, acceleration);
        const newPosition = vector2.add(position, vector2.scale(velocity, dt));
        const newAcceleration = [0, 0];

        if (newPosition[0] < 5 && newVelocity[0] < 0) {
            const reflectedVelocity = physics.reflect(newVelocity, /* normal */ [1, 0]);
            newAcceleration[0] += 2 * reflectedVelocity[0]
        } else if (newPosition[0] > (this.width - 5) && newVelocity[0] > 0) {
            const reflectedVelocity = physics.reflect(newVelocity, /* normal */ [-1, 0]);
            newAcceleration[0] += 2 * reflectedVelocity[0]
        }

        if (newPosition[1] < 5 && newVelocity[1] < 0) {
            const reflectedVelocity = physics.reflect(newVelocity, /* normal */ [0, -1]);
            newAcceleration[1] += 2 * reflectedVelocity[1]
        } else if (newPosition[1] > (this.height - 5) && newVelocity[1] > 0) {
            const reflectedVelocity = physics.reflect(newVelocity, /* normal */ [0, 1]);
            newAcceleration[1] += 2 * reflectedVelocity[1]
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
