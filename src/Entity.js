import * as Vector2 from './vector2';


class Entity {

    constructor(position, velocity, acceleration) {
        this.id = `${Entity.count++}`; // `${Math.floor(Math.random() * 100000000)}`;
        this.position = [ ...position ];
        this.velocity = [ ...velocity ];
        this.acceleration = [ ...acceleration ];
    }

    render(context) {
        context.fillRect(this.position[0], this.position[1], 50, 50);
    }
}

Entity.count = 0;

export default Entity;
