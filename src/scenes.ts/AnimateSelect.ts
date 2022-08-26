import { Sprite, TextStyle, Texture, Text } from "pixi.js";
import { Tween } from "tweedle.js";
import { GameState } from "../game/GameState";
import { Button } from "../ui/Button";
import { SceneBase } from "../UIDemo/SceneBase";
import { SceneManager } from "../UIDemo/SceneManager";
import { AnimationBoy } from "./AnimationBoy";
import { AnimationGirl } from "./AnimationScene_Girl";


export class ScenePlayerSelect extends SceneBase {

    public static PLAY_SELECT: number;
    private buttonGirl: Button;
    private buttonBoy: Button;
    private playerBoy: AnimationBoy;
    private playerGirl: AnimationGirl;
    private namePlayer: Text;
    private nameTextStyle: TextStyle;
    private tituloElige: Sprite;

    constructor(){
        super();

        const fondo= Sprite.from("FondoUI");

        this.tituloElige= Sprite.from("TituloElige");
        this.tituloElige.scale.set(0.5);
        this.tituloElige.anchor.set(0.5);
        this.tituloElige.position.set(SceneManager.WIDTH/2, this.tituloElige.height/1.5);

        this.nameTextStyle = new TextStyle({
            align: "center",
            dropShadow: true,
            dropShadowAlpha: 0.8,
            dropShadowAngle: -3.5,
            dropShadowBlur: 3,
            dropShadowDistance: 2,
            fill: "red",
            fontFamily: "BowlCap",
            fontSize: 55,
            lineJoin: "round",
            lineHeight: 22,
            wordWrap: false
        })
        this.namePlayer = new Text('Dale un nombre', this.nameTextStyle);
        this.namePlayer.position.set(this.tituloElige.position.x * 0.7, this.tituloElige.position.y + 130)

    
        this.buttonGirl = new Button(
            Texture.from("marcoPlayer"),
            Texture.from("marcoPlayerPress"),
            Texture.from("marcoPlayer"),
            );
        this.buttonGirl.on("buttonClick",this.onButtonBeckyClick, this);
        this.buttonGirl.position.x =  this.buttonGirl.width * 4.5;
        this.buttonGirl.position.y = this.tituloElige.position.y + 250;
        this.buttonGirl.scale.set(2.2);
        this.buttonGirl.interactive= true;
        this.buttonGirl.buttonMode= true;

        this.buttonBoy = new Button(
            Texture.from("marcoPlayer"),
            Texture.from("marcoPlayerPress"),
            Texture.from("marcoPlayer"),
            );
        this.buttonBoy.on("buttonClick",this.onButtonTimmyClick, this);
        this.buttonBoy.position.x = this.buttonGirl.position.x + this.buttonGirl.width * 1.5;
        this.buttonBoy.position.y = this.tituloElige.position.y + 250;
        this.buttonBoy.scale.set(2.2);
        this.buttonBoy.interactive= true;
        this.buttonBoy.buttonMode= true;

        this.playerBoy = new AnimationBoy(0.5, "idle");
        this.playerBoy.x = this.buttonBoy.position.x + this.buttonBoy.width* 3/4;
        this.playerBoy.y = this.buttonBoy.position.y + this.buttonBoy.height/8;
        this.playerBoy.scale.set(-0.55,0.55);

        this.playerGirl = new AnimationGirl(0.5, "idle");        
        this.playerGirl.x = this.buttonGirl.position.x + this.buttonGirl.width/3;
        this.playerGirl.y = this.buttonGirl.position.y + this.buttonGirl.height/7;
        this.playerGirl.scale.set(0.5);


        this.addChild(fondo, this.tituloElige, this.namePlayer, this.buttonGirl, this.buttonBoy, this.playerBoy, this.playerGirl);
    }
    async onButtonEditClick() {
        let nombre = prompt("Ingresa un nombre");
        const nameObj = {nombre};
        sessionStorage.setItem("name", JSON.stringify(nameObj));
        this.removeChild(this.namePlayer);
        this.namePlayer = new Text(JSON.stringify(nombre), this.nameTextStyle);
        this.namePlayer.position.set(this.tituloElige.position.x * 0.7, this.tituloElige.position.y + 130);
        this.addChild(this.namePlayer);
    }


    onButtonTimmyClick() {

        this.playerBoy.scale.set(0.55);
        
        this.playerBoy.setState("run", 0.5, true);
        new Tween(this.playerBoy)
            .to({x: this.playerBoy.x + 40},700)
            .start()
            .onComplete(()=>{
                this.playerBoy.setState("jump", 0.3, false);
                new Tween(this.playerBoy)
                    .to({x: this.playerBoy.x + 150, y: this.playerBoy.y + 300},800)
                    .start()
                    .onComplete(()=>{
                        this.playerBoy.setState("run", 0.5, true);
                        new Tween(this.playerBoy)
                            .to({x: SceneManager.WIDTH + this.playerBoy.width},2000)
                            .start()
                            .onComplete(()=>{
                                GameState.IS_PAUSED = false;
                                ScenePlayerSelect.PLAY_SELECT = 1;
                                //SceneManager.changeScene(new Environment());
                            });
                    });
        });
        
    }


    onButtonBeckyClick() {
              
        this.playerGirl.setState("walk", 0.5, true);
        new Tween(this.playerGirl)
            .to({x: this.playerGirl.x + 40},700)
            .start()
            .onComplete(()=>{
                this.playerGirl.setState("jump", 0.3, false);
                new Tween(this.playerGirl)
                    .to({x: this.playerGirl.x + 150, y: this.playerGirl.y + 300},800)
                    .start()
                    .onComplete(()=>{
                        this.playerGirl.setState("run", 0.5, true);
                        new Tween(this.playerGirl)
                            .to({x: SceneManager.WIDTH + this.playerGirl.width},2000)
                            .start()
                            .onComplete(()=>{                        
                                ScenePlayerSelect.PLAY_SELECT = 0;
                                GameState.IS_PAUSED = false;
                                //SceneManager.changeScene(new Environment());
                            });
                    });
        });
    }

    public update()
    {
    }
}