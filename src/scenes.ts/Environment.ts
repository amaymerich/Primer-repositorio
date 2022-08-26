import { Sprite} from "pixi.js";
import { PhysicsContainer } from "../game/PhysicsContainer";

export class Environment extends PhysicsContainer{

    private objeto: any;

    constructor(nroObjeto:number){
        super();

        switch (nroObjeto) {
            case 0:
                this.objeto = Sprite.from("Platform/Object/Barrel (1).png");
                this.objeto.scale.set(2.8);
                                
                break;
            case 1:
                this.objeto = Sprite.from("Platform/Object/Barrel (2).png")
             
                this.objeto.scale.set(2.8);
                
                break;
            case 2:
                this.objeto = Sprite.from("Platform/Object/Box.png");
    
                this.objeto.scale.set(2.8);
                
                break;
            
            default:
                break;
        }

        this.addChild(this.objeto);


    }
    
    public getObject():Sprite{
        return this.objeto;
    }
    
}