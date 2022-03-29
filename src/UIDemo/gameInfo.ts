import { Container, Sprite } from "pixi.js";

export class gameInfo extends Container {
    constructor(){
        super();
        const flag: Sprite = Sprite.from("R14");
        flag.scale.set(3.2);
        flag.position.set(380,85);
        this.addChild(flag);

        const start: Sprite = Sprite.from("R17");
        start.scale.set(3.2);
        start.position.set(510,200);
        this.addChild(start);
        
        const values: Sprite = Sprite.from("R8");
        values.scale.set(3.2);
        values.position.set(500,330);
        this.addChild(values);
        
        const diamonds: Sprite = Sprite.from("R20");
        diamonds.scale.set(3.2);
        diamonds.position.set(550,450);
        this.addChild(diamonds);
    }
}