/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {theme} from './colors';
import {EvilIcons} from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@toDos';
interface todo {
  [key: string]: {text: string; working: boolean};
}

function App(): JSX.Element {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState<todo>({});
  useEffect(() => {
    loadToDos();
  }, []);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (e: any) => {
    setText(e);
  };
  const saveToDos = async (toSave: todo) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.log('error: ', e);
    }
  };
  const loadToDos = async () => {
    try {
      const s: string | null = await AsyncStorage.getItem(STORAGE_KEY);
      s !== null ? setToDos(JSON.parse(s)) : null;
    } catch (e) {
      console.log('error: ', e);
    }
  };
  const addToDo = async () => {
    if (text === '') {
      return;
    }
    const newToDos = {...toDos, [Date.now()]: {text, working}};
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText('');
    console.log(toDos);
  };
  const deleteToDos = async (key: string) => {
    Alert.alert('Delete to Do', 'Are you sure?', [
      {text: 'Cancel'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          const newToDos = {...toDos};
          delete newToDos[key];
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? theme.touchColor : theme.black,
            }}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? theme.touchColor : theme.black,
            }}>
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        returnKeyType="done"
        onSubmitEditing={addToDo}
        autoCorrect={false}
        onChangeText={onChangeText}
        value={text}
        autoCapitalize="none"
        keyboardType={'default'}
        style={styles.input}
        placeholder={working ? '어디' : '안녕'}
      />
      <ScrollView>
        {Object.keys(toDos).map(key =>
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity
                onPress={() => {
                  deleteToDos(key);
                }}>
                <EvilIcons name="trash" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ) : null,
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
  },
  btnText: {
    fontWeight: '600',
    color: theme.black,
    fontSize: 30,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    fontSize: 18,
    marginBottom: 10,
  },
  toDo: {
    backgroundColor: theme.todoText,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toDoText: {
    color: theme.black,
    fontSize: 18,
  },
});
export default App;
