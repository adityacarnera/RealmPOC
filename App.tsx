// App.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  addTask,
  getTasks,
  clearTasks,
  deleteTask,
  updateTask,
} from './utils/realm';
import {Task, TaskSchema} from './schemas/TaskSchema';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const {isConnected} = useNetInfo();

  useEffect(() => {
    const fetchAndStoreData = async () => {
      try {
        clearTasks();
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos',
        );
        const data = await response.json();
        data.forEach(
          (task: {id: number; title: string; completed: boolean}) => {
            addTask(task.id, task.title, task.completed);
          },
        );
        setTasks(getTasks());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (isConnected) {
      // If connected to the internet, sync data with server
      fetchAndStoreData();
    } else {
      // If offline, use local data from Realm
      setTasks(getTasks());
    }
  }, [isConnected]);

  const handleAdd = () => {
    const lastId = tasks[tasks.length - 1].id;
    addTask(lastId + 1, newTask, false);
    setTasks(getTasks());
  };

  const handleRemove = (id: number) => {
    deleteTask(id);
    setTasks(getTasks());
  };

  const handleEdit = (id: number) => {
    updateTask(id, {completed: true});
    setTasks(getTasks());
  };

  const renderTask = ({item: task}: {item: Task}) => (
    <View style={{alignItems: 'center', marginBottom: 8}}>
      <Text>{task.title}</Text>
      <Text>Status: {task.completed ? 'Completed' : 'To Do'}</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => handleRemove(task.id)}>
          <Text>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => handleEdit(task.id)}>
          <Text>Mark as Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', marginVertical: 20}}>
          <TextInput
            value={newTask}
            onChangeText={text => setNewTask(text)}
            style={{height: 36, width: '70%', borderWidth: 1}}
          />

          <TouchableOpacity
            style={{borderWidth: 1, padding: 8, alignItems: 'center'}}
            onPress={handleAdd}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        <Text>Tasks:</Text>
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  btn: {borderWidth: 1, padding: 4, alignItems: 'center'},
});

export default App;
