import * as vector2 from './vector2';


export const reflect = (velocity, normal) => {
    // Formula taken from: https://math.stackexchange.com/questions/13261/how-to-get-a-reflection-vector
    const dotProduct = vector2.dot(velocity, normal);
    const scaledNormal = vector2.scale(normal, -2 * dotProduct)
    return vector2.add(velocity, scaledNormal)
}

export const collideWithEntity = (entity, other) => {
    const collisonVector = vector2.add(entity.position, vector2.scale(other.position, -1));
    const collisonNormal = vector2.normalise(collisonVector);

    // No collision if the entity is heading away from the collison
    // That is, the angle between entity and collision normal is <90
    const collisonAngle = vector2.angleBetween(entity.velocity, collisonNormal);
    if (collisonAngle < Math.PI / 2 /* 90 degrees */) {
        // Entity is moving away from the collison (ie, within 90 degrees of the normal)
        // and therefore there is no collison.
        return entity;
    }

    const netCollisonVelocity = vector2.add(entity.velocity, other.velocity);
    const netCollisonVelocityNormal = vector2.normalise([-1, 1]);

    const reflectedVelocity = reflect(entity.velocity, netCollisonVelocityNormal);
    const reflectionAcceleration = vector2.add(reflectedVelocity, vector2.scale(entity.velocity, -1));

    // console.debug(`inbound velocity: ${entity.velocity}`);
    // console.debug(`outbound velocity: ${reflectedVelocity}`);
    // console.debug(`acceleration ${reflectionAcceleration}`);

    return {
        ...entity,
        acceleration: vector2.add(entity.acceleration, reflectionAcceleration)
    };
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

