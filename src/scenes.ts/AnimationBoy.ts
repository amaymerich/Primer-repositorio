import { Texture } from "pixi.js";
import { PhysicsContainer } from "../game/PhysicsContainer";
import { StateAnimation } from "../game/StateAnimation";


export class AnimationBoy extends PhysicsContainer {


    private player:StateAnimation;
    private state: string;
    private speedAnimate: number;
    private loop= true;

    constructor(speed:number, state: string) {
        super();

        this.state = state;
        this.speedAnimate = speed;

        this.player = new StateAnimation();
        //this.player.pivot.set(3,1);
        this.addChild(this.player)

        this.player.addState("run", [
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

        ], this.speedAnimate, true);


        this.player.addState("jump",
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
        ], this.speedAnimate, true)

        this.player.addState("idle",
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
        ], this.speedAnimate, true)

        this.player.addState("dead",
        [
            Texture.from("Ninja/Dead/Dead__000.png"),
            Texture.from("Ninja/Dead/Dead__001.png"),
            Texture.from("Ninja/Dead/Dead__002.png"),
            Texture.from("Ninja/Dead/Dead__003.png"),
            Texture.from("Ninja/Dead/Dead__004.png"),
            Texture.from("Ninja/Dead/Dead__005.png"),
            Texture.from("Ninja/Dead/Dead__006.png"),
            Texture.from("Ninja/Dead/Dead__007.png"),
            Texture.from("Ninja/Dead/Dead__008.png"),
            Texture.from("Ninja/Dead/Dead__009.png"),
        ], this.speedAnimate, false)

        this.player.playState(this.state, this.loop);
    }

    public override update(frame:number)
    {
        this.player.update(frame);
    }

    public setState(state: string, speed:number, loop: boolean ){
        this.state = state;
        this.speedAnimate = speed;
        this.loop = loop;
        this.player.playState(this.state, this.loop);
    }
}