import Entity from './Entity';
import { collideWithEntity, reflect } from './physics';

expect.extend({
    toBeCloseTo(received, expected) {
        if (!Number.isFinite(received[0]) || !Number.isFinite(received[1])) {
            return {
                message: () => `expected ${received} to be close to ${expected}`,
                pass: false
            };
        }
        if (Math.abs(received[0] - expected[0]) > Math.pow(10, -10) ||
            Math.abs(received[1] - expected[1]) > Math.pow(10, -10)) {
            return {
                message: () => `expected ${received} to be close to ${expected}`,
                pass: false
            };
        }
        return {
            message: () => `expected ${received} not to be close to ${expected}`,
            pass: true
        };
    }
});

const entityWithoutAcceleration = (entity) => {
    const clone = { ...entity };
    delete clone.acceleration;
    return clone;
};


describe('collideWithEntity', () => {

    describe('given two entities with equal and opposed velocities collide', () => {
        // Entity to left of collison, travelling right
        const entity = new Entity([0, 0], [10, 0], [0, 0]);
        // Entity to right of collison, travelling left
        const other = new Entity([5, 0], [-10, 0], [0, 0]);

        it('returns the first with acceleration to reverse its velocity', () => {
            const bouncedEntity = collideWithEntity(entity, other);
            const { acceleration: bouncedAcceleration } = bouncedEntity;

            expect(bouncedAcceleration).toBeCloseTo([-20, 0]);
            expect(bouncedEntity).toEqual(expect.objectContaining(entityWithoutAcceleration(entity)));
        });

    });

    /*
    describe('given two entities travelling at right angles', () => {
        // Entity to left of collison, travelling left
        const entity = new Entity([0, 0], [-10, 0], [0, 0])
        // Entity to right of collison, travelling up
        const other = new Entity([5, 0], [0, -10], [0, 0]);

        it('reflects around net velocity', () => {
            const bouncedEntity = collideWithEntity(entity, other);
            const { acceleration: bouncedAcceleration } = bouncedEntity;

            expect(bouncedEntity.acceleration).toBeCloseTo([10, -10]);
            expect(bouncedEntity).toEqual(expect.objectContaining(entityWithoutAcceleration(entity)));
        });
    });

    describe('given two entities travelling at right angles', () => {
        // Entity to left of collison, travelling right
        const entity = new Entity([0, 0], [10, 0], [0, 0])
        // Entity to right of collison, travelling down
        const other = new Entity([5, 0], [0, 10], [0, 0]);

        it('reflects around net velocity', () => {
            const bouncedEntity = collideWithEntity(entity, other);
            const { acceleration: bouncedAcceleration } = bouncedEntity;

            expect(bouncedEntity.acceleration).toBeCloseTo([-10, 10]);
            expect(bouncedEntity).toEqual(expect.objectContaining(entityWithoutAcceleration(entity)));
        });
    });

    describe('given two entities travelling directly away from each other', () => {
        // Entity to left of collison, travelling left
        const entity = new Entity([0, 0], [-10, 0], [0, 0])
        // Entity to right of collison, travelling right
        const other = new Entity([5, 0], [10, 0], [0, 0]);


        it('do not collide', () => {
            const bouncedEntity = collideWithEntity(entity, other);
            const { acceleration: bouncedAcceleration } = bouncedEntity;

            expect(bouncedEntity.acceleration).toBeCloseTo([0, 0]);
            expect(bouncedEntity).toEqual(expect.objectContaining(entityWithoutAcceleration(entity)));
        });
    });

    describe('given two entities travelling parallel to one another', () => {
        // Entity to left of collison, travelling down
        const entity = new Entity([0, 0], [0, 10], [0, 0])
        // Entity to right of collison, travelling down
        const other = new Entity([5, 0], [0, 10], [0, 0]);


        it('do not collide', () => {
            const bouncedEntity = collideWithEntity(entity, other);
            const { acceleration: bouncedAcceleration } = bouncedEntity;

            expect(bouncedEntity.acceleration).toBeCloseTo([0, 0]);
            expect(bouncedEntity).toEqual(expect.objectContaining(entityWithoutAcceleration(entity)));
        });
    });

    describe('given two entities travelling collison path just off head-on', () => {
        // Entity to right of collison, travelling mostly left
        const entity = new Entity([0, 0], [-20, 1], [0, 0])
        // Entity to left of collison, travelling mostly right
        const other = new Entity([-5, 0], [20, 1], [0, 0]);


        it('still collide', () => {
            const bouncedEntity = collideWithEntity(entity, other);
            const { acceleration: bouncedAcceleration } = bouncedEntity;

            expect(bouncedEntity.acceleration).toBeCloseTo([40, 0]);
            expect(bouncedEntity).toEqual(expect.objectContaining(entityWithoutAcceleration(entity)));
        });
    });

    describe('given two entities travelling on a very shallow collison path', () => {
        // Entity to left of collison, travelling very slightly right
        const entity = new Entity([0, 0], [0.01, 10], [0, 0])
        // Entity to right of collison, travelling very slightly left
        const other = new Entity([5, 0], [-0.01, 10], [0, 0]);

        it('still collide', () => {
            const bouncedEntity = collideWithEntity(entity, other);
            const { acceleration: bouncedAcceleration } = bouncedEntity;

            expect(bouncedEntity.acceleration).toBeCloseTo([-0.02, 0]);
            expect(bouncedEntity).toEqual(expect.objectContaining(entityWithoutAcceleration(entity)));
        });

    });

    describe('given two entities travelling on a 45 degree collison path', () => {
        // Entity to left of collison, travelling right
        const entity = new Entity([0, 0], [10, 10], [0, 0])
        // Entity to right of collison, travelling left
        const other = new Entity([5, 0], [-10, 10], [0, 0]);

        it('still collide', () => {
            const bouncedEntity = collideWithEntity(entity, other);
            const { acceleration: bouncedAcceleration } = bouncedEntity;

            expect(bouncedEntity.acceleration).toBeCloseTo([-20, 0]);
            expect(bouncedEntity).toEqual(expect.objectContaining(entityWithoutAcceleration(entity)));
        });

    });

    */

});


// -1,-1     1,-1
//
//
// -1, 1     1, 1

describe('reflect', () => {
    const vLeft = [-1, 0];
    const vRight = [1, 0];
    const vUp = [0, -1];
    const vDown = [0, 1];

    it('reflects a up-left diagonal against a horizontal surface into a down-left', () => {
        const reflected = reflect([-1, -1], vDown);
        expect(reflected).toBeCloseTo([-1, 1]);
    });

    it('reflects an up-right diagonal against a horizontal surface into a down-right', () => {
        const reflected = reflect([1, -1], vDown);
        expect(reflected).toBeCloseTo([1, 1]);
    });

    it('reflects a down-right diagonal against a horizontal surface up-right', () => {
        const reflected = reflect([1, 1], vUp);
        expect(reflected).toBeCloseTo([1, -1]);
    });

    it('reflects a down-left diagonal against a horizontal surface up-left', () => {
        const reflected = reflect([-1, 1], vUp);
        expect(reflected).toBeCloseTo([-1, -1]);
    });


    it('reflects a up-left diagonal against a vertical surface into a up-right', () => {
        const reflected = reflect([-1, -1], vRight);
        expect(reflected).toBeCloseTo([1, -1]);
    });

    it('reflects an up-right diagonal against a vertical surface into a up-left', () => {
        const reflected = reflect([1, -1], vLeft);
        expect(reflected).toBeCloseTo([-1, -1]);
    });

    it('reflects a down-right diagonal against a vertical surface down-left', () => {
        const reflected = reflect([1, 1], vLeft);
        expect(reflected).toBeCloseTo([-1, 1]);
    });

    it('reflects a down-left diagonal against a vertical surface down-right', () => {
        const reflected = reflect([-1, 1], vRight);
        expect(reflected).toBeCloseTo([1, 1]);
    });

});
