import { AnimatedSprite, Container, Texture} from "pixi.js";
import { PhysicsContainer } from "../game/PhysicsConyainer";
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
                Texture.from("dvd"),
              
            ],
            false
        );
        this.ninjaAnimated.scale.set(0.4);
        this.ninjaAnimated.position.set(150,230);
        this.ninjaAnimated.play();
        this.ninjaAnimated.anchor.set(0.5,1);
        this.ninjaAnimated.animationSpeed=0.5;

        this.physNinja= new PhysicsContainer();
        this.physNinja.speed.x = 400;
        this.physNinja.speed.y = 0;
        this.physNinja.acceleration.y=70;
        this.addChild(this.physNinja);

        this.physNinja.addChild(this.ninjaAnimated);
        
    }

    public update(deltaTime:number, deltaFrame: number): void {
        this.ninjaAnimated.update(deltaFrame);//actualiza animacion
        //craftea delta del tiempo en segundos
        const dt = deltaTime/1000;
         //Actualizaciones físicas
        this.physNinja.update(dt);
       //Límite horizontal
        if(this.physNinja.x>1600)
        {
            //límite derecha
            this.physNinja.x=1600;
            this.physNinja.speed.x= Math.abs(this.physNinja.speed.x)*-1;
            
            this.ninjaAnimated.tint=0xFF00FF;

        }else if (this.physNinja.x<0){
            //límite izquierda 
            this.physNinja.x=0;
            this.physNinja.speed.x=Math.abs(this.physNinja.speed.x);
            this.ninjaAnimated.tint=0xFF0000;
        }
        //límite vertical
        if(this.physNinja.y>850)
        {
            //abajo
            this.physNinja.y=850;
            this.physNinja.speed.y= Math.abs(this.physNinja.speed.y)*-1;
            this.ninjaAnimated.tint=0x00FF00;

        }else if (this.physNinja.y<50){
            //arriba
            this.physNinja.y=50;
            this.physNinja.speed.y=Math.abs(this.physNinja.speed.y);
            this.ninjaAnimated.tint=0x6495ed;
        }
      
        
    }

}