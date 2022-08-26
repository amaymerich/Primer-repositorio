import { LoaderScene } from "./scenes.ts/LoaderScene";
import { SceneManager } from "./UIDemo/SceneManager";

SceneManager.initialize();
SceneManager.changeScene(new LoaderScene());
