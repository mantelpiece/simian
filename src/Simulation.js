import Entity from './Entity';
import * as physics from './physics';
import * as vector2 from './vector2';

const ENTITY_COUNT = 10;

const randomEntity = (width, height, maxSpeed) => {
    const r = Math.random;

    const speed = () => (r() * 2 * maxSpeed) - maxSpeed;

    return new Entity(
        [r() * width, r() * height],
        [speed(), speed()],
        [0, 0]
    );
};


const createHorizontallyOpposedEntities = () => ([ // eslint-disable-line no-unused-vars
    new Entity([100, 200], [100, 0], [0, 0]),
    new Entity([300, 200], [-100, 0], [0, 0]),
]);

const createRandomEntities = (numEntities, width, height) => {
    const entities = [];

    for (let i = 0; i < numEntities; i++) {
        entities.push(randomEntity(width, height, 200));
    }

    return entities;
};


class Simulation {

    constructor(width, height, entityCount = ENTITY_COUNT) {
        this.width = width;
        this.height = height;
        this.entityCount = entityCount;

        // this.entities = createHorizontallyOpposedEntities(this.entityCount, width, height);
        this.entities = createRandomEntities(this.entityCount, width, height);

        this.stop = false;
        this.collisons = 0;
    }

    step(dt) {
        if (this.stop) { return this.entities; }
        const entities = this.entities.map(entity => this.updateEntity(dt, entity, this.entities));

        this.entities = entities;
        return entities;
    }

    updateEntity(dt, entity, others) {
        return this.applyPhysics(dt, this.applyEntityCollison(dt, this.applyWallCollison(dt, entity), others));
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

        const { position, lastCollison } = entity;

        const { closestEntity, minDistance } = others.reduce(({closestEntity, minDistance}, other) => {
            if (other.id === entity.id || other.id === lastCollison) {
                return {closestEntity, minDistance};
            }

            const proximityVector = [position[0] - other.position[0], position[1] - other.position[1]];
            const proximity = vector2.mag(proximityVector);

            if (proximity < minDistance) {
                return { closestEntity: other, minDistance: proximity };
            } else {
                return { closestEntity, minDistance };
            }
        }, { minDistance: Number.POSITIVE_INFINITY });

        const ENTITY_COLLISON_LIMIT = 10;
        if (minDistance <= ENTITY_COLLISON_LIMIT) {
            return {
                ...physics.collideWithEntity(entity, closestEntity),
                lastCollison: closestEntity.id
            };
        }

        return entity;
    }

    applyWallCollison(dt, entity) {
        const { position, velocity, acceleration } = entity;

        const performCollison = (surfaceNormal) => {
            const reflectedVelocity = physics.reflect(velocity, surfaceNormal);
            const a_reflection = vector2.sub(reflectedVelocity, velocity);
            const newAcceleration = vector2.add(acceleration, a_reflection);
            return {
                ...entity,
                acceleration: newAcceleration,
                lastCollision: null
            };
        };

        if (position[0] < 5 && velocity[0] < 0) {
            return performCollison([1, 0]);
        } else if (position[0] > (this.width - 5) && velocity[0] > 0) {
            return performCollison([-1, 0]);
        }

        if (position[1] < 5 && velocity[1] < 0) {
            return performCollison([0, -1]);
        } else if (position[1] > (this.height - 5) && velocity[1] > 0) {
            return performCollison([0, 1]);
        }

        return entity;
    }
}

export default Simulation;
