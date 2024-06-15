import React from 'react';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { StyleSheet, View } from 'react-native';

function Loader() {

    const duration = 2000;
    const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

    const sv = useSharedValue<number>(0);

    React.useEffect(() => {
        sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${sv.value * 360}deg` }],
    }));




    return (
        <View style={[styles.container, StyleSheet.absoluteFill]} >
            <Animated.Image
                source={require('../assets/icons/splash.png')}
                style={[{width: '80%', height: '80%', resizeMode: 'contain'}, animatedStyle]}
            />
        </View>
    )
}

export default Loader;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    }
})

