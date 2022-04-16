import { AnimatedSprite, Container, Texture} from "pixi.js";



export class Scene extends Container
{
    constructor()
    {
        super();
   
        const ninjaAnimated: AnimatedSprite = new AnimatedSprite
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
            true
        );
        ninjaAnimated.play();
        ninjaAnimated.animationSpeed=0.35;
        this.addChild(ninjaAnimated);
    
	}
}