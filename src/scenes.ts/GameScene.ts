import { Container, Texture, TilingSprite } from "pixi.js";
import { Player } from "../game/Player";
import { IUpdateable } from "../UIDemo/IUpdateable";
import { Platform } from "../game/Platform";
import { checkCollision } from "../game/IHitbox";
import { Obstacles } from "./Obstacles";
import { HUD } from "./HUD";
import { GameState } from "../game/GameState";
import { sound } from "@pixi/sound";
import { GameOverDialog } from "./GameOverDialog";
import { SceneBase } from "../UIDemo/SceneBase";
import { Saw } from "../game/Saw";
import { Environment } from "./Environment";
import { SceneManager } from "../UIDemo/SceneManager";
import { Acid } from "../game/Acid";
import { GodrayFilter } from "@pixi/filter-godray";


export class GameScene extends SceneBase implements IUpdateable{
    
    private hud: HUD;

    public static GAME_SPEED_BASE = 0;
    public static FLOOR_LEVEL = 950;

    private SelectedPlayer: Player;
    private Saw: Saw;
    private objeto: Environment;   
    private obstacle: Obstacles;
    private gameOverDialog: GameOverDialog;

    private Saws:Saw[];    
    private obstacles: Obstacles[];
    private platforms:Platform[];
    private acids:Acid[];
    private entorno: Environment[];    
    private background0: TilingSprite[];
    private background1: TilingSprite[];
    
            
    private world: Container;
    private fondoVariable: Container;
    
    private timeCount = 0;
    private timePassedObject = 0;
    private timePassedObstacle = 0;
    

    private segEnvir= 4600 * 100;//
    private segObstacle= 5500 * 100;//
    
    private myGodray = new GodrayFilter();
    
       

    constructor(){

        super();

        this.world = new Container();
        this.fondoVariable = new Container();
        this.gameOverDialog = new GameOverDialog();
        
        this.background0 = [];
        this.background1 = [];
        
        
        for (let i = 4; i > 2; i--) {
			const aux = new TilingSprite(
				Texture.from("Background " + i),
				SceneManager.WIDTH,
				SceneManager.HEIGHT
			);
			this.addChild(aux);
			this.background0.push(aux);
		}

        for (let i = 2; i > -1; i--) {
			const aux = new TilingSprite(
				Texture.from("Background " + i),
				SceneManager.WIDTH,
				SceneManager.HEIGHT
			);
			this.addChild(aux);
			this.background1.push(aux);
		}

        this.platforms = []; 
        this.entorno = [];        
        this.acids = [];
        this.Saws = [];
        this.obstacles = [];
                
        this.obstacle = new Obstacles(0);

        this.objeto = new Environment(0);

                this.world.addChild(this.fondoVariable);
    
        let plat0_00 = new Platform("Platform/Tiles/BGTile (6).png")
        plat0_00.position.set(-plat0_00.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat0_00);
        this.platforms.push(plat0_00);

        let plat0_01 = new Platform("Platform/Tiles/BGTile (4).png")
        plat0_01.position.set(-plat0_00.width,GameScene.FLOOR_LEVEL - plat0_00.height);
        this.world.addChild(plat0_01);
        this.platforms.push(plat0_01);
        
        let plat0_02 = new Platform("Platform/Tiles/BGTile (3).png")
        plat0_02.position.set(-plat0_00.width,GameScene.FLOOR_LEVEL - plat0_02.height*2);
        this.world.addChild(plat0_02);
        this.platforms.push(plat0_02);

        let plat0_03 = new Platform("Platform/Tiles/BGTile (5).png")
        plat0_03.position.set(-plat0_00.width,GameScene.FLOOR_LEVEL - plat0_02.height*3);
        this.world.addChild(plat0_03);
        this.platforms.push(plat0_03);

        let plat0_0 = new Platform("Platform/Tiles/Tile (15).png")
        plat0_0.position.set(0,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat0_0);
        this.platforms.push(plat0_0);

        let Barrel = this.objeto;
        Barrel.position.set(550, GameScene.FLOOR_LEVEL - Barrel.height);
        this.world.addChild(Barrel);
        this.entorno.push(Barrel);

        this.Saw = new Saw();
        this.Saw.position.set(550,100);
        this.world.addChild(this.Saw);
        this.Saw.push(this.Saw);
 
        let acid = new Acid();        
        acid.position.set(plat0_02.position.x + 2 * (plat0_0.width) - 10, GameScene.FLOOR_LEVEL + 30);
        this.world.addChild(acid);
        this.acids.push(acid);

        this.SelectedPlayer = new Player();
        this.SelectedPlayer.x = 50;
        this.SelectedPlayer.y = GameScene.FLOOR_LEVEL - plat0_0.height * 4;
        this.SelectedPlayer.scale.set(0.5);
        this.world.addChild(this.SelectedPlayer);

        this.hud = new HUD();

       // this.addChild(this.world);
        //this.addChild(this.hud);

        
        this.myGodray.parallel = false;
        this.myGodray.center = [0, -50];

        sound.find("victory");            
    
    }
    
    
    update(deltaTime: number, _deltaMS: number): void {
        if(GameState.IS_PAUSED){
            GameScene.GAME_SPEED_BASE = 0;
            return;
        }
        
        if(GameState.PLAY){
            GameScene.GAME_SPEED_BASE = 100;
            this.timeCount += deltaTime;
            this.hud.update(this.timeCount);
        }
                
        if (GameState.GAME_OVER) {
            GameState.PLAY = false;
            GameScene.GAME_SPEED_BASE = 0;            
            this.gameOverDialog.position.set(SceneManager.WIDTH * 1/4, SceneManager.HEIGHT * 1/6);
            this.hud.addChild(this.gameOverDialog);
            return; 
        }


         if (this.SelectedPlayer.position.x < (SceneManager.WIDTH * 1/12)) {
            this.SelectedPlayer.position.x = SceneManager.WIDTH * 1/12;            
        }/*elseif (this.playerNinix.position.x < 0) {
            this.playerNinix.position.x = 0;
        } */ 
        if (this.SelectedPlayer.position.y > (SceneManager.HEIGHT - 280)) {
            this.SelectedPlayer.position.y = SceneManager.HEIGHT - 280;            
        }

        /* const diff = (GameScene.GAME_SPEED_BASE / 1000) + 5;
		const adjustedSpeed = GameScene.GAME_SPEED_BASE * diff;*/

        for (let i = 0; i < this.background0.length; i++) {
			const background = this.background0[i];
			const factor = i / 4;
			background.tilePosition.x -= /* adjustedSpeed * */ factor * deltaTime / 100000;
		}

        for (let i = 0; i < this.background1.length ; i++) {
			const background = this.background1[i];
			const factor = (i+1)/ 4;
            
			background.tilePosition.x -= /* adjustedSpeed * */ factor * deltaTime / 5000;
		}      
        
        this.SelectedPlayer.update(deltaTime);
        
    
        for (let platform of this.platforms) {
            //platform.speed.x = -GameScene.GAME_SPEED_BASE;
            platform.update(deltaTime/1000);
            const overlap = checkCollision(this.SelectedPlayer, platform);
            if (overlap != null)
            {
                this.SelectedPlayer.separate(overlap, platform.position);
            }

            if (platform.getHitbox().right < 0){
                platform.destroy();

            }
        }

        this.platforms = this.platforms.filter((elem)=> !elem.destroyed);


        for (let agua of this.acids) {
            //agua.speed.x = -GameScene.GAME_SPEED_BASE;
            agua.update(deltaTime/1000);
            const overlap = checkCollision(this.SelectedPlayer, agua);
            
            if (overlap != null)
            {
                this.SelectedPlayer.separate(overlap, agua.position);
                if(this.SelectedPlayer.canJump){
                    this.SelectedPlayer.takeDamage(agua.makeDamage());
                }
                this.hud.gatherDamagePlayer(0);
                
                
            }

            if (agua.getHitbox().right < 0){
                agua.destroy();

            }
        }

       this.acids = this.acids.filter((elem)=> !elem.destroyed);


        let timeObstacle = this.segObstacle/GameScene.GAME_SPEED_BASE;
        let timeEnvironment = this.segEnvir/GameScene.GAME_SPEED_BASE;
               
        this.timePassedMosquito += deltaTime;
        this.timePassedSnake += deltaTime;
        this.timePassedObject += deltaTime;
        this.timePassedObstacle += deltaTime;

                        
        for (let snake of this.Saws) {
             snake.speed.x = -GameScene.GAME_SPEED_BASE * 1.5;
             snake.update(deltaTime/1000);
             const overlap = checkCollision(this.SelectedPlayer, snake);
             
             if (overlap != null)
             {
                 this.SelectedPlayer.separate(overlap, snake.position);
                 if(this.SelectedPlayer.canJump){
                     this.SelectedPlayer.takeDamage(snake.makeDamage());
                 }
                 this.hud.gatherDamagePlayer(this.SelectedPlayer.getCurrentHealth());
                 
                 
             }
 
             if (snake.getHitbox().right < 0){
                 snake.destroy();
 
             }
         }
 
        this.Saws = this.Saws.filter((elem)=> !elem.destroyed);

        this.Saw.update(deltaTime);

        if(this.timePassedObstacle > timeObstacle){
                            
            this.timePassedObstacle =0;
            let obstacle = new Obstacles(Math.trunc((Math.random()*10)) % 3);
            obstacle.position.set(this.SelectedPlayer.position.x + 1500, GameScene.FLOOR_LEVEL - obstacle.height);
            this.fondoVariable.addChild(obstacle);
            this.obstacles.push(obstacle);
        }
        
        for (let obstacle of this.obstacles){
            //obstacle.speed.x = -GameScene.GAME_SPEED_BASE;
            obstacle.update(deltaTime/1000);
            const overlap = checkCollision(this.SelectedPlayer, obstacle);
            if (overlap != null)
            {
                this.SelectedPlayer.separate(overlap, obstacle.position);
            }

            if (obstacle.getHitbox().right < 0){
                obstacle.destroy();
            }
        }

        if(this.timePassedObject > timeEnvironment){
               
            this.timePassedObject =0;   
            let objeto = new Environment(Math.trunc((Math.random()*10)) % 3);
            objeto.position.set(this.SelectedPlayer.position.x + 1600, GameScene.FLOOR_LEVEL - objeto.height );                        
                     
            this.fondoVariable.addChild(objeto);
            this.entorno.push(objeto);
            
        }
        
        for (let objeto of this.entorno) {
            //objeto.speed.x = -GameScene.GAME_SPEED_BASE;
            objeto.update(deltaTime/1000);
        }

        this.obstacle.update(deltaTime);
        
        this.obstacles = this.obstacles.filter((elem)=> !elem.destroyed);
        this.entorno = this.entorno.filter((elem)=> !elem.destroyed);


        
        this.world.x = - this.SelectedPlayer.x * this.worldTransform.a + SceneManager.WIDTH/6,5;
        
        //this.background.tilePosition.x -= TickerScene.GAME_SPEED_BASE * deltaTime/1500;
        
        

        //this.world.y = - this.playerNinix.y * this.worldTransform.d + SceneManager.HEIGHT/2;

    }


}