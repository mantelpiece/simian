export function add(v1, v2) {
    return [ v1[0] + v2[0], v1[1] + v2[1] ];
}

export function angleBetween(v1, v2) {
    const cosineOfInternalAngle = dot(v1, v2) /
        (mag(v1) * mag(v2));
    return Math.acos(cosineOfInternalAngle);
}

export function dot(v1, v2) {
    return (v1[0] * v2[0]) + (v1[1] * v2[1]);
}

export function mag(v) {
    return Math.pow((v[0] * v[0] + v[1] * v[1]), 0.5);
}

export function normalise(v) {
    return scale(v, 1 / (mag(v)));
}

/**
 * Scalar projection of v onto the normalised vector base.
 */
export function projectScalar(v, base) {
    return dot(v, base);
}

/**
 * Projection of v onto the normalised vector base.
 */
export function project(v, base) {
    const scalar_projection = dot(v, base);
    return scale(base, scalar_projection);
}

export function rotate(v, angle) {
    const [x, y] = v;
    return [
        x * Math.cos(angle) - y * Math.sin(angle),
        x * Math.sin(angle) + y * Math.cos(angle)
    ];
}

export function scale(v1, s) {
    return [ s * v1[0], s * v1[1] ];
}

export function sub(v1, v2) {
    return [ v1[0] - v2[0], v1[1] - v2[1] ];
}
