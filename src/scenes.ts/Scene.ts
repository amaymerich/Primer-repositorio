import { AnimatedSprite, Container, Texture } from "pixi.js";


export class Scene extends Container
{
    private platform: AnimatedSprite;
    constructor()
    {
        super();
        this.platform = new AnimatedSprite
         (
            [
                Texture.from("F1"),
                Texture.from("F2"),
                Texture.from("F3"),
                Texture.from("F4"), 
            ],
            true
         );
         this.platform.play();
         this.platform.scale.set(1);
         this.platform.position.set(500,500);
         this.addChild(this.platform);
    }
}