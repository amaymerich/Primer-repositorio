import { Container, Sprite, Texture } from "pixi.js";
import { Button } from "../ui/Button";
import { ToggleButton } from "../ui/ToggleButton";
import { SceneBase } from "../UIDemo/SceneBase";
import { SceneManager } from "../UIDemo/SceneManager";
import { MenuConfig } from "./Menu";
import { SoundScene } from "./SoundScene";


export class StartMenu extends SceneBase {
    
    private buttonExit:Button;
    private buttonConfig:Button;
    private buttonRight:Button;
    public static CORTINA: SoundScene;

         
    
    constructor(){
        super();
        const dialog = new Container();

        const fondo= Sprite.from("FondoUI");

        const tituloGame= Sprite.from("TituloGame");
        tituloGame.scale.set(0.5);
        tituloGame.anchor.set(0.5);
        tituloGame.position.set(SceneManager.WIDTH/2, tituloGame.height/1.5);

        

        this.buttonRight = new Button(
            Texture.from("buttoncomenzar"),
            Texture.from("buttoncomenzarPress"),
            Texture.from("buttoncomenzar"),
            );
        this.buttonRight.on("buttonClick",this.onButtonRightClick, this);
        this.buttonRight.position.set(0);
        this.buttonRight.scale.set(0.3);
        this.buttonRight.interactive= true;
        this.buttonRight.buttonMode= true;

        this.buttonConfig = new Button(
            Texture.from("options"),
            Texture.from("optionsPress"),
            Texture.from("options"),
            );
        this.buttonConfig.on("buttonClick",this.onButtonConfigClick, this);
        this.buttonConfig.position.y = this.buttonRight.height * 0.3 + 80;
        this.buttonConfig.scale.set(0.3);
        this.buttonConfig.interactive= true;
        this.buttonConfig.buttonMode= true;
        
        this.buttonExit = new Button(
            Texture.from("exit"),
            Texture.from("exitPress"),
            Texture.from("exit"),
            );
        this.buttonExit.on("buttonClick",this.onButtonExitClick, this);
        this.buttonExit.position.y = this.buttonConfig.position.y + this.buttonRight.height * 0.3 + 80;
        this.buttonExit.scale.set(0.3);
        this.buttonExit.interactive= true;
        this.buttonExit.buttonMode= true;
        
        dialog.position.x = tituloGame.position.x * 3/4;
        dialog.position.y = tituloGame.position.y * 2.5;
        dialog.addChild(this.buttonRight, this.buttonConfig, this.buttonExit);
        
        StartMenu.CORTINA = new SoundScene()
        SceneManager.addScene(StartMenu.CORTINA);

        const toggleMute = new ToggleButton(Texture.from("MusicOn"), Texture.from("MusicOff"));
        toggleMute.position.set(dialog.position.x * 2, tituloGame.position.y * 4);
        toggleMute.scale.set(2);
        toggleMute.on(ToggleButton.TOGGLE_EVENT, this.toggleMute, this);

        
        this.addChild(fondo, tituloGame, dialog, toggleMute);
        
    }
    onButtonRightClick():void {
        SceneManager.changeScene(new ScenePlayerSelect());
    }

    onButtonExitClick():void {
        
    }

    private onButtonConfigClick():void {
        let menuConfig = new MenuConfig();
        menuConfig.position.set(SceneManager.WIDTH * 1/3, SceneManager.HEIGHT * 1/7);
        this.addChild(menuConfig);
        
    }

    public toggleMute(unMute:boolean) {
        if (unMute) 
        {
            StartMenu.CORTINA.unMute();
        }else
        {
            StartMenu.CORTINA.mute();
        }
    }

    
    public update(): void {
    }

}