import { useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame, GameState } from "./PhaserGame";

function App() {
    const [gameState, setGameState] = useState({
        score: 0,
        challengeWord: "",
    });

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {
        console.log(`Current scene is`, scene.scene.key);
    };

    const updateGameState = (state: Partial<GameState>) => {
        setGameState((prev) => ({ ...prev, ...state }));
    };

    return (
        <div id="app">
            <div
                style={{
                    top: "1rem",
                    position: "absolute",
                    backgroundColor: "white",
                    color: "black",
                    fontSize: "3rem",
                }}
            >
                Current Word: {gameState.challengeWord}
                <br />
                Score: {gameState.score}
            </div>
            <PhaserGame
                ref={phaserRef}
                currentActiveScene={currentScene}
                updateGameState={updateGameState}
            />
        </div>
    );
}

export default App;
