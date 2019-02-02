import * as vector2 from './vector2';


export const reflect = (velocity, normal) => {
    const dotProduct = vector2.dot(velocity, normal);
    const scaledNormal = vector2.scale(normal, -2 * dotProduct)
    return vector2.add(velocity, scaledNormal)
}

export const reflectOld = (velocity, normal) => {
    const cosineOfIncidence = vector2.dot(velocity, normal) /
                              (vector2.mag(velocity) * vector2.mag(normal));
    let incidence = Math.acos(cosineOfIncidence);
    console.log('incidence', incidence * 180 / Math.PI);
    while (incidence > Math.PI / 2) incidence = incidence - (Math.PI / 2)

    const angleBetween = 2 * incidence;

    // No idea how to determine this one.
    const rotationDirection = 1 // or -1 to rotate counter clockwise

    return vector2.rotate(velocity, rotationDirection * angleBetween)
};

