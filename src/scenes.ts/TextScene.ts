import { BitmapText, Container, Text, TextStyle } from "pixi.js";


export class TextScene extends Container {
    private t: Text;
    private bt: BitmapText;
    
    constructor() 
    {
        super();
        const scaleAux = new Container();
        scaleAux.scale.set(50);
        this.addChild(scaleAux);

        const tStyle = new TextStyle({
            align: "center",
            fill: "#1b0ced",
            fontFamily: "br",
            fontSize: 15,
        })
        
        this.t= new Text ("Hola Mundo!",tStyle);
        this.t.style.fill= "blue";
        scaleAux.addChild(this.t);

        
        // Mi bitmapfont
        this.bt = new BitmapText("Hola Mundo! + ♪ 🤣", {fontName:"Mi BitmapFont",fontSize: 15});
        this.bt.y = this.t.height;
        scaleAux.addChild(this.bt);

        // desyrel
        const desyrel = new BitmapText("Hola Mundo! ++ ♪ 🤣", {fontName:"Mi BitmapFont",fontSize: 15});
        desyrel.y = 0;
        scaleAux.addChild(desyrel);

        // super text
        const Dyna = new BitmapText("Hola Mundo! +++ ♪", {fontName:"DynaPuff-Bold",fontSize: 50});
        Dyna.y = desyrel.y + desyrel.height;
        scaleAux.addChild(Dyna);
    }


    public update()
    {
        //this.t.text= Math.random().toString();
    }

} 