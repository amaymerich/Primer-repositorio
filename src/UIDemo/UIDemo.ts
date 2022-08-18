import { Container, Sprite, Text, Texture} from "pixi.js";
import { Buttons } from "./gameButtons";
import { Keyboard } from "./Keyboard";

export class gameButtons extends Container{
    private buttonMenu: Buttons;
    private lastKeyPressed:Text;

    constructor()
    {
        super();

        this.buttonMenu= new Buttons (Texture.from("musicOff"),Texture.from("musicOn"),Texture.from("plus"),this.onButtonClick.bind(this));
        this.buttonMenu.on("buttonClick",this.onButtonClick);

        this.buttonMenu.interactive=true;
        this.addChild(this.buttonMenu);

        const musicoff: Sprite = Sprite.from("musicOff");
        musicoff.scale.set(3.2);
        musicoff.position.set(600,525);
        musicoff.on("touchstart",this.onTouchStart,this);
        musicoff.on("touchend",this.onTouchEnd,this);
        musicoff.interactive=true;
        this.addChild(musicoff);

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

     /*   const minus: Sprite = Sprite.from("minus");
        minus.scale.set(3.2);
        minus.position.set(740,525);
        minus.on("touchstart",this.onTouchStart,this);
        minus.on("touchend",this.onTouchEnd,this);
        minus.interactive=true;
        this.addChild(minus);*/

        this.lastKeyPressed = new Text ("Waiting...",{fontSize: 48});
        this.lastKeyPressed.anchor.set(3.2);
        this.lastKeyPressed.position.set(950,830);
        this.addChild(this.lastKeyPressed);
    }
           
        private onButtonClick():void
        {
            console.log("My new button clicked!", Keyboard.state.get("KeyA"));
        }
        
        private onTouchStart():void
        {  
            console.log("touch down");
        }
        private onTouchEnd():void
        {  
            console.log("touch up");
        }
          
    
    } 