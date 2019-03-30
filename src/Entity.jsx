import react from 'react';


class Entity extends react.Component {

    static NEXT_ID = 0;

    constructor(position, velocity, acceleration) {
        super();

        this.id = `${Entity.NEXT_ID++}`; // `${Math.floor(Math.random() * 100000000)}`;
        this.position = [ ...position ];
        this.velocity = [ ...velocity ];
        this.acceleration = [ ...acceleration ];
    }

    render(context) {
        context.fillRect(this.position[0], this.position[1], 50, 50);
    }
}

export default Entity;
