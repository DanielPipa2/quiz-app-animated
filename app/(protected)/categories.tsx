import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { View, StyleSheet, FlatList } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { useFetchCategories } from "@/services/categories/categories.service.hooks";

export default function CategoriesScreen() {
	const { data: categories, status } = useFetchCategories();
	// total quizes per categories??
	const total = 0;

	const renderState = () => {
		if (status === "loading") {
			return <Text className="text-violet-500">Loading...</Text>;
		}

		if (status === "error") {
			return <Text className="text-violet-500">Error</Text>;
		}

		if (status === "success" && categories.length === 0) {
			return <Text className="text-violet-500">No categories found</Text>;
		}

		if (status === "success" && categories.length > 0) {
			return (
				<View style={styles.cardContainer}>
					<FlatList
						data={categories}
						renderItem={({ item }) => {
							const { icon, name, id: categoryId } = item;
							return (
								<Link href={`/category/${categoryId}`} asChild>
									<Button
										className="items-center justify-center"
										style={styles.button}
									>
										<View className="bg-background" style={styles.iconButton}>
											<FontAwesome
												name={icon as any}
												color="#6c5ce0"
												size={20}
											/>
										</View>
										<Text className="text-primary pt-1.5">{name}</Text>
										<Text className="text-primary" style={styles.quizText}>
											{total} Quizzes
										</Text>
									</Button>
								</Link>
							);
						}}
						numColumns={2}
						keyExtractor={(item) => item.id}
						columnWrapperStyle={styles.listContainer}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			);
		}

		return null;
	};

	return (
		<SafeAreaView className="flex-1 bg-primary">
			<H1 className="text-center text-white pt-6">Categories</H1>
			<View
				className="flex-1 items-center justify-center px-4"
				style={styles.categoryContainer}
			>
				{renderState()}
			</View>
			<Link href="/category/add" asChild>
				<Button style={styles.floatingButton}>
					<Text className="text-white" style={styles.plus}>
						+
					</Text>
				</Button>
			</Link>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	categoryContainer: {
		backgroundColor: "white",
		marginHorizontal: 8,
		borderRadius: 32,
		marginTop: 24,
		marginBottom: 10,
		flex: 1,
	},
	cardContainer: {
		marginVertical: 16,
	},
	listContainer: {
		justifyContent: "space-between",
		marginBottom: 16,
	},
	button: {
		width: "48%",
		height: 124,
		borderRadius: 24,
		backgroundColor: "#EFEEFC",
	},
	iconButton: {
		width: 48,
		height: 48,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
	},
	floatingButton: {
		borderRadius: 50,
		width: 50,
		height: 50,
		position: "absolute",
		bottom: 20,
		right: 20,
		backgroundColor: "#6c5ce0",
	},
	plus: {
		fontSize: 24,
		lineHeight: 26,
		fontWeight: "bold",
	},
	quizText: {
		fontSize: 10,
		lineHeight: 14,
		fontWeight: "400",
	},
});
