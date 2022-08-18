import { Container, Sprite, Texture } from "pixi.js";

export class Buttons extends Container{
    private def:Texture;
    private down: Texture;
    private over: Texture;
    private spr: Sprite;
    private callback: Function;

    constructor(def: Texture, down: Texture, over: Texture, callback: Function){
        super();

        this.def=def;
        this.down=down;
        this.over=over;
        this.callback=callback;

        this.spr= Sprite.from(def);
        this.spr.scale.set(3.2);
        this.spr.position.set(500,525);
        this.addChild(this.spr);

        this.spr.interactive=true;
        this.spr.on("mousedown",this.onMouseDown,this);
        this.spr.on("mouseout",this.onMouseOut,this);
        this.spr.on("mouseup",this.onMouseUp,this);
        this.spr.on("mouseover",this.onMouseOver,this);
    }


    private onMouseDown():void{  
        this.callback();
        this.spr.texture =this.down;
    }
    private onMouseUp():void{  
        this.emit("buttonClick");
        this.spr.texture = this.over;
    }
    private onMouseOver():void{  
        console.log("mouse Enter");
        this.spr.texture =this.over;
    }
    private onMouseOut():void{  
        console.log("mouse Exit");
        this.spr.texture = this.def;
    }

} 