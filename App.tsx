import {GestureHandlerRootView} from "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import RootNavigation from "./navigation/RootNavigation";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {Provider} from "react-redux";
import store from "./redux/store";
import {SafeAreaProvider} from "react-native-safe-area-context";


export default function App() {
    const queryClient = new QueryClient()

    return (
        <Provider store={store} >
            <QueryClientProvider client={queryClient} >
                <GestureHandlerRootView style={ {flex:1} } >
                    <SafeAreaProvider>
                        <NavigationContainer>
                            <RootNavigation/>
                        </NavigationContainer>
                    </SafeAreaProvider>
                </GestureHandlerRootView>
            </QueryClientProvider>
        </Provider>
    )
}
