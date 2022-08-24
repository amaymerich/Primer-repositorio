import { Container, Sprite } from "pixi.js";
import { Easing, Tween } from "tweedle.js";


export class TweenScene extends Container {
    public xd:number = 0;
    constructor() {
        super();
        const star = Sprite.from("Ninja/White/2x/star.png");
       // star.anchor.set(1);
        star.x = 0;
        star.y = 0;
        this.addChild(star);

        star.scale.set(0);
        new Tween(star)
            .to({scale: {x: 5, y: 5}},2000)
            .delay(500)
            .easing(Easing.Elastic.Out)
            .start();
    }

    public onEnd():void
    {
        console.log("ya paso tiempo");
    }

    public update()
    {
    }
} 