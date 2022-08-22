import { Application, Loader} from 'pixi.js'
import { assets } from './Assets';
import { SpritesheetScene } from './scenes.ts/SpritesheetScene';
import { Keyboard } from './UIDemo/Keyboard';

//Aplicaion de pxi que renderiza por nosotros
export const WIDTH=1920;
export const HEIGHT=1080;

const app = new Application({ 
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor:0x6495ed,
	width: WIDTH,
	height: HEIGHT,
});
Keyboard.initialize();


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

//Loader.registerPlugin(WebfontLoaderPlugin);

Loader.shared.add(assets);

/*Loader.shared.onComplete.add(()=>{
	// crear fuentes bitmap
	const aux = new TextStyle({
		fontSize: 15,
		dropShadow: true,
		fill: "red",
		lineJoin: "round",
		stroke: "#15be09",
		fontFamily: "br",
	})
	BitmapFont.from("Mi BitmapFont",aux,{chars:BitmapFont.ASCII});*/
	
	//const myScene= new TickerScene();
	//const myScene = new SoundScene();
	//const myScene = new TextScene();
	//app.stage.addChild(myScene);

	Loader.shared.onComplete.add(()=>{
		const myScene = new SpritesheetScene();

		app.stage.addChild(myScene);
		/*Ticker.shared.add(function (deltaFrame){
			myScene.update(Ticker.shared.deltaMS, deltaFrame);
		});*/
	
});

Loader.shared.load();