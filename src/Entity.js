import * as Vector2 from './vector2';


class Entity {

    constructor(position, velocity, acceleration) {
        this.position = [ ...position ];
        this.velocity = [ ...velocity ];
        this.acceleration = [ ...acceleration ];
    }

    render(context) {
        context.fillRect(this.position[0], this.position[1], 50, 50);
    }
}

export default Entity;
