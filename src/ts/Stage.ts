import {CanvasItemAbstract} from "./CanvasItemAbstract";

export default class Stage {

    private _canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private canvasItems: CanvasItemAbstract[];
    private _time: number;
    
    constructor(canvasId: string) {
        this._canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        this.ctx = this._canvas.getContext('2d');
        this.time = 0;
        var canvasWidth = window.innerWidth;
        var canvasHeight = 300;
        this._canvas.width = canvasWidth;
        this._canvas.height = canvasHeight;
        
        this.canvasItems = [];

        var _this = this;
        (function animation () {
            _this.ctx.clearRect(0, 0, _this._canvas.width, _this._canvas.height);
            window.requestAnimationFrame(animation);
            _this.canvasItems.forEach((item: CanvasItemAbstract) => {
                var data = item.getDrawData(_this.time);
                _this.ctx.drawImage(data.image, data.x, data.y, data.width, data.height);
            });
        }());
    }

    get canvas():HTMLCanvasElement {
        return this._canvas;
    }

    get time():number {
        return this._time;
    }

    set time(value:number) {
        this._time = value;
    }
    
    itemAdd(item: CanvasItemAbstract): void {
        this.canvasItems.push(item);
    }

    itemAllRemove(): void {
        this.canvasItems.length = 0;
    }
}