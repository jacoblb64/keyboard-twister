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
        <div className="w-[100%] h-[100vh] flex flex-col items-center justify-center">
            <div className="text-center mb-4 text-3xl">
                Current Challenge
                <strong className="text-5xl mt-2 block">{gameState.challengeWord.toUpperCase()}</strong>
            </div>
            <PhaserGame
                ref={phaserRef}
                currentActiveScene={currentScene}
                updateGameState={updateGameState}
            />
            <div className="mt-4 text-3xl font-bold">
                {gameState.score}
            </div>
        </div>
    );
}

export default App;
