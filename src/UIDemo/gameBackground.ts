import { Container, Sprite } from "pixi.js";

export class gameBackground extends Container{
constructor(){
    super();
    const background: Sprite = Sprite.from("R12");
    background.scale.set(3.2);
    this.addChild(background);
    
    
}
}