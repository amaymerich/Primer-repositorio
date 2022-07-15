import { Container, Sprite, Texture, Text} from "pixi.js";

export class gameButtons extends Container{
    private lastKeyPressed:Text;

    constructor()
    {
        super();

        const musicOff: Sprite = Sprite.from("musicOff");
        musicOff.scale.set(3.2);
        musicOff.position.set(600,525);
        musicOff.on("touchstart",this.onTouchStart,this);
        musicOff.on("touchend",this.onTouchEnd,this);
        musicOff.interactive=true;
        this.addChild(musicOff);

        const musicOn: Sprite = Sprite.from("musicOn");
        musicOn.scale.set(3.2);
        musicOn.position.set(740,525);
        musicOn.on("touchstart",this.onTouchStart,this);
        musicOn.on("touchend",this.onTouchEnd,this);
        musicOn.interactive=true;
        this.addChild(musicOn);

        const plus: Sprite = Sprite.from("plus");
        plus.scale.set(3.2);
        plus.position.set(600,525);
        plus.on("touchstart",this.onTouchStart,this);
        plus.on("touchend",this.onTouchEnd,this);
        plus.interactive=true;
        this.addChild(plus);

        const minus: Sprite = Sprite.from("minus");
        minus.scale.set(3.2);
        minus.position.set(740,525);
        minus.on("touchstart",this.onTouchStart,this);
        minus.on("touchend",this.onTouchEnd,this);
        minus.interactive=true;
        this.addChild(minus);

        this.lastKeyPressed = new Text ("Waiting...",{fontSize: 48});
        this.lastKeyPressed.anchor.set(3.2);
        this.lastKeyPressed.position.set(950,830);
        this.addChild(this.lastKeyPressed);
    }
           
        private onTouchStart():void{  
            console.log("touch down");
        }
        private onTouchEnd():void{  
            console.log("touch up");
        }
          
    
    } 