import { EventBus } from '../EventBus';
import { GameObjects, Scene } from 'phaser';

import { Challenge, getNextChallenge, getStrategyB } from '../libs/GameEngine';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    explainer: GameObjects.Text;
    
    keysDown: Set<string>;
    activeTextObjects: Record<string, Phaser.GameObjects.Text>;
    isMouseDown: boolean;
    challengeNumber: number;
    score: number;

    mockString: string;
    gameStrategy: Challenge[];

    explainerText = `
        Keyboard Twister!
        Hold your mouse clicked with one hand, don't use it!
        With your other hand, press all of the letters of the current word
    `;

    constructor ()
    {
        super('Game');
        this.activeTextObjects = {};
        this.isMouseDown = false;
        this.keysDown = new Set();
        this.gameStrategy = getStrategyB();
        this.challengeNumber = 0;
        this.score = 0;
        this.mockString = getNextChallenge(this.challengeNumber++, this.gameStrategy).word
        console.log('Challenge:', this.mockString)
        EventBus.emit('update-word', this.mockString)
    }

    checkAgainstChallenge(key: string) {
        if (this.mockString.indexOf(key) > -1) {
            if (!this.activeTextObjects[key]) {
                this.activeTextObjects[key] = this.add.text(512 * Math.random(), 384 * Math.random(), key, {
                    fontSize: '36pt'
                })
            }
            this.keysDown.add(key)
            if (this.keysDown.size === this.mockString.length) {
                console.log("Met challenge!")
                this.mockString = getNextChallenge(this.challengeNumber++, this.gameStrategy).word
                this.keysDown = new Set()
                for(const key in this.activeTextObjects) {
                    this.activeTextObjects[key].destroy()
                }
                this.activeTextObjects = {}

                this.score++;
                EventBus.emit('update-score', this.score);

                console.log("New challenge: ", this.mockString)
                EventBus.emit('update-word', this.mockString)
            }
            
        }
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.explainer = this.add
            .text(512, 200, this.explainerText, {
                fontFamily: "Arial",
                fontSize: 30,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 2,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        EventBus.emit('current-scene-ready', this);

        this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
            if (!this.isMouseDown) return
            this.explainer.destroy();
            this.checkAgainstChallenge(event.key)

        })
        this.input.keyboard?.on('keyup', (event: KeyboardEvent) => {
            if (!this.isMouseDown) return
            const key = event.key
            if (this.activeTextObjects[key]) {
                this.activeTextObjects[key].destroy()
                delete(this.activeTextObjects[key])
            }
            this.keysDown.delete(key)
        })
    }

    update () {
        this.isMouseDown = this.input.activePointer.isDown
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
