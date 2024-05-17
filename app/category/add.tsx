import FontAwesome from "@expo/vector-icons/FontAwesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { H1, H4, Lead } from "@/components/ui/typography";
import { usePostCategory } from "@/services/categories/categories.service.hooks";

const formSchema = z.object({
	name: z.string().min(3, "Please enter at least 3 characters."),
	icon: z.string().min(3, "Please enter at least 3 characters."),
});

export default function NewCategory() {
	const { mutateAsync: createCategory } = usePostCategory();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			icon: "",
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			await createCategory({
				name: data.name,
				icon: data.icon,
			});
			form.reset();
		} catch (error: Error | any) {
			console.log(error.message);
		}
	}

	return (
		<SafeAreaView className="flex-1 bg-primary pt-10">
			<StatusBar style="light" />
			<View className="flex-row justify-start px-6 pt-8 items-center">
				<FontAwesome name="chevron-left" size={20} color="white" />
				<H1 className="text-center text-white pl-4">Create category</H1>
			</View>
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
						<FormField
							control={form.control}
							name="icon"
							render={({ field }) => (
								<FormInput
									label=""
									placeholder="Icon name"
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
	inputStyle: {
		height: 50,
		borderWidth: 2,
		borderRadius: 20,
	},
});
