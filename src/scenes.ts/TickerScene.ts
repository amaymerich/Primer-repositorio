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

    constructor()
    {
        super();
        this.playerNinja = new Player();
        this.addChild(this.playerNinja);       


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

    public update(deltaTime:number, _deltaFrame: number): void {

        this.playerNinja.update(deltaTime);//actualiza animacion
      
        for (let platform of this.platforms) 
        {
            const overlap = checkCollision(this.playerNinja, platform);
            if (overlap != null)
            {
                this.playerNinja.separate(overlap, platform.position);
            }
        }

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
}}
