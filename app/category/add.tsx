import FontAwesome from "@expo/vector-icons/FontAwesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	SafeAreaView,
	StyleSheet,
	ToastAndroid,
	TouchableOpacity,
	View,
} from "react-native";
import { z } from "zod";

import { availableIcons } from "@/components/CategoryDetails/CategoryDetails.types";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { H1, H4, Lead } from "@/components/ui/typography";
import { usePostCategory } from "@/services/categories/categories.service.hooks";

const formSchema = z.object({
	name: z.string().min(3, "Please enter at least 3 characters."),
});

export default function NewCategory() {
	const { mutateAsync: createCategory } = usePostCategory();
	const { back } = useRouter();
	const [selectedIcon, setSelectedIcon] = useState("");
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		if (!selectedIcon) {
			ToastAndroid.show("Please select an icon.", ToastAndroid.SHORT);
			return;
		}
		try {
			const createdData = await createCategory({
				name: data.name,
				icon: selectedIcon,
			});
			if (createdData) {
				ToastAndroid.show("Category created successfully.", ToastAndroid.SHORT);
			}
			form.reset();
			back();
		} catch (error: Error | any) {
			console.log(error.message);
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
		}
	}

	const handleIconSelection = (icon: string) => {
		setSelectedIcon(icon);
	};

	return (
		<SafeAreaView className="flex-1 bg-primary pt-10">
			<Button onPress={back} style={styles.headerButton}>
				<FontAwesome name="chevron-left" size={20} color="white" />
				<H1 className="text-white pl-4">Create category</H1>
			</Button>
			<View style={styles.container}>
				<View className="flex-1 gap-3 px-4 py-5">
					<Form {...form}>
						<Lead className="text-black font-medium">Name</Lead>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormInput
									label=""
									placeholder="Category name"
									autoCapitalize="none"
									autoComplete="off"
									autoCorrect={false}
									keyboardType="default"
									className="rounded-2xl pl-6"
									style={styles.inputStyle}
									{...field}
								/>
							)}
						/>
						<Lead className="text-black font-medium pt-2">Icon</Lead>
						<View style={styles.gridIcons}>
							{Array.from(availableIcons).map((icon, index) => (
								<TouchableOpacity
									key={index}
									style={[
										styles.iconContainer,
										selectedIcon === icon && styles.selectedIconContainer,
									]}
									onPress={() => handleIconSelection(icon)}
								>
									<FontAwesome name={icon as any} size={22} color="#6c5ce0" />
								</TouchableOpacity>
							))}
						</View>
					</Form>
				</View>
				<Button
					className="rounded-2xl m-4"
					size="lg"
					onPress={form.handleSubmit(onSubmit)}
				>
					<H4 className="text-white font-bold">Add Category</H4>
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
