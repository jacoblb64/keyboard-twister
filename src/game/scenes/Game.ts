import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    keysDown: Set<string>;
    activeLetters: Record<string, Phaser.GameObjects.Text>;
    isMouseDown: boolean;

    mockString: string;

    constructor ()
    {
        super('Game');
        this.activeLetters = {};
        this.isMouseDown = false;
        this.keysDown = new Set();
        this.mockString = "qwert";
    }

    checkAgainstChallenge(key: string) {
        if (this.mockString.indexOf(key) > -1) {
            if (!this.activeLetters[key]) {
                this.activeLetters[key] = this.add.text(512 * Math.random(), 384 * Math.random(), key, {
                    fontSize: '36pt'
                })
            }
            this.keysDown.add(key)
        }
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        EventBus.emit('current-scene-ready', this);

        this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
            if (!this.isMouseDown) return
            this.checkAgainstChallenge(event.key)

        })
        this.input.keyboard?.on('keyup', (event: KeyboardEvent) => {
            if (!this.isMouseDown) return
            const key = event.key
            if (this.activeLetters[key]) {
                this.activeLetters[key].destroy()
                delete(this.activeLetters[key])
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
