import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, FlatList, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type Props = {
  text: string
  onPressDelete: VoidFunction
  isActive: boolean
}

type Todo = {
  id: number
  text: string
  active: boolean
}

const Item: React.FC<Props> = ({text, onPressDelete, isActive}) => {
  let className = ""
  
  if (!isActive) {
    className = "disabled"
  }
  return (
    <View style={{flex: 1, flexDirection: "row", alignItems: "center", marginBottom: 10}}>
      <Text style={!isActive && {textDecorationLine: "line-through"}}>{text}</Text>
      <Button
        title='delete'
        onPress={onPressDelete}
      />
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
            setTodos(oldTodos => [...oldTodos, {id:id, text:text, active: true}])
            setId(id+1)
          }}
        />
        <FlatList
          data={todos}
          renderItem={({item}) => 
            <Item
              text={item.text}
              onPressDelete={() => setTodos(oldTodos => {
                const newTodos = []
                for (const todo of oldTodos) {
                  if (todo.id !== item.id) {
                    newTodos.push(todo)
                  } else {
                    const newTodo = todo
                    newTodo.active = false
                    newTodos.push(newTodo)
                  }
                }
                return newTodos
              })}
              isActive={item.active}
          />}
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
