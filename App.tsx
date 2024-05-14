import {GestureHandlerRootView} from "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import RootNavigation from "./navigation/RootNavigation";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";


export default function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient} >
            <GestureHandlerRootView style={ {flex:1} } >
                <NavigationContainer>
                    <RootNavigation/>
                </NavigationContainer>
            </GestureHandlerRootView>
        </QueryClientProvider>
    )
}
