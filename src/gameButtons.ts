import { Container, Sprite } from "pixi.js";

export class gameButtons extends Container{
    constructor(){
        super();
        const menu: Sprite = Sprite.from("R7");
        menu.scale.set(3.2);
        menu.position.set(500,525);
        this.addChild(menu);
        
        const ok: Sprite = Sprite.from("R6");
        ok.scale.set(3.2);
        ok.position.set(600,525);
        this.addChild(ok);

        const back: Sprite = Sprite.from("R5");
        back.scale.set(3.2);
        back.position.set(740,525);
        this.addChild(back);
        
    }
}