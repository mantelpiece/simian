import { angleBetween } from './vector2';

describe('angleBetween', () => {
    it('should return 0 for vectors with the same direction', () => {
        const v1 = [-0.01, 0]
        const v2 = [-13, 0]
        expect(angleBetween(v1, v2)).toEqual(0);
    });

    it('should return Math.PI (ie. 180 degrees) for vectors with the opposite directions', () => {
        const v1 = [5, 0]
        const v2 = [-5, 0]
        expect(angleBetween(v1, v2)).toEqual(Math.PI);
    });

    it('should return Math.PI / 2 (ie. 180 degrees) for vectors perpendicular to each other', () => {
        const v1 = [5, 0]
        const v2 = [0, -10]
        expect(angleBetween(v1, v2)).toEqual(Math.PI / 2);
    });
});
