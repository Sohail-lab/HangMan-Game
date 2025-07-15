import "./global.css"
import {StatusBar, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Timer from '../utils/timer';
import Keyboard from '../utils/keyboard';
import {Picker} from "@react-native-picker/picker";
import {useState} from "react";
import {Image} from "expo-image";
import {easyWords, mediumWords, hardWords} from '../utils/wordList'

export default function Index() {
    const [score, setScore] = useState(0);
    const [difficulty, setDifficulty] = useState('easy') ;
    const [startTimer, setStartTimer] = useState(false);
    const [incorrectGuesses, setIncorrectGuesses] = useState(6);

    const maxGuesses = 6;
    let shownWords = [];

    const handleKeyPress = (letter: string) => {
        console.log(letter);
    };

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
            <View className="items-center justify-center bg-white">
            <Text className="text-3xl font-bold text-blue-500">
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

            <View className="items-center mt-2 justify-center">
                <Image source={hangmanImages[incorrectGuesses]} style={{ width: 200, height: 200 }} />
            </View>
            <View className="items-center mt-5 justify-center">
                <Keyboard onKeyPress={handleKeyPress} />
            </View>
        </SafeAreaView>
    );
};
