import "./global.css";
import {StatusBar, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Timer from '../utils/timer';
import Keyboard from '../utils/keyboard';
import {Picker} from "@react-native-picker/picker";
import {useEffect, useState} from "react";
import {Image} from "expo-image";
import {easyWords, mediumWords, hardWords} from '../utils/wordList';

export default function Index() {
    const [score, setScore] = useState(0);
    const [difficulty, setDifficulty] = useState('easy') ;
    const [startTimer, setStartTimer] = useState(false);
    const [incorrectGuesses, setIncorrectGuesses] = useState(6);

    const maxGuesses = 6;

    const getRandomRiddle = () => {
        let riddle = { word: '', hint: ''};
        if(difficulty === 'hard') {
            riddle = hardWords[Math.floor(Math.random() * hardWords.length)];
            hardWords.splice(hardWords.indexOf(riddle), 1);
            return riddle;
        }
        else if(difficulty === 'medium') {
            riddle =  mediumWords[Math.floor(Math.random() * mediumWords.length)];
            mediumWords.splice(mediumWords.indexOf(riddle), 1);
            return riddle;
        }
        riddle = easyWords[Math.floor(Math.random() * easyWords.length)];
        easyWords.splice(easyWords.indexOf(riddle), 1);
        return riddle;
    };

    const [currentRiddle, setCurrentRiddle] = useState(getRandomRiddle());
    const [userAnswer, setUserAnswer] = useState<string[]>([]);

    useEffect(() => {
        setUserAnswer(Array(currentRiddle.word.length).fill(''));
    }, [currentRiddle]);

    const handleKeyPress = (letter: string) => {
        const currentLetter = letter.toLowerCase();
        const answerSize = currentRiddle.word.length;
        const updatedAnswer = [...userAnswer];
        if(currentRiddle.word.includes(currentLetter) && !userAnswer.includes(currentLetter)) {
            for(let i = 0; i < answerSize; i++) {
                if(currentRiddle.word[i] === currentLetter) {
                    updatedAnswer[i] = currentLetter;
                }
            }
        }
        setUserAnswer(updatedAnswer);
        checkAnswer(userAnswer.join(''));
    };

    const checkAnswer = (userAnswer : string) => {
        if(userAnswer === currentRiddle.word) {
            if(difficulty === 'easy') {
                setScore(score + 10);
            }
            else if(difficulty === 'medium') {
                setScore(score + 15);
            }
            setScore(score + 30);
            console.log(score);
            setCurrentRiddle(getRandomRiddle());
            setUserAnswer(Array(currentRiddle.word.length).fill(''));
        }
    };

    useEffect(() => {
        console.log(userAnswer.join(''));
    }, [userAnswer]);

    const hangmanImages = [
        require('../assets/images/hangman-0.png'),
        require('../assets/images/hangman-1.png'),
        require('../assets/images/hangman-2.png'),
        require('../assets/images/hangman-3.png'),
        require('../assets/images/hangman-4.png'),
        require('../assets/images/hangman-5.png'),
        require('../assets/images/hangman-6.png'),
    ];

    return (
        <SafeAreaView>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
            <View className="items-center justify-center bg-white py-1">
                <Text className="text-4xl font-bold text-blue-500">
                    HangMan Game
                </Text>
        </View>
            <View className="flex-row justify-between ml-1 mr-1 py-2 bg-white">
                <Text className="text-xl font-bold text-gray-600">
                    Score: {score}
                </Text>
                <Timer/>
                <TouchableOpacity>
                    <Text className="text-gray-600 text-xl font-bold">
                        Skip Word
                    </Text>
                </TouchableOpacity>
            </View>
            <View className="bg-white justify-between" style={{flexDirection:"row", alignItems:"center"}}>
                <Text className="text-xl font-bold text-gray-600 ml-1">
                    Difficulty:
                </Text>
                <Picker
                    selectedValue={difficulty}
                    onValueChange={(itemValue) => setDifficulty(itemValue)}
                    style={{ width: 130 }}
                    itemStyle={{ fontSize: 18, fontWeight: 'bold', color: '#4B5563' }}
                >
                    <Picker.Item label="Easy" value="easy" />
                    <Picker.Item label="Medium" value="medium" />
                    <Picker.Item label="Hard" value="hard" />
                </Picker>
            </View>

            <View className="items-center mt-4 justify-center">
                <Image source={hangmanImages[incorrectGuesses]} style={{ width: 200, height: 200 }} />
            </View>

            <View className="items-center justify-center mt-2">
                <Text className="text-xl font-bold text-center px-2">
                    {currentRiddle.hint}
                </Text>
            </View>

            <View className="items-center mt-5 justify-center">
                <Keyboard onKeyPress={handleKeyPress} />
            </View>
        </SafeAreaView>
    );
};
