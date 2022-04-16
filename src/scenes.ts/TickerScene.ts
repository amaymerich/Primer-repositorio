import { AnimatedSprite, Container, Texture} from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { PhysicsContainer } from "../game/PhysicsContainer";
import { IUpdateable } from "./IUpdateable";


export class TickerScene extends Container implements IUpdateable
{
    private ninjaAnimated: AnimatedSprite;
    private physNinja: PhysicsContainer;
    
    constructor()
    {
        super();
   
        this.ninjaAnimated = new AnimatedSprite
        (
            [
                Texture.from("N_Run"),
                Texture.from("N_Run1"),
                Texture.from("N_Run2"),
                Texture.from("N_Run3"),
                Texture.from("N_Run4"),
                Texture.from("N_Run5"),
                Texture.from("N_Run6"),
                Texture.from("N_Run7"),
                Texture.from("N_Run8"),
                Texture.from("N_Run9")

            ],
            false
        );
        this.ninjaAnimated.scale.set(0.5);
        this.ninjaAnimated.position.set(0,0);
        this.ninjaAnimated.play();
        this.ninjaAnimated.anchor.set(0.5,1);
        this.ninjaAnimated.animationSpeed=0.2;

        this.physNinja= new PhysicsContainer();
        this.physNinja.speed.x = 250;
        this.physNinja.speed.y = 0;
        this.physNinja.acceleration.y=400;
        this.addChild(this.physNinja);

       /* const auxZero= new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(50,50,10);
        auxZero.endFill();
        this.physNinja.addChild(auxZero);*/
        this.physNinja.addChild(this.ninjaAnimated);
        
    }

    public update(deltaTime:number, deltaFrame: number): void {
        this.ninjaAnimated.update(deltaFrame);//actualiza animacion
        //craftea delta del tiempo en segundos
        const dt = deltaTime/1000;
         //Actualizaciones físicas
        this.physNinja.update(dt);
       //Límite horizontal
        if(this.physNinja.x>WIDTH)
        {
            //límite derecha
            this.physNinja.x=WIDTH;
            this.physNinja.speed.x= Math.abs(this.physNinja.speed.x)*-1;
            this.physNinja.scale.x=-1;

            this.ninjaAnimated.tint=0xFF00FF;

        }else if (this.physNinja.x<0){
            //límite izquierda 
            this.physNinja.x=0;
            this.physNinja.speed.x=Math.abs(this.physNinja.speed.x);
            this.physNinja.scale.x=1;
            this.ninjaAnimated.tint=0xFF0000;
        }
        //límite vertical
        if(this.physNinja.y> HEIGHT)
        {
            this.physNinja.y=HEIGHT;
            this.physNinja.speed.y=-800*Math.random();
            this.ninjaAnimated.tint=0x00FF00;
        }
      
        
    }

}