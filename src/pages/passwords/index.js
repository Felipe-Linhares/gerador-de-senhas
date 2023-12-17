import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import useStorage from "../../hooks/useStorage";
import { PasswordItem } from "./components/passwordItem";


export function Passwords() {

    const [listPasswords, setListPasswords] = useState([]);
    const isFocused = useIsFocused();
    const { getItem, removeItem } = useStorage();

    useEffect(() => {
        async function loadPasswords() {

            const passwords = await getItem("@pass");

            console.log(passwords);

            setListPasswords(passwords);
        }
        loadPasswords();
    }, [isFocused]);

    async function handleDeletePassaword(item) {
        const passwords = await removeItem("@pass", item);
        setListPasswords(passwords);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas senhas</Text>
            </View>

            <View style={styles.content}>
                <FlatList style={styles.flat}


                    data={listPasswords}
                    keyExtractor={(item) => String(item)}
                    renderItem={({ item }) => <PasswordItem data={item}
                        removePassword={(() => handleDeletePassaword(item))} />}
                >
                </FlatList>

            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: "#392DE9",
        paddingTop: 58,
        paddingBottom: 14,
        paddingLeft: 14,
        paddingRight: 14,

    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFF",
    },
    content: {
        flex: 1,
        paddingRight: 14,
        paddingLeft: 14,
    },
    flat: {
        flex: 1,
        paddingTop: 14,
    },
});