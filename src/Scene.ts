import { AnimatedSprite, Container, Graphics, Texture, Text} from "pixi.js";
import { MinionBall } from "./MinionBall";

export class Scene extends Container
{
    constructor()
    {
        super();
       const minionWidthBall: MinionBall = new MinionBall();
	    minionWidthBall.scale.set(1);
        minionWidthBall.x=250;
        minionWidthBall.y=170;
        minionWidthBall.angle=30;
        this.addChild(minionWidthBall);
	    
        

        const minionAnimated: AnimatedSprite = new AnimatedSprite
        (
            [
                Texture.from("Mario1"),
                Texture.from("Mario2"),
                Texture.from("Mario3"),
                Texture.from("Mario4"),
                Texture.from("Mario5"),
                Texture.from("Mario6"),
                Texture.from("Mario9")
            ], 
            true
        );  
        minionAnimated.play();
        minionAnimated.animationSpeed=0.1;
        minionAnimated.scale.set(0.1);
        minionAnimated.position.set(100,100);
        this.addChild(minionAnimated);

        const myGraph: Graphics = new Graphics();
        myGraph.lineStyle({color:0xFF00FF, width: 10, alpha:1})
        myGraph.moveTo(0,0);
        myGraph.lineTo(300,500);
        myGraph.lineTo(300,100);
        myGraph.lineTo(0,0);
        

        myGraph.clear();

        myGraph.lineStyle({color:0xFF00FF, width: 10, alpha:1})
        myGraph.beginFill(0x00FF00,11);
        myGraph.endFill();
        myGraph.drawCircle(100,100,100);
        
        myGraph.position.set(0,0);

        this.addChild(myGraph);

        const myText: Text = new Text ("Hello world",{fontSize: 108, fill: 0xFF0000, fontFamily: "Comic Sans MS"});
        myText.position.set(400,0);
        this.addChild(myText);
    }
}