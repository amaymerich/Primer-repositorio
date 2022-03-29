import { Container, Text} from "pixi.js";
import { gameBoard } from "../UIDemo/Board";
import { gameBackground } from "../UIDemo/gameBackground";
import { gameButtons } from "../UIDemo/UIDemo";
import { gameInfo } from "../UIDemo/gameInfo";



export class Scene extends Container
{
    constructor()
    {
        super();
    
	      const background: gameBackground = new gameBackground();
          this.addChild(background);

          const Board: gameBoard = new gameBoard();
          this.addChild(Board);

          const Info: gameInfo = new gameInfo();
          this.addChild(Info);

          const Buttons: gameButtons = new gameButtons();
          this.addChild(Buttons);

          const text: Text = new Text ("YOU WIN!", {fontSize: 71, fontFamily: "Arial", fill: "white"});
          text.position.set(490,95);
          this.addChild(text);
    }
}