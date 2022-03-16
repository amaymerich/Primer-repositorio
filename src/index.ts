import { Application, Container, Loader, Point, Sprite } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

window.addEventListener("resize", ()=>{
	const scalex = window.innerWidth/app.screen.width;
	const scaley = window.innerHeight / app.screen.height;
	const scale= Math.min(scalex,scaley);

	const gamewidth = Math.round(app.screen.width * scale);
	const gameheight =  Math.round(app.screen.height * scale);

	const marginHorizontal = Math.floor((window.innerWidth - gamewidth)/2);
	const marginVertical = Math.floor((window.innerHeight - gameheight)/2);

	app.view.style.width = gamewidth+ "px";
	app.view.style.height = gameheight + "px";

	app.view.style.marginLeft = marginHorizontal +"px";
	app.view.style.marginRight = marginHorizontal +"px";

	app.view.style.marginTop = marginVertical + "px";
	app.view.style.marginBottom = marginVertical + "px";
})

window.dispatchEvent(new Event("resize"));

Loader.shared.add({url: "./minion-handball.png",name: "myMinion"});
Loader.shared.add({url: "./ball-Handball.png",name: "ball"});

Loader.shared.onComplete.add(()=>{

	const minion: Sprite = Sprite.from("myMinion");
	
	minion.position.set(100,100);
	minion.scale.set(0.5,0.5);

	const ball: Sprite= Sprite.from("ball");

	ball.scale.set(0.08,0.08);
	ball.position.set(95,70);

	const minionWidthBall: Container = new Container();
	
	minionWidthBall.addChild(ball);
	minionWidthBall.addChild(minion);
	
	minionWidthBall.scale.set(1);
	minionWidthBall.x=250;
	minionWidthBall.y=170;
	minionWidthBall.angle=30;

	console.log(ball.toGlobal(new Point()));
	console.log(ball.parent.toGlobal(ball.position));

app.stage.addChild(minionWidthBall);
	
});

Loader.shared.load();