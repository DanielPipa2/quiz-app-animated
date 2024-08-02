import { View } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { H1, P } from "@/components/ui/typography";

export default function DiscoverScreen() {
	return (
		<SafeAreaView
			className="flex-1 bg-primary"
			style={{ backgroundColor: "#6c5ce0" }}
		>
			<H1 className="text-center text-white pt-6">Descubre</H1>
			<View className="justify-center items-center pt-6">
				<P className="text-white">asdasd</P>
			</View>
		</SafeAreaView>
	);
}
