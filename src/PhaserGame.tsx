import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "./game/main";
import { EventBus } from "./game/EventBus";

export interface IRefPhaserGame {
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

export type GameState = {
    score: number;
    challengeWord: string;
};

interface IProps {
    currentActiveScene?: (scene_instance: Phaser.Scene) => void;
    updateGameState: (state: Partial<GameState>) => void;
}

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(
    function PhaserGame({ currentActiveScene, updateGameState }, ref) {
        const game = useRef<Phaser.Game | null>(null!);

        useLayoutEffect(() => {
            if (game.current === null) {
                game.current = StartGame("game-container");

                if (typeof ref === "function") {
                    ref({ game: game.current, scene: null });
                } else if (ref) {
                    ref.current = { game: game.current, scene: null };
                }
            }

            return () => {
                if (game.current) {
                    game.current.destroy(true);
                    if (game.current !== null) {
                        game.current = null;
                    }
                }
            };
        }, [ref]);

        useEffect(() => {
            EventBus.on(
                "current-scene-ready",
                (scene_instance: Phaser.Scene) => {
                    if (
                        currentActiveScene &&
                        typeof currentActiveScene === "function"
                    ) {
                        currentActiveScene(scene_instance);
                    }

                    if (typeof ref === "function") {
                        ref({ game: game.current, scene: scene_instance });
                    } else if (ref) {
                        ref.current = {
                            game: game.current,
                            scene: scene_instance,
                        };
                    }
                }
            );

            EventBus.on("update-score", (score: number) => {
                updateGameState({ score });
            });

            EventBus.on("update-word", (challengeWord: string) => {
                updateGameState({ challengeWord });
            });

            return () => {
                EventBus.removeListener("current-scene-ready");
                EventBus.removeListener("update-score");
                EventBus.removeListener("update-word");
            };
        }, [currentActiveScene, ref]);

        return <div id="game-container"></div>;
    }
);
