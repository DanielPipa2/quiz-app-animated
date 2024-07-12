import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { View, Image, Text, StyleSheet } from "react-native";

import { Button } from "@/components/ui/button";
import { H3, Small, Large, P } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";

export default function TabOneScreen() {
	const { user } = useSupabase();
	const { full_name } = user?.user_metadata ?? {};

	return (
		<View
			className="items-start justify-center bg-background gap-y-4"
			style={{ backgroundColor: "#6c5ce0" }}
		>
			<View className="p-4">
				<View className="flex flex-row items-center justify-between">
					<View className="flex flex-1 flex-col">
						<View className="flex flex-row items-center">
							<FontAwesome size={16} name="hand-peace-o" color="#d1d5db" />
							<Small className="pl-2 text-gray-300 uppercase pt-1 tracking-widest">
								Welcome
							</Small>
						</View>
						<H3 className="text-start mt-1.5 tracking-wide text-white">
							{full_name}
						</H3>
					</View>
					<Image
						source={{
							uri: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
						}}
						height={48}
						width={48}
					/>
				</View>
				<View className="bg-rose-100 w-full rounded-3xl p-6 mt-6 justify-between flex-row items-center">
					<View>
						<Small className="text-rose-800 text-start uppercase pt-1 tracking-widest">
							RECENT QUIZ
						</Small>
						<View className="flex flex-row items-center pt-1">
							<FontAwesome size={18} name="headphones" color="#500000" />
							<Large className="text-start pl-1.5 tracking-wide text-[#500000]">
								A Basic Music Quiz
							</Large>
						</View>
					</View>
					<View>
						<View className="flex bg-rose-300 rounded-full px-4 py-5">
							<P className="text-white tracking-wide font-bold">65%</P>
						</View>
					</View>
				</View>
			</View>
			<View className="bg-background w-full h-[548px] rounded-t-2xl p-6">
				<Large className="text-start font-bold pb-6">Live Quizzes</Large>
				<View className="flex flex-row items-center p-3">
					<FontAwesome name="book" color="#6c5ce0" size={70} />
					<View className="flex-1 ml-4">
						<Large className="text-start font-bold pb-3 text-lg pl-2 -mt-4">
							Statistic Math Quiz
						</Large>
						<Small className="pl-2 text-gray-500">Math - 12 quizzes</Small>
					</View>
					<FontAwesome name="arrow-right" color="#6c5ce0" size={24} />
				</View>
			</View>
			<Link href="/quizzes/add" asChild>
				<Button style={styles.floatingButton}>
					<Text className="text-white" style={styles.plus}>
						+
					</Text>
				</Button>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	floatingButton: {
		borderRadius: 50,
		width: 50,
		height: 50,
		position: "absolute",
		bottom: 20,
		right: 170,
		backgroundColor: "#6c5ce0",
	},
	plus: {
		fontSize: 24,
		lineHeight: 26,
		fontWeight: "bold",
	},
});
