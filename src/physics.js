import * as vector2 from './vector2';


export const reflect = (velocity, normal) => {
    // Formula taken from: https://math.stackexchange.com/questions/13261/how-to-get-a-reflection-vector
    const dotProduct = vector2.dot(velocity, normal);
    const scaledNormal = vector2.scale(normal, -2 * dotProduct)
    return vector2.add(velocity, scaledNormal)
}

export const collideWithEntity = (entity, other) => {
    // When two entities collide only the component of their velocities along the line of
    // collison are affected.

    const v1_ = entity.velocity;
    const v2_ = other.velocity;

    // const lineOfCollision_n = vector2.normalise(vector2.sub(entity.position, other.position));
    // const contactAngle = vector2.angleBetween(v1, lineOfCollision)
    const lineOfCollision_n = [1, 0];

    const v1_contact = vector2.project(v1_, lineOfCollision_n);
    const v1_contact_mag = vector2.projectScalar(v1_, lineOfCollision_n);

    // const v2_contact = vector2.project(v2_, lineOfCollision_n);
    const v2_contact_mag = vector2.projectScalar(v2_, lineOfCollision_n);

    // v1_contact + v1_tangent = v1;
    const v1_tangent = vector2.sub(v1_, v1_contact);

    // Two facts - conservation of momentum and kinetic energy
    // a) v1' - v2' = v2 - v1
    // => v2' = v1' - v2 + v1
    //
    // b) m1v1' + m2v2' = m1v1 + m2v2
    // => m1v1' + m2(v1' - v2 + v1) = m1v1 + m2v2
    // => (m1 + m2)v1' - m2v2 + mv2v1 = m1v1 + m2v2
    // => (m1 + m2)v1' = 2m2v2 - m2v1 + m1v1
    // => v1' = (2m2v2 - m2v1 + m1v1) / (m1 + m2)

    const v1 = v1_contact_mag;
    const m1 = 1;
    const v2 = v2_contact_mag;
    const m2 = 1;
    const next_v1_contact_mag = ((2*m2*v2) - (m2 * v1) + (m1 * v1)) / (m1 + m2);
    // const next_v1_contact_mag = (m1 - m2)/(m1 + m2)*v1 + 2*m2/(m1+m2)*v2; // another solution

    const next_v1_contact = vector2.scale(lineOfCollision_n, next_v1_contact_mag)
    const next_v1 = vector2.add(v1_tangent, next_v1_contact);

    // next_v1 = v1 + acceleration
    // acceleration = next_v1 - v1
    const acceleration = vector2.sub(next_v1, v1_);
    const finalAcceleration = vector2.add(entity.acceleration, acceleration);

    return {
        ...entity,
        acceleration: finalAcceleration
    };
}
