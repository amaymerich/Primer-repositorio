import { AnimatedSprite, Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { Keyboard } from "../UIDemo/Keyboard";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsConyainer";

export class Player extends PhysicsContainer implements IHitbox
{
    private static readonly GRAVITY=350;
    private static readonly MOVE_SPEED=350;
    public canJump= true;
    private PlayerNinja: AnimatedSprite;
    private hitbox: Graphics;

    constructor()
    {
        super();
        
        this.PlayerNinja = new AnimatedSprite
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
        this.PlayerNinja.scale.set(0.6);
        this.PlayerNinja.position.set(0,0);
        this.PlayerNinja.play();
        this.PlayerNinja.anchor.set(0.5,1);
        this.PlayerNinja.animationSpeed=0.2;
        
        this.addChild(this.PlayerNinja);

        const auxZero= new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(50,50,10);
        auxZero.endFill();
        this.addChild(auxZero);


        this.hitbox= new Graphics();
        this.hitbox.beginFill(0xFF001FF,0.3);
        this.hitbox.drawRect(0,0,315,425);
        this.hitbox.endFill();
        this.hitbox.position.set(-145,-440);
        this.PlayerNinja.addChild(this.hitbox);

        this.acceleration.y=Player.GRAVITY;
        Keyboard.down.on("ArrowUp",this.jump,this);
    }

    public override destroy(options:any){
        super.destroy(options);
        Keyboard.down.off("ArrowUp", this.jump);
    }
 
    public override update(deltaMS:number)
    {
        super.update(deltaMS/1000);
        this.PlayerNinja.update(deltaMS / (1000/60));
        

        if (Keyboard.state.get("ArrowRight"))
        {
            this.speed.x = Player.MOVE_SPEED;  
            this.PlayerNinja.scale.x=0.6;
        }else if (Keyboard.state.get("ArrowLeft"))
        {
            this.speed.x=-Player.MOVE_SPEED;
            this.PlayerNinja.scale.x=-0.6;
        }else{
            this.speed.x=0;
        }
        
   }
   private jump()
   {if(this,this.canJump)
    {
        this.canJump=false;
        this.speed.y=-550;
    }}

    public getHitbox(): Rectangle
    {
        //Distancia desde el 0 , 0 del mundo 
        return this.hitbox.getBounds()
    }
    
    public separate(overlap: Rectangle, platform: ObservablePoint<any>) {
        if(overlap.width<overlap.height)
        {
            if(this.x > platform.x)
            {
                this.x += overlap.width;
            }else if (this.x < platform.x)
            {
                this.x -= overlap.width;
            }
        }
        else
        {
            if(this.y>platform.y)
            {
                this.y -= overlap.height;
                this.speed.y=0;
                this.canJump=true;
            }else if (this.y < platform.y)
            {
                this.y -= overlap.height;
            }
        }
    }
    

}

