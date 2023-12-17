import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as Clipboard from 'expo-clipboard';

import useStorage from '../../hooks/useStorage';


export function ModalPassword({ password, handleClose }) {

    const { getItem, saveItem, removeItem } = useStorage();



    async function handleCopyPassword() {
        await Clipboard.setStringAsync(password);
        await saveItem("@pass", password);
        alert("Senha salva com sucesso!");

        handleClose();

    }


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Senha gerada</Text>

                <Pressable style={styles.innerPassword} onLongPress={handleCopyPassword}>
                    <Text style={styles.text}>
                        {password}
                    </Text>
                </Pressable>

                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={handleClose}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleCopyPassword}>
                        <Text style={styles.buttonSaveText}>Salvar senha</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(24,24,24,0.6)",
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        width: "85%",
        backgroundColor: "#FFF",
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 24,
    },
    innerPassword: {
        width: "90%",
        borderRadius: 8,
        backgroundColor: "#0E0E0E",
        padding: 14
    },
    text: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonArea: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-around",
        marginTop: 8,
        alignItems: "center",
    },
    button: {
        flex: 1,
        alignItems: "center",
        marginTop: 14,
        marginBottom: 14,
        padding: 8
    },
    buttonSave: {
        backgroundColor: "#392DE9",
        borderRadius: 8,
    },
    buttonSaveText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});