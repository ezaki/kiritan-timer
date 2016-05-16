import Stage from "./Stage";
import Player from "./Player";
import Floor from "./Floor";
import Resource from "./Resource";

declare var Notification: any;

export default class CountDown {

    private stage: Stage;
    private startTime: number;
    private takeTime: number;
    private remainingTime: number;
    private timerId: number;
    private titleDom: HTMLTitleElement;
    private timerDisplay: HTMLParagraphElement;
    private stopSound: HTMLAudioElement;

    constructor(stage: Stage) {
        this.stage = stage;
        this.titleDom = <HTMLTitleElement>document.getElementsByTagName('title')[0];
        this.timerDisplay = <HTMLParagraphElement>document.getElementById('timer-display').getElementsByTagName('p')[0];

        this.stopSound = Resource.alarm();
        this.stopSound.volume = 0.5;
        this.stopSound.addEventListener('ended', (event) => {
            (<HTMLAudioElement>event.currentTarget).currentTime = 0.0;
        });
    }
    
    startCountDown() {
        this.startTime = (new Date()).getTime();
        var sec = Number((<HTMLInputElement>document.getElementById('timer-sec')).value);
        var min = Number((<HTMLInputElement>document.getElementById('timer-min')).value);
        var hour = Number((<HTMLInputElement>document.getElementById('timer-hour')).value);
        this.takeTime = (hour * 60 * 60 + min * 60 + sec) * 1000;
        this.registerAnimation();

        var _this = this;
        (function loop () {
            var nowTime = (new Date()).getTime();
            var elapsedTime = nowTime - _this.startTime;
            if (_this.takeTime < elapsedTime) {
                _this.stage.time = 0;
                _this.titleDom.text = "…時間です";
                _this.timerDisplay.innerText = "…時間です";
                if ((<HTMLInputElement>document.getElementById('sound-switch')).checked) {
                    _this.stopSound.play();
                }
                _this.showNotification();
            }
            else {
                _this.timerId = window.setTimeout(loop, 5);
                _this.stage.time = elapsedTime;
                _this.remainingTime = _this.takeTime - elapsedTime;
                var sec = Math.ceil(_this.remainingTime * 0.001);
                var timeString: string = Math.floor(sec * 0.01 / 36) + " : " +  ('0' + Math.floor((sec * 0.1 / 6) % 60)).slice(-2) + " : " + ('0' + (sec % 60)).slice(-2);
                _this.titleDom.text = timeString;
                _this.timerDisplay.innerText = timeString;

            }
        }());
    }

    showNotification() {
        if ('Notification' in window && Notification.permission === 'granted') {
            var notification = new Notification(
                'きりぴょんタイマー',
                {
                    body: '…時間になりましたよ',
                    icon: Resource.notifyIcon()
                }
            );

            notification.addEventListener('click', () => {
                notification.close();
            });
        }
    }
    
    stopCountDown() {
        var elapsedTime = (new Date()).getTime() - this.startTime;
        var tan = Math.tan(elapsedTime * 0.001 * Math.PI);
        if (-0.4 < tan && tan < 0) {
            this.timerDisplay.innerText = "…止めるんですね";
        }
        else {
            this.timerDisplay.innerText = "…止めるんですね";
        }

        window.clearTimeout(this.timerId);
        this.titleDom.text = "停止";
    }

    registerAnimation() {
        this.stage.itemAllRemove();
        this.stage.itemAdd(new Player(this.stage));
        this.stage.itemAdd(new Floor(this.stage));
    }
}