import { Container, Sprite } from "pixi.js";

export class gameBoard extends Container{
    constructor()
    {
        super();
        const plank: Sprite = Sprite.from("R16");
        plank.scale.set(3);
        plank.position.set(450,60);
        this.addChild(plank);

        const plank2: Sprite = Sprite.from("R18");
        plank2.scale.set(3);
        plank2.position.set(450,200);
        this.addChild(plank2);

        const plank3: Sprite = Sprite.from("R19");
        plank3.scale.set(3);
        plank3.position.set(450,345);
        this.addChild(plank3);
        
        const plank4: Sprite = Sprite.from("R21");
        plank4.scale.set(3);
        plank4.position.set(450,495);
        this.addChild(plank4);

        const sheet: Sprite = Sprite.from("R15");
        sheet.scale.set(3);
        sheet.position.set(470,85);
        this.addChild(sheet);


    }
}
