import Entity from './Entity';
import * as physics from './physics';
import * as vector2 from './vector2';


const randomEntity = (width, height, maxSpeed) => {
    const r = Math.random;

    const speed = () => (r() * 2 * maxSpeed) - maxSpeed;

    return new Entity(
        [r() * width, r() * height],
        [speed(), speed()],
        [0, 0]
    );
}

const entityCount = 10;


class Simulation {

    constructor(width, height) {
        this.width = width;
        this.height = height;

        /*
        this.entities = [
            new Entity([100, 250], [5, 0], [0, 0]),
            new Entity([150, 150], [0, 10], [0, 0]),
        ];
        */

        this.entities = [];
        for (let i = 0; i <= entityCount; i++) {
            this.entities.push(randomEntity(width, height, 200));
        }

        this.collisons = 0;
    }

    step(dt) {
        if (this.stop) { return this.entities; }
        const entities = this.entities.map(entity => this.updateEntity(dt, entity, this.entities));

        this.entities = entities;
        return entities;
    }

    updateEntity(dt, entity, others) {
        return this.applyEntityCollison(dt, this.applyWallCollison(dt, this.applyPhysics(dt, entity)), others);
        // return this.applyWallCollison(dt, this.applyPhysics(dt, entity));
    }

    applyPhysics(dt, entity) {
        const { position, velocity, acceleration } = entity;

        const newVelocity = vector2.add(velocity, vector2.scale(acceleration, 1));
        const newPosition = vector2.add(position, vector2.scale(velocity, dt));
        const newAcceleration = [0, 0];

        return {
            ...entity,
            position: newPosition,
            velocity: newVelocity,
            acceleration: newAcceleration
        };
    }

    applyEntityCollison(dt, entity, others) {

        const { position, velocity, acceleration } = entity;

        const { closestEntity, minDistance } = others.reduce(({closestEntity, minDistance}, other) => {
            if (other.id === entity.id) return {closestEntity, minDistance};

            const proximityVector = [position[0] - other.position[0], position[1] - other.position[1]]
            const proximity = Math.abs(vector2.mag(proximityVector));

            if (proximity < minDistance) {
                return { closestEntity: other, minDistance: proximity };
            } else {
                return { closestEntity, minDistance };
            }
        }, { minDistance: Number.POSITIVE_INFINITY });

        const ENTITY_COLLISON_LIMIT = 10;
        if (minDistance < ENTITY_COLLISON_LIMIT) {
            console.log(`collison between ${entity.id} and ${closestEntity.id}`);
            return physics.collideWithEntity(entity, closestEntity);
        }

        return entity;
    }

    applyWallCollison(dt, entity) {
        const { position, velocity, acceleration } = entity;

        const newAcceleration = [0, 0];

        if (position[0] < 5 && velocity[0] < 0) {
            const reflectedVelocity = physics.reflect(velocity, /* normal */ [1, 0]);
            newAcceleration[0] += 2 * reflectedVelocity[0]
        } else if (position[0] > (this.width - 5) && velocity[0] > 0) {
            const reflectedVelocity = physics.reflect(velocity, /* normal */ [-1, 0]);
            newAcceleration[0] += 2 * reflectedVelocity[0]
        }

        if (position[1] < 5 && velocity[1] < 0) {
            const reflectedVelocity = physics.reflect(velocity, /* normal */ [0, -1]);
            newAcceleration[1] += 2 * reflectedVelocity[1]
        } else if (position[1] > (this.height - 5) && velocity[1] > 0) {
            const reflectedVelocity = physics.reflect(velocity, /* normal */ [0, 1]);
            newAcceleration[1] += 2 * reflectedVelocity[1]
        }

        return {
            ...entity,
            acceleration: newAcceleration
        };
    }
}


export default Simulation;
