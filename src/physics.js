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
    /* This works on a wrong assumption */
    const collisonAngle = vector2.angleBetween(entity.velocity, collisonNormal);
    if (collisonAngle < Math.PI / 2) {
        // Entity is moving away from the collison (ie, within 90 degrees of the normal)
        // and therefore there is no collison.
        return entity;
    }

    const netCollisonVelocity = vector2.add(entity.velocity, other.velocity);
    let netCollisonVelocityNormal;
    if (Math.abs(netCollisonVelocity[0]) < Math.pow(10, -10) ||
        Math.abs(netCollisonVelocity[1]) < Math.pow(10, -10)) {
        netCollisonVelocityNormal = vector2.scale(entity.velocity, -1 / vector2.mag(entity.velocity));
    } else {
        // Need to pick direction to rotate to get normal - no idea how?
        netCollisonVelocityNormal = vector2.normalise(vector2.rotate(netCollisonVelocity, Math.PI / 2));
        const angle = vector2.angleBetween(entity.velocity, netCollisonVelocityNormal);
        if (angle < Math.PI / 2) {
            netCollisonVelocityNormal = vector2.scale(netCollisonVelocityNormal, -1);
        }
    }

    const reflectedVelocity = reflect(entity.velocity, netCollisonVelocityNormal);
    const reflectedVelocityMagnitude = vector2.mag(reflectedVelocity);

    // Mess around with energy economy.
    const collisonEnergy = 1 * Math.pow(vector2.mag(entity.velocity), 2);
                         + 1 * Math.pow(vector2.mag(other.velocity), 2);
    const targetEnergy = 0.5 * collisonEnergy;
    const targetSpeed = Math.sqrt(targetEnergy / 1);

    const scaledReflectedVelocity = vector2.scale(reflectedVelocity, targetSpeed / reflectedVelocityMagnitude);
    const reflectionAcceleration = vector2.add(scaledReflectedVelocity, vector2.scale(entity.velocity, -1));

    console.debug(`inbound velocity: ${entity.velocity}`);
    console.debug(`outbound velocity: ${scaledReflectedVelocity}`);
    console.debug(`acceleration ${reflectionAcceleration}`);

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

