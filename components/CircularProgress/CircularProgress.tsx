import React, { useCallback } from "react";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedProps,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const BACKGROUND_COLOR = "#444B6F";
const BACKGROUND_STROKE_COLOR = "#303858";
const STROKE_COLOR = "#A6E1FA";

const { width, height } = Dimensions.get("window");

const CIRCLE_LENGTH = 1000;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedCircleComponent = () => {
	const progress = useSharedValue(0);

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
	}));

	const onPress = useCallback(() => {
		progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 });
	}, []);

	return (
		<View style={styles.container}>
			<Svg style={{ position: "absolute" }}>
				<Circle
					cx={width / 2}
					cy={height / 2}
					r={R}
					stroke={BACKGROUND_STROKE_COLOR}
					strokeWidth={30}
				/>
				<AnimatedCircle
					cx={width / 2}
					cy={height / 2}
					r={R}
					stroke={STROKE_COLOR}
					strokeWidth={15}
					strokeDasharray={CIRCLE_LENGTH}
					animatedProps={animatedProps}
					strokeLinecap="round"
				/>
			</Svg>
			<TouchableOpacity onPress={onPress} style={styles.button}>
				<Text style={styles.buttonText}>Run</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AnimatedCircleComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: BACKGROUND_COLOR,
		alignItems: "center",
		justifyContent: "center",
	},
	progressText: {
		fontSize: 80,
		color: "rgba(256,256,256,0.7)",
		width: 200,
		textAlign: "center",
	},
	button: {
		position: "absolute",
		bottom: 80,
		width: width * 0.7,
		height: 60,
		backgroundColor: BACKGROUND_STROKE_COLOR,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		fontSize: 25,
		color: "white",
		letterSpacing: 2.0,
	},
});
