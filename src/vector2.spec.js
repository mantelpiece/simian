import { angleBetween, project } from './vector2';

describe('angleBetween', () => {
    it('should return 0 for vectors with the same direction', () => {
        const v1 = [-0.01, 0];
        const v2 = [-13, 0];
        expect(angleBetween(v1, v2)).toEqual(0);
    });

    it('should return Math.PI (ie. 180 degrees) for vectors with the opposite directions', () => {
        const v1 = [5, 0];
        const v2 = [-5, 0];
        expect(angleBetween(v1, v2)).toEqual(Math.PI);
    });

    it('should return Math.PI / 2 (ie. 180 degrees) for vectors perpendicular to each other', () => {
        const v1 = [5, 0];
        const v2 = [0, -10];
        expect(angleBetween(v1, v2)).toEqual(Math.PI / 2);
    });
});

describe('project', () => {
    describe('when projecting [3, 5]', () => {

        it('onto the base, normal vector [1, 0], [3, 0] is returned', () => {
            const base = [1, 0];
            const v = [3, 5];
            expect(project(v, base)).toEqual([3, 0]);
        });

    });

    describe('when projecting [3, 5]', () => {

        it('onto the base, normal vector [0, 1], [0, 5] is returned', () => {
            const base = [1, 0];
            const v = [3, 5];
            expect(project(v, base)).toEqual([3, 0]);
        });

    });

});
