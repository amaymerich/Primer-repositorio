import { Container, Sprite } from "pixi.js";

export class MinionBall extends Container{
constructor(){
    super();
   
    const minion: Sprite = Sprite.from("myMinion");
	minion.position.set(100,100);
	minion.scale.set(0.5,0.5);

	const ball: Sprite= Sprite.from("ball");
	ball.scale.set(0.08,0.08);
	ball.position.set(95,70);
	
	this.addChild(ball);
	this.addChild(minion); 
}
}