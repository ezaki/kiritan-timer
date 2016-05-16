import Stage from "./Stage";
import CountDown from "./CountDown";

declare var Notification: any;

export default class Control {

    constructor() {
        var canvasId = 'main-canvas';
        var stage = new Stage(canvasId);
        
        var countDown = new CountDown(stage);
        
        document.getElementById('timer-setting').addEventListener('keydown', (event) => {
            if (event.keyCode === 13) {
                countDown.startCountDown();
            }
        });

        document.getElementById('timer-start').addEventListener('click', () => {
            countDown.startCountDown();
        });

        document.getElementById('timer-stop').addEventListener('click', () => {
            countDown.stopCountDown();
        });

        countDown.registerAnimation();

        if ('Notification' in window) {
            Notification.requestPermission();
        }
    }
}