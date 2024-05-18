import {GestureHandlerRootView} from "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import RootNavigation from "./navigation/RootNavigation";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {Provider} from "react-redux";
import store from "./redux/store";


export default function App() {
    const queryClient = new QueryClient()

    return (
        <Provider store={store} >
            <QueryClientProvider client={queryClient} >
                <GestureHandlerRootView style={ {flex:1} } >
                    <NavigationContainer>
                        <RootNavigation/>
                    </NavigationContainer>
                </GestureHandlerRootView>
            </QueryClientProvider>
        </Provider>
    )
}
