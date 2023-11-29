import { createStackNavigator } from "@react-navigation/stack";
import TaskList from "../screens/TaskList";
import Task from "../screens/Task";
import TaskDetails from "../screens/TaskDetails";
import MyPoints from "../screens/MyPoints";

const AppTaskStack = createStackNavigator();

const TaskStack = ({ route, navigation }) => {
  const { user, title } = route.params;
  return (
    <AppTaskStack.Navigator initialRouteName="TaskList">
      <AppTaskStack.Screen
        name="TaskList"
        component={TaskList}
        initialParams={{ user: user, title: title }}
        options={{
          headerShown: false,
        }}
      />
      <AppTaskStack.Screen
        name="Task"
        component={Task}
        initialParams={{ user: user }}
        options={{
          headerShown: false,
        }}
      />
      <AppTaskStack.Screen
        name="TaskDetails"
        component={TaskDetails}
        initialParams={{ user: user, title: title }}
        options={{
          headerShown: false,
        }}
      />
      <AppTaskStack.Screen
        name="MyPoints"
        component={MyPoints}
        initialParams={{ user: user }}
        options={{
          headerShown: false,
        }}
      />
    </AppTaskStack.Navigator>
  );
};

export default TaskStack;
