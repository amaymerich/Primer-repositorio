import { Container, Sprite, Texture } from "pixi.js";

export class Button extends Container
{   
    public static readonly CLICKED_EVENT: string = "buttonClick";
    private def:Texture;
    private down:Texture;
    private over:Texture;


    private spr:Sprite;
    
    constructor(def:Texture, down?:Texture, over?:Texture)
    {
        super();
        this.def = def;
        this.down = down ?? def;
        this.over = over ?? def;

        this.spr = Sprite.from(def);
        this.spr.anchor.set(0.5);
        this.addChild(this.spr);

        this.spr.interactive = true;
        this.spr.on("pointerdown", this.onMouseDown, this)
        this.spr.on("pointerup", this.onMouseUp, this)
        this.spr.on("pointerover", this.onMouseOver, this);
        this.spr.on("pointerout", this.onMouseOut, this);
    }
    
    private onMouseDown():void {
        this.spr.texture = this.down;
    }
    private onMouseUp():void {
        this.emit(Button.CLICKED_EVENT)
        this.spr.texture = this.over;
    }
    private onMouseOver():void {
        this.spr.texture = this.over;
    }
    private onMouseOut():void {
        this.spr.texture = this.def;
    }
}