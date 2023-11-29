import { createStackNavigator } from "@react-navigation/stack";
import Partners from "../screens/Partners";
import PartnerOverview from "../screens/PartnerOverview";
import SuccessJoin from "../screens/SuccessJoin";
import OrgHome from "../screens/OrgHome";
import OrgView from "../screens/OrgView";

const AppPartnerStack = createStackNavigator();


const PartnerStack = ({route,navigation}) => {
    const {user, title} = route.params;
    return (
        <AppPartnerStack.Navigator initialRouteName='Partners'>
            <AppPartnerStack.Screen name="Partner" component={Partners}
            initialParams={{user: user, title: title}}
            options={{
                headerShown:false
            }}
            />
            <AppPartnerStack.Screen name="PartnerOverview" component={PartnerOverview}
            initialParams={{user: user, title: title}}
            options={{
                headerShown:false
            }}
            />

            <AppPartnerStack.Screen name="SuccessJoin" component={SuccessJoin}
            initialParams={{user: user, title: title}}
            options={{
                headerShown:false
            }}
            />
            <AppPartnerStack.Screen name="OrgHome" component={OrgHome}
            initialParams={{user: user, title: title}}
            options={{
                headerShown:false
            }}
            />    
            <AppPartnerStack.Screen name="OrgView" component={OrgView}
            initialParams={{user: user, title: title}}
            options={{
                headerShown:false
            }}
            />        
        </AppPartnerStack.Navigator>
    );
};


export default PartnerStack;