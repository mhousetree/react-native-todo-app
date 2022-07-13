import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, FlatList, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type Props = {
  text: string
}

type Todo = {
  id: number
  text: string
}

const Item: React.FC<Props> = ({text}) => {
  return (
    <View>
      <Text>{text}</Text>
    </View>
  )
}

export default function App() {
  const [text, onChangeText] = React.useState<string>("")
  const [todos, setTodos] = React.useState<Array<Todo>>([])
  const [id, setId] = React.useState<number>(0)
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <TextInput 
          onChangeText={t => onChangeText(t)} 
          value={text} 
          style={styles.input} 
        />
        <Button 
          title='Add'
          onPress={() => {
            onChangeText("")
            setTodos(oldTodos => [...oldTodos, {id:id, text:text}])
            setId(id+1)
          }}
        />
        <FlatList
          data={todos}
          renderItem={({item}) => <Item text={item.text} />}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  input: {
    borderColor: "#eee",
    borderWidth: 1,
    height: 40,
    width: "80%",
  }
});
