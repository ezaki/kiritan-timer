import {IDrawData} from "./IDrawData";
import Stage from "./Stage";

export abstract class CanvasItemAbstract {

    protected stage: Stage;
    protected canvasWidth: number;
    protected canvasHeight: number;
    
    constructor(stage: Stage) {
        this.stage = stage;
        this.canvasWidth = stage.canvas.width;
        this.canvasHeight = stage.canvas.height;
    }
    
    abstract getDrawData(time: number): IDrawData;
}