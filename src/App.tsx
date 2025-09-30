import { useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "./PhaserGame";

function App() {
    // The sprite can only be moved in the MainMenu Scene

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {
        //
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
                score!
            </div>
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
        </div>
    );
}

export default App;
