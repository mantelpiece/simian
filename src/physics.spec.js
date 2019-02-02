import Entity from './Entity';
import { collideWithEntity, reflect } from './physics';

expect.extend({
    toBeCloseTo(received, expected) {
        if (!Number.isFinite(received[0]) || !Number.isFinite(received[1])) {
            return {
                message: () => `expected ${received} to be close to ${expected}`,
                pass: false
            }
        }
        if (Math.abs(received[0] - expected[0]) > Math.pow(1, -10) ||
            Math.abs(received[1] - expected[1]) > Math.pow(1, -10)) {
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


describe('collideWithEntity', () => {
    describe('when two entities with equal but opposite velocities collide', () => {
        const entity = new Entity([0, 0], [10, 0], [0, 0])
        const other = new Entity([5, 0], [-10, 0], [0, 0]);

        it('returns the entity with acceleration to reverse its velocity', () => {

            const bouncedEntity = collideWithEntity(entity, other);
            const { acceleration: bouncedAcceleration } = bouncedEntity;

            expect(bouncedEntity.acceleration).toBeCloseTo([-20, 0]);
            expect(bouncedEntity).toEqual({
                ...entity,
                acceleration: [-20, 0]
            })
        });
    });
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
