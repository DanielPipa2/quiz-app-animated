import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	ToastAndroid,
	TextInput,
	Modal,
} from "react-native";
import { z } from "zod";

import { Button } from "../ui/button";
import { H4, Lead, P } from "../ui/typography";

import { SafeAreaView } from "@/components/safe-area-view";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { supabase } from "@/config/supabase";
import { useSupabase } from "@/context/supabase-provider";
import { Category } from "@/services/categories/categories.service.types";
import {
	useDeleteQuestion,
	usePostQuestion,
	useUpdateQuestion,
} from "@/services/questions/questions.service.hooks";
import {
	QuestionFormData,
	Questions,
} from "@/services/questions/questions.service.types";
import { usePostQuiz } from "@/services/quiz/quiz.service.hooks";

const formSchema = z
	.object({
		id: z.number().int(),
		title: z.string().min(3, "Please enter at least 3 characters."),
		description: z.string(),
	})
	.omit({ id: true });

const questionSchema = z.object({
	question: z.string().min(1, "Question is required"),
	seconds_per_question: z
		.string()
		.refine((val) => !Number.isNaN(parseInt(val, 10)), {
			message: "Ingrese solo números",
		}),
	wrong_answer_1: z.string().min(1, "Wrong Answer 1 is required"),
	wrong_answer_2: z.string().min(1, "Wrong Answer 2 is required"),
	wrong_answer_3: z.string().min(1, "Wrong Answer 3 is required"),
	correct_answer: z.string().min(1, "Correct Answer is required"),
});

const CreateNewQuiz = () => {
	const { mutateAsync: createQuiz } = usePostQuiz();
	const { mutateAsync: createQuestion } = usePostQuestion();
	const { mutateAsync: updateQuestion } = useUpdateQuestion();
	const { mutateAsync: deleteQuestion } = useDeleteQuestion();
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const [questions, setQuestions] = useState<Questions[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<
		string | undefined
	>();
	const [modalVisible, setModalVisible] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const { user } = useSupabase();
	const { back } = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		const { data, error } = await supabase.from("categories").select("*");

		if (error) {
			console.error("Error fetching categories:", error);
			return;
		}

		setCategories(data);
	};

	const handleAddQuestion = async (question: Questions) => {
		setLoading(true);
		try {
			const createdQuestionData = await createQuestion(question);
			if (createdQuestionData) {
				setLoading(false);
				ToastAndroid.show("Question created successfully.", ToastAndroid.SHORT);
			}
			setQuestions([...questions, question]);
			setModalVisible(false);
		} catch (error: Error | any) {
			setLoading(false);
			console.log(error.message);
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
		}
	};

	const handleEditQuestion = async (
		index: number,
		updatedQuestion: Questions,
	) => {
		setLoading(true);
		const updatedQuestions = questions.map((q, i) =>
			i === index ? updatedQuestion : q,
		);
		try {
			const updateQuestionData = await updateQuestion(updatedQuestion);
			if (updateQuestionData) {
				setLoading(false);
				ToastAndroid.show("Question updated successfully.", ToastAndroid.SHORT);
			}
			setQuestions(updatedQuestions);
			setModalVisible(false);
		} catch (error: Error | any) {
			setLoading(false);
			console.log(error.message);
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
		}
	};

	const handleDeleteQuestion = async (index: number) => {
		setLoading(true);
		const updatedQuestions = questions.filter((_, i) => i !== index);
		try {
			const deleteQuestionData = await deleteQuestion(index);
			if (deleteQuestionData) {
				setLoading(false);
				ToastAndroid.show("Question deleted successfully.", ToastAndroid.SHORT);
			}
			setQuestions(updatedQuestions);
		} catch (error: Error | any) {
			setLoading(false);
			console.log(error.message);
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
		}
	};

	async function onSubmit(data: z.infer<typeof formSchema>) {
		setLoading(true);
		if (!selectedCategory) {
			setLoading(false);
			ToastAndroid.show("Please select a category.", ToastAndroid.SHORT);
			return;
		}
		try {
			const createdData = await createQuiz({
				title: data.title ?? "",
				description: data.description ?? "",
				category_id: selectedCategory ? Number(selectedCategory) : 1,
				host_id: user?.id ?? "",
				image: "",
				status: "ACTIVE",
				questions_id: questions.map((question) => question.id) ?? null,
			});

			if (createdData) {
				setLoading(false);
				ToastAndroid.show("Quiz created successfully.", ToastAndroid.SHORT);
			}
			form.reset();
			setQuestions([]);
			back();
		} catch (error: Error | any) {
			setLoading(false);
			console.log(error.message);
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
		}
	}

	if (loading)
		return (
			<View className="flex-1 items-center justify-center px-4">
				<Text>Loading...</Text>
			</View>
		);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				className="flex flex-1 gap-3 px-4 py-5"
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.container}>
					<Form {...form}>
						<Lead className="text-black font-medium pb-2">Title</Lead>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormInput
									label=""
									placeholder="Quiz name"
									autoCapitalize="none"
									autoComplete="off"
									autoCorrect={false}
									keyboardType="default"
									className="rounded-2xl pl-6 dark:bg-white border-gray-200 dark:text-black"
									style={styles.inputStyle}
									{...field}
								/>
							)}
						/>
						<Lead className="text-black font-medium pt-4 pb-2">
							Description
						</Lead>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormInput
									label=""
									placeholder="Quiz description"
									autoCapitalize="none"
									autoComplete="off"
									autoCorrect={false}
									keyboardType="default"
									className="rounded-2xl pl-6 dark:bg-white border-gray-200 dark:text-black"
									style={styles.inputStyle}
									{...field}
								/>
							)}
						/>
						<Lead className="text-black font-medium pt-4 pb-2">
							Quiz Category
						</Lead>
						<View className="border-2 rounded-3xl pl-6 w-full border-gray-200 mb-2">
							<Picker
								selectedValue={selectedCategory}
								onValueChange={(itemValue) => setSelectedCategory(itemValue)}
								style={{ height: 50, width: "100%" }}
							>
								{categories.map((category) => (
									<Picker.Item
										key={category.id}
										label={category.name}
										value={category.id}
									/>
								))}
							</Picker>
						</View>
					</Form>
					<Lead className="text-black font-medium py-2">Questions</Lead>
					<Button
						size="lg"
						className="w-full bg-white border-2 !border-[#6c5ce0] rounded-2xl mb-4"
						onPress={() => {
							setCurrentQuestion(null);
							setModalVisible(true);
						}}
					>
						<P className="font-bold text-[#6c5ce0]">Add question</P>
					</Button>
					{questions.length > 0 &&
						questions.map((question, index) => (
							<View key={index} style={styles.questionContainer}>
								<Text numberOfLines={1} style={{ flex: 1 }}>
									{question.question}
								</Text>
								<Button
									className="bg-gray-200 mr-2"
									onPress={() => {
										// @ts-ignore
										setCurrentQuestion({ ...question, index });
										setModalVisible(true);
									}}
								>
									<P className="text-gray-600">Edit</P>
								</Button>
								<Button
									className="bg-red-200"
									onPress={() => handleDeleteQuestion(index)}
								>
									<P className="text-red-600">Delete</P>
								</Button>
							</View>
						))}
				</View>
			</ScrollView>

			<Button
				className="rounded-2xl m-4 bottom-0 dark:bg-[#6c5ce0]"
				size="lg"
				onPress={form.handleSubmit(onSubmit)}
			>
				<H4 className="text-white font-bold">Create Quiz</H4>
			</Button>
			{modalVisible && (
				<QuestionForm
					visible={modalVisible}
					onClose={() => setModalVisible(false)}
					// @ts-ignore
					onSave={currentQuestion ? handleEditQuestion : handleAddQuestion}
					currentQuestion={currentQuestion}
				/>
			)}
		</SafeAreaView>
	);
};

const QuestionForm = ({
	visible,
	onClose,
	onSave,
	currentQuestion,
}: {
	visible: boolean;
	onClose: () => void;
	onSave: (data: QuestionFormData) => void;
	currentQuestion?: QuestionFormData | null;
}) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: zodResolver(questionSchema),
		defaultValues: currentQuestion || {
			question: "",
			seconds_per_question: 0,
			wrong_answer_1: "",
			wrong_answer_2: "",
			wrong_answer_3: "",
			correct_answer: "",
		},
	});
	const { mutateAsync: createQuestion } = usePostQuestion();

	useEffect(() => {
		if (currentQuestion) {
			Object.keys(currentQuestion).forEach((key) => {
				// @ts-ignore
				setValue(key, currentQuestion[key]);
			});
		}
	}, [currentQuestion]);

	const onSubmit = async (data: any) => {
		onSave(data);
		try {
			const createdQuestionData = await createQuestion(data);
			if (createdQuestionData) {
				ToastAndroid.show("Question created successfully.", ToastAndroid.SHORT);
			}
			onClose();
		} catch (error: Error | any) {
			console.log(error.message);
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
		}
	};

	return (
		<Modal transparent visible={visible} onRequestClose={onClose}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.editTitle}>Add/Edit Question</Text>
					<P className="text-black font-medium pb-2">Title</P>
					<Controller
						control={control}
						name="question"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								placeholder="Question"
								style={styles.inputStyle}
								className="border-2 rounded-2xl pl-6 w-full border-gray-200"
							/>
						)}
					/>
					{errors.question && (
						<Text style={styles.error}>{errors?.question?.message ?? ""}</Text>
					)}

					<P className="text-black font-medium pt-4 pb-2">
						Seconds per question
					</P>
					<Controller
						control={control}
						name="seconds_per_question"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								onBlur={onBlur}
								onChangeText={onChange}
								value={value.toString()}
								keyboardType="numeric"
								placeholder="Seconds per Question"
								style={styles.inputStyle}
								className="border-2 rounded-2xl pl-6 w-full border-gray-200"
							/>
						)}
					/>
					{errors.seconds_per_question && (
						<Text style={styles.error}>
							{errors?.seconds_per_question?.message ?? ""}
						</Text>
					)}

					<P className="text-black font-medium pt-4 pb-2">Wrong Answer 1</P>
					<Controller
						control={control}
						name="wrong_answer_1"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								placeholder="Wrong Answer 1"
								style={styles.inputStyle}
								className="border-2 rounded-2xl pl-6 w-full border-gray-200"
							/>
						)}
					/>
					{errors.wrong_answer_1 && (
						<Text style={styles.error}>
							{errors?.wrong_answer_1?.message ?? ""}
						</Text>
					)}

					<P className="text-black font-medium pt-4 pb-2">Wrong Answer 2</P>
					<Controller
						control={control}
						name="wrong_answer_2"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								placeholder="Wrong Answer 2"
								style={styles.inputStyle}
								className="border-2 rounded-2xl pl-6 w-full border-gray-200"
							/>
						)}
					/>
					{errors.wrong_answer_2 && (
						<Text style={styles.error}>
							{errors?.wrong_answer_2?.message ?? ""}
						</Text>
					)}

					<P className="text-black font-medium pt-4 pb-2">Wrong Answer 3</P>
					<Controller
						control={control}
						name="wrong_answer_3"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								placeholder="Wrong Answer 3"
								style={styles.inputStyle}
								className="border-2 rounded-2xl pl-6 w-full border-gray-200"
							/>
						)}
					/>
					{errors.wrong_answer_3 && (
						<Text style={styles.error}>
							{errors?.wrong_answer_3?.message ?? ""}
						</Text>
					)}

					<P className="text-black font-medium pt-4 pb-2">Correct Answer</P>
					<Controller
						control={control}
						name="correct_answer"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								placeholder="Correct Answer"
								style={styles.inputStyle}
								className="border-2 rounded-2xl pl-6 w-full border-gray-200"
							/>
						)}
					/>
					{errors.correct_answer && (
						<Text style={styles.error}>
							{errors?.correct_answer?.message ?? ""}
						</Text>
					)}

					<Button
						onPress={handleSubmit(onSubmit)}
						className="rounded-2xl w-full bg-[#6c5ce0] my-2"
						size="lg"
					>
						<P className="font-bold text-white text-center">Save</P>
					</Button>
					<Button
						onPress={onClose}
						className="rounded-2xl w-full bg-gray-200"
						size="lg"
					>
						<P className="font-bold text-[#6c5ce0]">Cancel</P>
					</Button>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		marginHorizontal: 8,
		borderRadius: 32,
		marginTop: 24,
		marginBottom: 16,
	},
	inputStyle: {
		height: 50,
		borderWidth: 2,
		borderRadius: 20,
	},
	questionContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalContent: {
		width: 300,
		padding: 20,
		backgroundColor: "white",
		borderRadius: 10,
	},
	editTitle: {
		fontSize: 16,
		fontWeight: "800",
		textAlign: "center",
	},
	error: {
		color: "red",
		fontSize: 12,
	},
});

export default CreateNewQuiz;
