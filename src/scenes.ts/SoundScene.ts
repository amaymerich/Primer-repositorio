import { sound } from "@pixi/sound";
import { Container, Texture } from "pixi.js";
import { Button } from "../ui/Button";
import { IUpdateable } from "./IUpdateable";


export class SoundScene extends Container implements IUpdateable {

    constructor()
    {
        super();

        sound.play("sound")

        const allCont = new Container();
        this.addChild(allCont);
        allCont.scale.set(3);

        const btnMusicOn = new Button(Texture.from("musicOn"));
        btnMusicOn.position.set(200,150);
        btnMusicOn.on(Button.CLICKED_EVENT, this.musicSound, this);
        allCont.addChild(btnMusicOn);
          
        const btnVolumeUp = new Button(Texture.from("plus"));
        btnVolumeUp.position.set(400,150);
        btnVolumeUp.on(Button.CLICKED_EVENT, this.volumeUp, this);
        allCont.addChild(btnVolumeUp);
       
        const btnVolumeDown = new Button(Texture.from("minus"));
        btnVolumeDown.position.set(400,250);
        btnVolumeDown.on(Button.CLICKED_EVENT, this.volumeDown, this);
        allCont.addChild(btnVolumeDown);

        const toggleMute = new Button(Texture.from("musicOn"), Texture.from("musicOff"));
        toggleMute.position.set(200,250);
        toggleMute.on(Button.CLICKED_EVENT, this.toggleMute, this);
        allCont.addChild(toggleMute);
    }
    public toggleMute(_mute:boolean) {
        /*if (unMute) 
        {
            sound.unmuteAll();
        }else
        {
            sound.muteAll();
        }*/ sound.toggleMuteAll();
    }
    public volumeDown() 
    {
        sound.volumeAll -= 0.05;
        console.log("new volume", sound.volumeAll)
    }
    public volumeUp() 
    {
        sound.volumeAll += 0.05;
        console.log("new volume", sound.volumeAll)
    }
    public musicSound() 
    {
        sound.play("musicOn", 
        {
            loop:true, 
            volume: 0.5,
            singleInstance:true,
        });
    }

    public update(_deltaTime: number, _deltaFrame: number): void {

    }
} 