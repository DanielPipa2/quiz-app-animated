import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View, Image } from "react-native";

import { H3, Muted, Small, Large, P } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";

export default function TabOneScreen() {
	const { user } = useSupabase();
	const { full_name } = user?.user_metadata ?? {};

	return (
		<View
			className="flex-1 items-start justify-center bg-background gap-y-4"
			style={{ backgroundColor: "#6c5ce0" }}
		>
			<View className="p-4">
				<View className="flex flex-row items-center justify-between">
					<View className="flex flex-1 flex-col">
						<View className="flex flex-row items-center">
							<FontAwesome size={16} name="hand-peace-o" color="#d1d5db" />
							<Small className="!pl-2 !text-gray-300 uppercase pt-1 tracking-widest">
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
				<View className="!bg-rose-100 w-full !rounded-3xl p-6 mt-6 !justify-between flex-row items-center">
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
						<View className="flex !bg-rose-300 !rounded-full px-4 py-5">
							<P className="text-white tracking-wide font-bold">65%</P>
						</View>
					</View>
				</View>
			</View>
			<View className="!bg-background w-full !h-[480px] rounded-t-2xl p-6">
				<Large className="text-start font-bold pb-6">Live Quizzes</Large>
				<Muted className="">
					You are now authenticated and this session will persist even after
					closing the app.
				</Muted>
			</View>
		</View>
	);
}
