import Resource from "./Resource";
import {CanvasItemAbstract} from "./CanvasItemAbstract";
import {IDrawData} from "./IDrawData";
import Stage from "./Stage";

export default class Player extends CanvasItemAbstract{
    
    private layers: HTMLCanvasElement[];

    constructor(stage: Stage) {
        super(stage);
        this.layers = [];
        this.layers['sit'] = document.createElement('canvas');
        this.layers['sit'].height = this.getHeight();
        this.layers['sit'].width = this.getWidth();
        Resource.kiritan_sit().addEventListener('load', () => {
            this.layers['sit'].getContext('2d').drawImage(Resource.kiritan_sit(), 0, 0, this.getWidth(), this.getHeight());
        });
        this.layers['fly'] = document.createElement('canvas');
        this.layers['fly'].height = this.getHeight();
        this.layers['fly'].width = this.getWidth();
        Resource.kiritan_fly().addEventListener('load', () => {
            this.layers['fly'].getContext('2d').drawImage(Resource.kiritan_fly(), 0, 0, this.getWidth(), this.getHeight());
        });
    }
    
    getDrawData(time: number): IDrawData {
         return {
             image: this.getImage(time),
             x: this.getX(),
             y: this.getY(time),
             width: this.getWidth(),
             height: this.getHeight()
         };
    }

    private getImage(time: number):HTMLCanvasElement {
        var tan = Math.tan(time * 0.001 * Math.PI);
        
        if (tan <= 0 && -0.4 < tan) {
            return this.layers['sit'];
        }

        return this.layers['fly'];
    }

    private getX():number {
        return Math.floor(this.canvasWidth * 0.2 - this.getWidth() * 0.5);
    }

    private getY(time: number):number {
        return Math.floor(this.canvasHeight - 190 - Math.abs(Math.sin(time * 0.001 * Math.PI)) * 100);
    }
    
    private getWidth() {
        return 100;
    }
    
    private getHeight() {
        return 100;
    }
}