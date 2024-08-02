import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import CreateQuiz from "@/components/CreateQuiz/CreateQuiz";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";

export default function NewQuiz() {
	const { back } = useRouter();

	return (
		<SafeAreaView
			className="flex-1 pt-0"
			style={{ backgroundColor: "#6c5ce0" }}
		>
			<Button onPress={back} style={styles.headerButton}>
				<FontAwesome name="chevron-left" size={20} color="white" />
				<H1 className="text-white pl-4">Create Quiz</H1>
			</Button>
			<View style={styles.container}>
				<CreateQuiz />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		marginHorizontal: 8,
		borderRadius: 32,
		marginTop: 24,
		marginBottom: 10,
		flex: 1,
	},
	headerButton: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 20,
		justifyContent: "flex-start",
		height: 56,
		backgroundColor: "#6c5ce0",
	},
	inputStyle: {
		height: 50,
		borderWidth: 2,
		borderRadius: 20,
	},
	gridIcons: {
		flexDirection: "row",
		flexWrap: "wrap",
		flex: 1,
		overflow: "hidden",
	},
	iconContainer: {
		padding: 14,
		margin: 4,
		borderWidth: 1,
		borderColor: "#EFEEFC",
		borderRadius: 8,
		backgroundColor: "#EFEEFC",
	},
	selectedIconContainer: {
		backgroundColor: "#b7b2fc",
	},
});
