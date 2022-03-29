import { Container, Sprite, Texture, Text} from "pixi.js";
import { Buttons } from "./gameButtons";
import { Keyboard } from "./Keyboard";


export class gameButtons extends Container{
    private buttonMenu: Buttons;
    private lastKeyPressed:Text;

    constructor(){
        super();
        
        this.buttonMenu=new Buttons (Texture.from("R7"),Texture.from("R7down"),Texture.from("R7out"),this.onButtonClick.bind(this));
        this.buttonMenu.on("buttonClick",this.onButtonClick);

        this.buttonMenu.interactive=true;
        this.addChild(this.buttonMenu);
        
        
        const buttonOk: Sprite = Sprite.from("R6");
        buttonOk.scale.set(3.2);
        buttonOk.position.set(600,525);
        buttonOk.on("touchstart",this.onTouchStart,this);
        buttonOk.on("touchend",this.onTouchEnd,this);
        buttonOk.interactive=true;
        this.addChild(buttonOk);

        const buttonBack: Sprite = Sprite.from("R5");
        buttonBack.scale.set(3.2);
        buttonBack.position.set(740,525);
        buttonBack.on("pointerdown",this.onPointerDown,this);
        buttonBack.on("pointerup",this.onPointerUp,this);
        buttonBack.interactive=true;
        this.addChild(buttonBack);

        this.lastKeyPressed = new Text ("Waiting...",{fontSize: 48});
        this.lastKeyPressed.anchor.set(3.2);
        this.lastKeyPressed.position.set(950,830);
        this.addChild(this.lastKeyPressed);
        
       /* document.addEventListener("keydown",this.onKeyDown.bind(this));
        document.addEventListener("keyup",this.onKeyUp.bind(this));
        */
    }
    /*private onKeyDown(event:KeyboardEvent):void{
        console.log("key pressed!",event.code);
        this.lastKeyPressed.text=event.code;
        if(event.code=="KeyA"){
            console.log("apretamos la A!")
        }
    }
    private onKeyUp(event:KeyboardEvent):void{
        console.log("key released!",event.code);
    }*/

    private onButtonClick():void{
        console.log("My new button clicked!", Keyboard.state.get("KeyA"));
    }
    
    private onTouchStart():void{  
        console.log("touch down");
    }
    private onTouchEnd():void{  
        console.log("touch up");
    }
    private onPointerDown():void{  
        console.log("pointer down");
    }
    private onPointerUp():void{  
        console.log("pointer up");
    }

    
}