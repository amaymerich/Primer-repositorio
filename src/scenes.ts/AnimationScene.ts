import { Container, Texture } from "pixi.js";
import { StateAnimation } from "../game/StateAnimation";


export class AnimationScene extends Container {

    private NinjaSprite:StateAnimation;
    constructor() {
        super();

        this.NinjaSprite = new StateAnimation();
        this.NinjaSprite.position.set(200,200)
        this.NinjaSprite.scale.set(1);
        this.addChild(this.NinjaSprite)

        this.NinjaSprite.addState("run", 
        [
            Texture.from("Ninja/Run/Run__000.png"),
            Texture.from("Ninja/Run/Run__001.png"),
            Texture.from("Ninja/Run/Run__002.png"),
            Texture.from("Ninja/Run/Run__003.png"),
            Texture.from("Ninja/Run/Run__004.png"),
            Texture.from("Ninja/Run/Run__005.png"),
            Texture.from("Ninja/Run/Run__006.png"),
            Texture.from("Ninja/Run/Run__007.png"),
            Texture.from("Ninja/Run/Run__008.png"),
            Texture.from("Ninja/Run/Run__009.png")
        ], 0.1, true);

        this.NinjaSprite.addState("jump",
        [
            "Ninja/Jump/Jump__000.png", 
            "Ninja/Jump/Jump__001.png",
            "Ninja/Jump/Jump__002.png", 
            "Ninja/Jump/Jump__003.png",  
            "Ninja/Jump/Jump__004.png", 
            "Ninja/Jump/Jump__005.png", 
            "Ninja/Jump/Jump__006.png", 
            "Ninja/Jump/Jump__007.png", 
            "Ninja/Jump/Jump__008.png", 
            "Ninja/Jump/Jump__009.png"
        ])

        this.NinjaSprite.addState("idle",
        [
            "Ninja/Idle/Idle__000.png",
            "Ninja/Idle/Idle__001.png",
            "Ninja/Idle/Idle__002.png",
            "Ninja/Idle/Idle__003.png",
            "Ninja/Idle/Idle__004.png",
            "Ninja/Idle/Idle__005.png",
            "Ninja/Idle/Idle__006.png",
            "Ninja/Idle/Idle__007.png",
            "Ninja/Idle/Idle__008.png",
            "Ninja/Idle/Idle__009.png"
        ])

        this.NinjaSprite.playState("run", true);
        this.NinjaSprite.playState("jump", false);
        this.NinjaSprite.playState("idle", false);
    }

    public update(frame:number)
    {
        this.NinjaSprite.update(frame);
    }
} 