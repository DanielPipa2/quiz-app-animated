import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";

import { AnimatedCounterProps } from "./AnimatedCounter.types";

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration }) => {
	const animatedValue = useRef(new Animated.Value(0)).current;
	const [displayValue, setDisplayValue] = useState(0);

	useEffect(() => {
		const listener = animatedValue.addListener(({ value }) => {
			setDisplayValue(Math.floor(value));
		});

		Animated.timing(animatedValue, {
			toValue: end,
			duration,
			useNativeDriver: false,
		}).start();

		return () => {
			animatedValue.removeListener(listener);
		};
	}, [end, duration, animatedValue]);

	return (
		<View style={styles.container}>
			<Text style={styles.counterText}>{displayValue}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	counterText: {
		fontSize: 48,
		fontWeight: "bold",
	},
});

export default AnimatedCounter;
