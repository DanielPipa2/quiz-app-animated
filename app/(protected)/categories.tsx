import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";

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
		<SafeAreaView className="flex-1 bg-primary">
			<H1 className="text-center text-white">Categories</H1>
			<View className="flex-1 items-center justify-center px-4">
				<View style={styles.cardContainer}>
					{categories.map((category, index) => {
						const { icon, name } = category;

						return (
							<Button
								key={index}
								className="items-center justify-center bg-primary-foreground"
								style={styles.button}
							>
								<View className="bg-background" style={styles.iconButton}>
									<FontAwesome name={icon as any} color="#6c5ce0" size={20} />
								</View>
								<Text className="text-primary">{name}</Text>
							</Button>
						);
					})}
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		gap: 10,
		marginTop: 24,
	},
	button: {
		width: "48%",
		height: 100,
		borderRadius: 16,
	},
	iconButton: {
		width: 50,
		height: 50,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 4,
	},
});
