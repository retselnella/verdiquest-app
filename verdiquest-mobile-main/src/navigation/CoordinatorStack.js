import { createStackNavigator } from "@react-navigation/stack";
import CoordinatorLogin from "../screens/coordinator/CoordinatorLogin";
import CoordinatorRegistration from "../screens/coordinator/CoordinatorRegistration";
import OrgProfile from "../screens/coordinator/OrgProfile";
import { theme } from "../../assets/style";
import CoordInterface from "../screens/coordinator/CoordInterface";
import CoordinatorDashboard from "../screens/coordinator/CoordinatorDashboard";
import CoordinatorMaster from "../screens/coordinator/CoordinatorMaster";
import TaskMaster from "../screens/coordinator/TaskMaster";
import EventMaster from "../screens/coordinator/EventMaster";
import AddCoordinator from "../screens/coordinator/AddCoordinator";
import CoordinatorAddEvent from "../screens/coordinator/CoordinatorAddEvent";
import CreateTaskDashboard from "../screens/coordinator/CreateTaskDashboard";
import UpdateTaskDashboard from "../screens/coordinator/UpdateTaskDashboard";
import ViewSubmission from "../screens/coordinator/ViewSubmission";
import TaskView from "../screens/coordinator/TaskView";
import ViewSubmissionUser from "../screens/coordinator/ViewSubmissionUser";
import ViewEvent from "../screens/coordinator/ViewEvent";
import ViewParticipants from "../screens/coordinator/ViewParticipants";
import ReportEvent from "../screens/coordinator/ReportEvent";
import ReportFeedbacks from "../screens/coordinator/ReportFeedbacks";
import ReportMission from "../screens/coordinator/ReportMission";
import ReportTaskTakers from "../screens/coordinator/ReportTaskTakers";
import EditProfileCoordinator from "../screens/coordinator/EditProfileCoordinator";
import ViewOrganization from "../screens/coordinator/ViewOrganization";
import Organization from "../screens/coordinator/Organization";
import MemberView from "../screens/coordinator/MemberView";

const AppCoordinatorStack = createStackNavigator();

const CoordinatorStack = ({ route }) => {
  return (
    <AppCoordinatorStack.Navigator initialRouteName="CoordinatorLogin">
      <AppCoordinatorStack.Screen
        name="CoordinatorLogin"
        component={CoordinatorLogin}
        options={{
          headerShown: true,
          headerLeft: false,
          headerTitle: "",
          headerStyle: {
            backgroundColor: theme.colors.lightSecondary,
          },
        }}
      />
      <AppCoordinatorStack.Screen
        name="CoordinatorRegistration"
        component={CoordinatorRegistration}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="OrgProfile"
        component={OrgProfile}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="CoordInterface"
        component={CoordInterface}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="CoordinatorDashboard"
        component={CoordinatorDashboard}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="CoordinatorMaster"
        component={CoordinatorMaster}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="TaskMaster"
        component={TaskMaster}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="EventMaster"
        component={EventMaster}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="AddCoordinator"
        component={AddCoordinator}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="CoordinatorAddEvent"
        component={CoordinatorAddEvent}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="CreateTaskDashboard"
        component={CreateTaskDashboard}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="UpdateTaskDashboard"
        component={UpdateTaskDashboard}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="ViewSubmission"
        component={ViewSubmission}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="TaskView"
        component={TaskView}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="ViewSubmissionUser"
        component={ViewSubmissionUser}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="ViewEvent"
        component={ViewEvent}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="ViewParticipants"
        component={ViewParticipants}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="ReportEvent"
        component={ReportEvent}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="ReportFeedbacks"
        component={ReportFeedbacks}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="ReportMission"
        component={ReportMission}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="ReportTaskTakers"
        component={ReportTaskTakers}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="ViewOrganization"
        component={ViewOrganization}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="EditProfileCoordinator"
        component={EditProfileCoordinator}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="Organization"
        component={Organization}
        options={{
          headerShown: false,
        }}
      />
      <AppCoordinatorStack.Screen
        name="MemberView"
        component={MemberView}
        options={{
          headerShown: false,
        }}
      />
    </AppCoordinatorStack.Navigator>
  );
};

export default CoordinatorStack;
