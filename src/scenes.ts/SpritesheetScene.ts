import { Container, Sprite} from "pixi.js";


export class SpritesheetScene extends Container {
    constructor() {
        super();
         const Run = Sprite.from("Ninja/Run/Run__005.png");
         this.addChild(Run);
/*
 //Método para cortar grillas ya armadas
        const spritesheet = new Spritesheet(Texture.from("Ninja spritesheet0"),
        {
            frames: {
                "robot1":{
                    frame:{
                        x:0,
                        y:0,
                        w: 192,
                        h: 256
                    }
                },
            },
            meta:{
                scale: "1"
            }
        });
        spritesheet.parse(()=>{
            const robo = Sprite.from("robot1");
            this.addChild(robo);
        });*/
    }

    public update()
    {
    }
} 