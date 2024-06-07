// App.js
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import AnimatedCounter from "@/components/AnimatedCounter/AnimatedCounter";

const AnimatedCounterScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<AnimatedCounter end={100} duration={3000} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF",
	},
});

export default AnimatedCounterScreen;
