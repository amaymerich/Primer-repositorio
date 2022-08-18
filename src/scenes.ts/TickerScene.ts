import { Container, Texture, TilingSprite} from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { checkCollision } from "../game/IHitbox";
import { Platform } from "../game/Platform";
import { Player } from "../game/Player";
import { IUpdateable } from "./IUpdateable";



export class TickerScene extends Container implements IUpdateable
{
    private playerNinja: Player;
    
    private platforms:Platform[];

    private world:Container;
    private background: TilingSprite;

    private gameSpeed:number=0;//300

    private timePassed:number=0;

    constructor()
    {
        super();
        this.playerNinja = new Player();
        this.addChild(this.playerNinja);       

        //pegamos al mundo lo que queremos que se mueva 
        this.world = new Container();

        this.background = new TilingSprite(Texture.from("F1"), WIDTH, HEIGHT);
        this.addChild(this.background);

        this.platforms = [];

        let plat = new Platform()
        plat.position.set(150,700);
        this.world.addChild(plat);
        this.platforms.push(plat);

        plat = new Platform()
        plat.position.set(1000,600);
        this.world.addChild(plat);
        this.platforms.push(plat);

        plat = new Platform()
        plat.position.set(1800,500);
        this.world.addChild(plat);
        this.platforms.push(plat);

        plat = new Platform()
        plat.position.set(-500,700);
        this.world.addChild(plat);
        this.platforms.push(plat);

        this.playerNinja = new Player();
        this.playerNinja.x = 300;
        this.playerNinja.y = 300;
        this.world.addChild(this.playerNinja);

       this.addChild(this.world);

    }

    public update(deltaTime:number, _deltaFrame: number): void 
    {
        this.timePassed+= deltaTime;

        if(this.timePassed> (7000*100/this.gameSpeed))
        {
            this.gameSpeed += 50;
            this.timePassed=0;
            const plat = new Platform()
            plat.position.set(WIDTH,Math.random()*900);
            this.world.addChild(plat);
            this.platforms.push(plat);
        }
        

        this.playerNinja.update(deltaTime);//actualiza animacion
      
        for (let platform of this.platforms) 
        {
            platform.speed.x=-this.gameSpeed;
            platform.update(deltaTime/1000);
            const overlap = checkCollision(this.playerNinja, platform);
            if (overlap != null)
            {
                this.playerNinja.separate(overlap, platform.position);
            }

            if(platform.getHitbox().right<0)
            {
                platform.destroy();
            }
        }


        this.platforms=this.platforms.filter((elem)=>!elem.destroyed);
        console.log(this.platforms.length);
        this.background.tilePosition.x-=this.gameSpeed*deltaTime/1000;

       //Límite horizontal
        if(this.playerNinja.x>WIDTH)
        {
            //límite derecha
            this.playerNinja.x=WIDTH;            
        }else if (this.playerNinja.x<0)
        {
            //límite izquierda 
            this.playerNinja.x=0;
        }
        //límite vertical
       /* if(this.playerNinja.y> HEIGHT)
        {
            //abajo
            this.playerNinja.y=HEIGHT; 
            this.playerNinja.canJump=true;           
        }*/

        //Línea que mueve el mundo
       // this.world.x= - this.playerNinja.x*this.worldTransform.a + WIDTH/4;
        this.background.tilePosition.x -= this.gameSpeed * deltaTime/100;

        //this.world.y= - this.playerNinja.y*this.worldTransform.d + HEIGHT/2;
        //this.background.tilePosition.y=this.world.y*0.5;
    
    }
}
