import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";

import { Button } from "@/components/ui/button";
import { H1, Large, P, Small } from "@/components/ui/typography";

export default function QuestionResult() {
	const { back } = useRouter();

	return (
		<View className="items-start px-6 justify-center bg-background gap-y-4">
			<View className="flex w-full flex-row items-center justify-end">
				<View className="w-4 h-4" />
				<Button className="bg-background" onPress={back}>
					<FontAwesome name="close" size={25} color="black" />
				</Button>
			</View>
			<H1 className="font-bold text-center w-full">Good Job!</H1>
			<View className="bg-[#FF8FA2] !rounded-3xl w-full p-6 justify-center items-center">
				<Image
					source={require("assets/trophy.png")}
					style={{ width: 200, height: 160 }}
				/>
				<P className="text-white font-bold mt-6">You get +80 Quiz Points</P>
				<Button
					className="mt-6 rounded-2xl !h-14 bg-[#FFB1BE]"
					variant="default"
				>
					<P className="text-white font-bold !px-4">Check Correct Answer</P>
				</Button>
			</View>
			<View className="mt-4 flex-row gap-6 justify-between pl-4">
				<View className="gap-2 w-1/2">
					<Small className="text-gray-500 font-bold uppercase tracking-wider">
						Correct answer
					</Small>
					<Large className="!font-bold tracking-wide">7 questions</Large>
				</View>
				<View className="gap-2">
					<Small className="text-gray-500 font-bold uppercase tracking-wider">
						Completion
					</Small>
					<Large className="!font-bold tracking-wide">80%</Large>
				</View>
			</View>
			<View className="mt-2 flex-row gap-6 justify-between pl-4">
				<View className="gap-2 w-1/2">
					<Small className="text-gray-500 font-bold uppercase tracking-wider">
						Skipped
					</Small>
					<Large className="!font-bold tracking-wide">2</Large>
				</View>
				<View className="gap-2 ">
					<Small className="text-gray-500 font-bold uppercase tracking-wider">
						Incorrect answer
					</Small>
					<Large className="!font-bold tracking-wide">1</Large>
				</View>
			</View>
			<View className="w-full mt-4">
				<Button className="mt-6 rounded-2xl !h-14" variant="default">
					<P className="text-white font-bold !px-24 tracking-normal">Done</P>
				</Button>
			</View>
		</View>
	);
}
