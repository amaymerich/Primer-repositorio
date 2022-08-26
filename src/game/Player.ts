import { sound } from "@pixi/sound";
import { Graphics, ObservablePoint, Rectangle } from "pixi.js";
import { ScenePlayerSelect } from "../scenes.ts/AnimateSelect";
import { AnimationBoy } from "../scenes.ts/AnimationBoy";
import { AnimationGirl } from "../scenes.ts/AnimationScene_Girl";
import { HUD } from "../scenes.ts/HUD";
import { Keyboard } from "../UIDemo/Keyboard";
import { GameState } from "./GameState";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";


export class Player extends PhysicsContainer implements IHitbox{

    private static readonly GRAVITY = 400;
    private static readonly MOVE_SPEED = 350;
    private static readonly JUMP_SPEED = 400;

    public canJump = true;
    public isJumping = false;
    private ninieAnimated: any;
    private hitbox:Graphics;

    private isDead = false;
    private maxHealth;
    private currentHealth;

    private timePassedWalk=0;

    
    constructor(){
        super();

        
        switch (ScenePlayerSelect.PLAY_SELECT) {
            case 1:
                
                this.ninieAnimated = new AnimationBoy(0.5, "idle");
                
                break;
            case 0:
                
                this.ninieAnimated = new AnimationGirl(0.5, "idle");
                
                break;
        
            default:
                break;
        }
        
        const zero: Graphics = new Graphics();
        zero.beginFill(0xFF00FF);
        zero.drawCircle(0, 0, 10);
        zero.endFill;
        zero.visible = false;
        this.addChild(zero);

        this.maxHealth = 100;
        this.currentHealth = this.maxHealth;

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.3);
        this.hitbox.drawRect(0,0,250,500);
        this.hitbox.endFill();
        this.hitbox.visible = false;
        this.hitbox.x = 0;
        this.hitbox.y = 0;
                              
        this.addChild(this.ninieAnimated);
        
        this.ninieAnimated.addChild(this.hitbox);

        this.acceleration.y = Player.GRAVITY;
      
        switch (GameState.KEYBOARD_CONFIG) {
            case 0:
                                
                Keyboard.down.on("Space", this.jump, this);
                
                break;
            case 1:
             
                Keyboard.down.on("ArrowUp", this.jump, this);                
                
                break;
        
            default:
                break;
        }
               

        sound.find("gameover");
       
    }

    public override destroy(options:any) {
        super.destroy(options);
        Keyboard.down.off("ArrowUp",this.jump);
        Keyboard.down.off("Space",this.jump);
        
    }


    public override update(deltaMS:number)
    {
        
        if(this.isDead){

            sound.unmuteAll();
            this.ninieAnimated.setState("dead", false);          
            GameState.GAME_OVER = true;
            
            sound.play("gameover", {
                loop:false,
                singleInstance:true,
                });

            return;
        }

        super.update(deltaMS/1000);
        
        this.ninieAnimated.update(deltaMS / 1000);

        this.timePassedWalk += deltaMS/1000;
      
        switch (GameState.KEYBOARD_CONFIG) {
            case 0:
                
                if ( Keyboard.state.get("KeyD") || ((HUD.JOYS_DIRECTION == "bottom_right" || HUD.JOYS_DIRECTION == "right") && HUD.JOYS_START)){
                    
                    GameState.PLAY = true;
                                       
                    if (this.canJump)
                    {                        
                        this.speed.x = Player.MOVE_SPEED;
                        this.ninieAnimated.scale.x = 1;                        
                        this.ninieAnimated.setState("walk",true);
                        
                    }
                    
                    if(this.canJump && this.timePassedWalk > 3){
                            
                        this.speed.x = Player.MOVE_SPEED * 1.2;
                        this.ninieAnimated.setState("run",true);                          
                    }       
                    //
        
                }else if ( Keyboard.state.get("KeyA")){
        
                    if (this.canJump)
                    {
                        this.ninieAnimated.scale.x = -1;
                        this.ninieAnimated.setState("walk",true);
        
                    }
                }else{       
                    if(!this.isJumping){
                        this.speed.x = 0;
                        this.timePassedWalk =0;
                        this.ninieAnimated.setState("idle",true);
                    }
                                      
                }

                if ((HUD.JOYS_DIRECTION == "top" || HUD.JOYS_DIRECTION == "top_right") && HUD.JOYS_START) {
                    if (this.canJump && !this.isJumping)
                        {
                            this.canJump = false;            
                            this.isJumping = true;       
                            this.ninieAnimated.setState("jump",true);
                            this.speed.y = -Player.JUMP_SPEED;
                        }
                }
                
                break;
            case 1:
             
                if (Keyboard.state.get("ArrowRight") || ((HUD.JOYS_DIRECTION == "bottom_right" || HUD.JOYS_DIRECTION == "right") && HUD.JOYS_START)){

                    GameState.PLAY = true;
                                       
                    if (this.canJump)
                    {                        
                        this.speed.x = Player.MOVE_SPEED;
                        this.ninieAnimated.scale.x = 1;                        
                        this.ninieAnimated.setState("walk",true);
                        
                    }
                    
                    if(this.canJump && this.timePassedWalk > 3){
                            
                        this.speed.x = Player.MOVE_SPEED * 1.2;
                        this.ninieAnimated.setState("run",true);                          
                    }       
        
                }else if (Keyboard.state.get("ArrowLeft") ){
        
                    if (this.canJump)
                    {
                        this.ninieAnimated.scale.x = -1;
                        this.ninieAnimated.setState("walk",true);
        
                    }
                }else{
                    if(!this.isJumping){
                        this.speed.x = 0;
                        this.timePassedWalk =0;
                        this.ninieAnimated.setState("idle",true);
                    }
                }
                
                break;
        
            default:
                break;
        }

       
    }     
    
 
    private jump()
    {
        if (this.canJump && !this.isJumping)
        {
            this.canJump = false;            
            this.isJumping = true;       
            this.ninieAnimated.setState("jump",true);
            this.speed.y = -Player.JUMP_SPEED;
        }
    }


    public getHitbox():Rectangle
    {
        return this.hitbox.getBounds()
    }

    public separate(overlap: Rectangle, platform: ObservablePoint<any>) {
        if (overlap.width < overlap.height)
                {
                    if (this.x > platform.x)
                    {
                        this.x += overlap.width;
                    }else if (this.x < platform.x)
                    {
                        this.x -= overlap.width;
                    }

                }
                else
                {                                   
                    if (this.y > platform.y)
                    {
                        this.y += overlap.height;
                        this.speed.y = 0;
                        
                    }else if (this.y < platform.y)
                    {
                        this.y -= overlap.height;
                        this.speed.y = 0;
                        this.canJump = true;
                        this.isJumping = false;
                    }
                }
    }

    public takeDamage(damage : number) : void{
        this.currentHealth -= damage;
        if(this.currentHealth <= 0){
            this.isDead = true;
        } 
    }

    public getCurrentHealth():number{
        return this.currentHealth;
    }

    public fixRunSpeed(gameSpeed: number) {
        this.ninieAnimated.animationSpeed = gameSpeed / 4000
    }

    public complain(){
        
    }

}