import React from "react";
import { View, StyleSheet } from "react-native";

import PercentageBar from "./PercentajeBar/PercentajeBar";
import { PercentageBarsProps } from "./PercentajeBars.types";

const PercentageBars: React.FC<PercentageBarsProps> = ({
	values,
	duration,
	colors,
}) => {
	return (
		<View style={styles.container}>
			{values.map((value, index) => (
				<PercentageBar
					key={index}
					value={value}
					duration={duration}
					color={colors[index]}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "center",
		height: 200,
		paddingHorizontal: 20,
	},
});

export default PercentageBars;
