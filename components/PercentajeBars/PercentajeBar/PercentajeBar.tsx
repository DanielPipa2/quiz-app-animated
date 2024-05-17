import React, { useEffect, useRef } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";

import { PercentageBarProps } from "./PercentajeBar.types";

const PercentageBar: React.FC<PercentageBarProps> = ({
	value,
	duration,
	color,
}) => {
	const animatedValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: value,
			duration,
			useNativeDriver: false,
		}).start();
	}, [value, duration]);

	const height = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: ["0%", "100%"],
	});

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.bar, { height, backgroundColor: color }]} />
			<Text style={styles.label}>{`${Math.round(value)}%`}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 5,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	bar: {
		width: 50,
		borderRadius: 5,
	},
	label: {
		marginTop: 5,
		color: "black",
		fontWeight: "bold",
	},
});

export default PercentageBar;
