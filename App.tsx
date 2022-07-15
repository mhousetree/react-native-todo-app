import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, FlatList, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type RootStackParamList = {
  Home: undefined;
  Details: {
    itemId: number,
    otherParam: string
  };
}

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

type ItemProps = {
  text: string
  onPressDelete: VoidFunction
  isActive: boolean
}

type Todo = {
  id: number
  text: string
  active: boolean
}

const Item: React.FC<ItemProps> = ({text, onPressDelete, isActive}) => {
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

function HomeScreen({navigation}: Props) {
  const [text, onChangeText] = React.useState<string>("")
  const [todos, setTodos] = React.useState<Array<Todo>>([])
  const [id, setId] = React.useState<number>(0)

  return(
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Button
        title='Go to Details'
        onPress={() => { navigation.navigate('Details', {
          itemId: 86,
          otherParam: 'anything you want here',
        });
      }}
      />
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
  )
}

function DetailsScreen({route, navigation}: Props) {
  const {itemId, otherParam} = route.params
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>itemId: {JSON.stringify(otherParam)}</Text>
    </View>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Ovreview' }} />
        <Stack.Screen name='Details' component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
