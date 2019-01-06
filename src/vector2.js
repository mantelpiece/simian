export const add = (v1, v2) => {
    return [ v1[0] + v2[0], v1[1] + v2[1] ];
};

export const scale = (v1, s) => {
    return [ s * v1[0], s * v1[1] ];
};
