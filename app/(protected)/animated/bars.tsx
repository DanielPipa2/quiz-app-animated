import { StyleSheet } from "react-native";

import PercentageBars from "@/components/PercentajeBars/PercentajeBars";
import { SafeAreaView } from "@/components/safe-area-view";

const CategoriesScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<PercentageBars
				values={[75, 50, 25]}
				duration={2000}
				colors={["#3498db", "#2ecc71", "#e74c3c"]}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#B5FCFF",
	},
});

export default CategoriesScreen;
