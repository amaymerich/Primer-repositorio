import { Application, Loader, Ticker } from 'pixi.js'
import { assets } from './Assets';
import { TickerScene } from './scenes.ts/TickerScene';
//Aplicaion de pxi que renderiza por nosotros
const app = new Application({ 
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1280,
	height: 720
});
//Acomoda la pantalla
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

Loader.shared.add(assets);

Loader.shared.onComplete.add(()=>{
	const myScene= new TickerScene();
	app.stage.addChild(myScene);
	
	Ticker.shared.add(function(deltaFrame){
		myScene.update(Ticker.shared.deltaMS,deltaFrame)
	})
	
});

Loader.shared.load();