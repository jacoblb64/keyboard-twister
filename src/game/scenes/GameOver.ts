import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameOver extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameOverText : Phaser.GameObjects.Text;

    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        const score = this.registry.get('score');

        this.gameOverText = this.add.text(512, 384, `game over\nscore: ${score}\nclick to play again`, {
            fontSize: 36, color: '#ffffff',
            stroke: '#000000', strokeThickness: 2,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);
        
        EventBus.emit('current-scene-ready', this);

        this.input.once('pointerdown', () => {
            this.changeScene();
        });
    }

    changeScene ()
    {
        this.scene.start('Game');
    }
}
