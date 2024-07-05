import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

import CreateQuestion from "@/components/CreateQuestion/CreateQuestion";
import { Button } from "@/components/ui/button";
import { H1, H4 } from "@/components/ui/typography";

export default function NewCategory() {
	const { back } = useRouter();

	return (
		<SafeAreaView className="flex-1 bg-primary pt-10">
			<Button onPress={back} style={styles.headerButton}>
				<FontAwesome name="chevron-left" size={20} color="white" />
				<H1 className="text-white pl-4">Create Quiz</H1>
			</Button>
			<View style={styles.container}>
				<View className="flex-1 gap-3 px-4 py-5">
					<CreateQuestion />
				</View>
				<Button className="rounded-2xl m-4" size="lg" onPress={back}>
					<H4 className="text-white font-bold">Finish</H4>
				</Button>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
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
