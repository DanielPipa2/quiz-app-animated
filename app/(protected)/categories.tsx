import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import PercentageBars from "@/components/PercentajeBars/PercentajeBars";

// TODO: mocked data for now
const categories = [
	{
		id: 0,
		name: "English",
		icon: "book",
	},
	{
		id: 1,
		name: "Math",
		icon: "calculator",
	},
	{
		id: 2,
		name: "Science",
		icon: "flask",
	},
	{
		id: 3,
		name: "Sports",
		icon: "soccer-ball-o",
	},
	{
		id: 4,
		name: "Music",
		icon: "music",
	},
];

export default function CategoriesScreen() {
	const router = useRouter();

	return (
		<SafeAreaView style={styles.container}>
			<PercentageBars
				values={[75, 50, 25]}
				duration={2000}
				colors={["#3498db", "#2ecc71", "#e74c3c"]}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#B5FCFF",
	},
});
