import mediumWords from "../../../public/assets/files/google-10000-english-usa-no-swears-medium.txt?raw";
import shortWords from "../../../public/assets/files/google-10000-english-usa-no-swears-short.txt?raw";
export interface Challenge {
    characterLength: number;
    time: number;
}

export function getScore(time: number, length: number) {
    return (Math.ceil(time) - 6) * length;
}

// gets selected by user once they start everything up;
export function getStrategyA(): Challenge[] {
    return [
        { characterLength: 1, time: 5 },
        { characterLength: 2, time: 5 },
        { characterLength: 3, time: 5 },
    ];
}

export function getStrategyB(): Challenge[] {
    const challenges: Challenge[] = [];

    for (let j = 5; j >= 1; j--) {
        for (let i = 1; i <= 5; i++) {
            challenges.push({ characterLength: i, time: j });
        }
    }
    // console.log(challenges);
    return challenges;

    return [
        { characterLength: 1, time: 5 },
        { characterLength: 2, time: 5 },
        { characterLength: 3, time: 5 },
    ];
}
export function getNextChallenge(
    challengeNumber: number,
    ChallengeStrategy: Challenge[]
) {
    const challenge = ChallengeStrategy[challengeNumber];
    // make a call to a file to get the actual word;
    let words;
    if (challenge.characterLength > 4) {
        words = mediumWords;
    } else {
        words = shortWords;
    }

    const parsedWords = words
        .split("\n")
        .filter((word: string) => word.length === challenge.characterLength);
    const randomWord =
        parsedWords[Math.floor(Math.random() * parsedWords.length)];

    return {
        characterLength: challenge.characterLength,
        time: challenge.time,
        word: randomWord,
    };
}

