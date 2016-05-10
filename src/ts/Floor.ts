import {CanvasItemAbstract} from "./CanvasItemAbstract";
import {IDrawData} from "./IDrawData";
import Resource from "./Resource";
import Stage from "./Stage";

export default class Floor extends CanvasItemAbstract {

    private floorNumber: number;
    private layer: HTMLCanvasElement;

    constructor(stage: Stage) {
        super(stage);
        
        this.floorNumber = Math.ceil(this.canvasWidth * 0.5 / this.getWidth());
        if (this.floorNumber < 2) {
            this.floorNumber = 2;
        }

        this.layer = document.createElement("canvas");
        this.layer.height = this.getHeight();
        this.layer.width = this.canvasWidth + this.getWidth() * 4;
        var ctx = this.layer.getContext('2d');
        for (var i = -1; i < this.floorNumber; i++) {
            ctx.drawImage(Resource.zunda(), Math.floor(this.canvasWidth * 0.2 - this.getWidth() * 0.5 + this.canvasWidth / (this.floorNumber - 1) * i), 0, this.getWidth(), this.getHeight());
        }
    }

    getDrawData(time:number):IDrawData {

        return {
            image: this.layer,
            x: this.getX(time),
            y: this.getY(),
            width: this.layer.width,
            height: this.getHeight()
        };
    }

    private getImage() {
        return Resource.zunda();
    }

    private getX(time:number) {
        return Math.floor(-time % 1000 * 0.001 / (this.floorNumber - 1) * this.canvasWidth);
    }

    private getY() {
        return this.canvasHeight - 95;
    }

    private getWidth() {
        return this.getImage().width;
    }

    private getHeight() {
        return this.getImage().height;
    }
}