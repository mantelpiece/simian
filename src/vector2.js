export const add = (v1, v2) => {
    return [ v1[0] + v2[0], v1[1] + v2[1] ];
};

export const angleBetween = (v1, v2) => {
    const cosineOfInternalAngle = dot(v1, v2) /
        (mag(v1) * mag(v2));
    return Math.acos(cosineOfInternalAngle);
};

export const dot = (v1, v2) => {
    return (v1[0] * v2[0]) + (v1[1] * v2[1]);
};

export const mag = (v) => {
    return Math.pow((v[0] * v[0] + v[1] * v[1]), 0.5);
};

export const normalise = (v) => {
    return scale(v, 1 / (mag(v)));
}

export const rotate = (v, angle) => {
    const [x, y] = v;
    return [
        x * Math.cos(angle) - y * Math.sin(angle),
        x * Math.sin(angle) + y * Math.cos(angle)
    ]
}

export const scale = (v1, s) => {
    return [ s * v1[0], s * v1[1] ];
};
