import {GestureHandlerRootView} from "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import RootNavigation from "./navigation/RootNavigation";


export default function App() {

  return (
      <GestureHandlerRootView style={ {flex:1} } >
        <NavigationContainer>
          <RootNavigation/>
        </NavigationContainer>
      </GestureHandlerRootView>
  )
}
