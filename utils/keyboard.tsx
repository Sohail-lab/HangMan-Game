import {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const ALPHABET = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');

const Keyboard = ({ onKeyPress } : { onKeyPress: (letter: string) => void}) => {
    const [pressedKeys, setPressedKeys] = useState<string[]>([]);

    const handleKeyPress = (letter: string) => {
        if(pressedKeys.includes(letter)) return;

        setPressedKeys([...pressedKeys, letter]);
        onKeyPress(letter);
    };

    return (
        <View style={styles.keyboardContainer}>
            {ALPHABET.map((letter) => (
                <TouchableOpacity
                    key={letter}
                    style={[
                        styles.key,
                        pressedKeys.includes(letter) && styles.keyDisabled,
                    ]}
                    onPress={() => handleKeyPress(letter)}
                >
                    <Text style={styles.keyText}>{letter}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    keyboardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 20,
    },
    key: {
        backgroundColor: '#4CAF50',
        padding: 10,
        margin: 5,
        borderRadius: 4,
        width: 40,
        alignItems: 'center',
    },
    keyDisabled: {
        backgroundColor: '#9E9E9E',
    },
    keyText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Keyboard;
