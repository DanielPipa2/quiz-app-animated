import { Video, ResizeMode } from "expo-av";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { View, Dimensions } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";

export default function WelcomeScreen() {
	const router = useRouter();
	const { width } = Dimensions.get("window");
	const video = React.useRef<any>(null);

	useEffect(() => {
		video.current?.playAsync();
	}, []);

	return (
		<SafeAreaView className="flex flex-1 p-4 bg-purple-50">
			<Video
				ref={video}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
				source={{
					uri: "https://cdn.pixabay.com/video/2024/05/30/214500_large.mp4",
				}}
				useNativeControls={false}
				resizeMode={ResizeMode.COVER}
				isLooping
			/>
			<View className="flex flex-1 items-center justify-center gap-y-4 ">
				<View className="flex items-center justify-center  w-80 h-80 relative">
					<H1
						className="text-center text-white shadow-sm absolute z-50"
						style={{
							zIndex: 1000,
						}}
					>
						Quiz App!
					</H1>
					<LottieView
						source={require("@/assets/lottie/logo.json")}
						autoPlay
						loop
						style={{
							height: width,
							width,
						}}
					/>
				</View>
			</View>
			<View className="flex flex-row gap-x-4">
				<Button
					className="flex-1"
					size="default"
					variant="default"
					onPress={() => {
						router.push("/sign-up");
					}}
				>
					<Text>Sign Up</Text>
				</Button>
				<Button
					className="flex-1"
					size="default"
					variant="secondary"
					onPress={() => {
						router.push("/sign-in");
					}}
				>
					<Text>Sign In</Text>
				</Button>
			</View>
		</SafeAreaView>
	);
}
