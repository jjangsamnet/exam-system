import { UpsertUserData, UpsertUserVariables, CreateCategoryData, CreateCategoryVariables, UpdateCategoryData, UpdateCategoryVariables, DeleteCategoryData, DeleteCategoryVariables, CreateQuestionData, CreateQuestionVariables, UpdateQuestionData, UpdateQuestionVariables, DeleteQuestionData, DeleteQuestionVariables, AddChoiceData, AddChoiceVariables, UpdateChoiceData, UpdateChoiceVariables, DeleteChoiceData, DeleteChoiceVariables, AddAnswerData, AddAnswerVariables, UpdateAnswerData, UpdateAnswerVariables, CreateExamData, CreateExamVariables, UpdateExamData, UpdateExamVariables, DeleteExamData, DeleteExamVariables, AddQuestionToExamData, AddQuestionToExamVariables, RemoveQuestionFromExamData, RemoveQuestionFromExamVariables, StartExamData, StartExamVariables, SubmitAnswerData, SubmitAnswerVariables, SubmitExamData, SubmitExamVariables, GradeSubjectiveAnswerData, GradeSubjectiveAnswerVariables, FinalizeExamGradingData, FinalizeExamGradingVariables, UpdateQuestionStatisticsData, UpdateQuestionStatisticsVariables, GetCurrentUserData, ListAllUsersData, ListCategoriesData, ListQuestionsData, ListQuestionsVariables, GetQuestionByIdData, GetQuestionByIdVariables, ListExamsData, ListExamsVariables, GetExamByIdData, GetExamByIdVariables, ListMyExamAttemptsData, GetExamAttemptByIdData, GetExamAttemptByIdVariables, GetExamAttemptsByExamData, GetExamAttemptsByExamVariables, GetQuestionStatisticsData, GetQuestionStatisticsVariables, ListAvailableExamsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useUpsertUser(options?: useDataConnectMutationOptions<UpsertUserData, FirebaseError, UpsertUserVariables>): UseDataConnectMutationResult<UpsertUserData, UpsertUserVariables>;
export function useUpsertUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertUserData, FirebaseError, UpsertUserVariables>): UseDataConnectMutationResult<UpsertUserData, UpsertUserVariables>;

export function useCreateCategory(options?: useDataConnectMutationOptions<CreateCategoryData, FirebaseError, CreateCategoryVariables>): UseDataConnectMutationResult<CreateCategoryData, CreateCategoryVariables>;
export function useCreateCategory(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCategoryData, FirebaseError, CreateCategoryVariables>): UseDataConnectMutationResult<CreateCategoryData, CreateCategoryVariables>;

export function useUpdateCategory(options?: useDataConnectMutationOptions<UpdateCategoryData, FirebaseError, UpdateCategoryVariables>): UseDataConnectMutationResult<UpdateCategoryData, UpdateCategoryVariables>;
export function useUpdateCategory(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCategoryData, FirebaseError, UpdateCategoryVariables>): UseDataConnectMutationResult<UpdateCategoryData, UpdateCategoryVariables>;

export function useDeleteCategory(options?: useDataConnectMutationOptions<DeleteCategoryData, FirebaseError, DeleteCategoryVariables>): UseDataConnectMutationResult<DeleteCategoryData, DeleteCategoryVariables>;
export function useDeleteCategory(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteCategoryData, FirebaseError, DeleteCategoryVariables>): UseDataConnectMutationResult<DeleteCategoryData, DeleteCategoryVariables>;

export function useCreateQuestion(options?: useDataConnectMutationOptions<CreateQuestionData, FirebaseError, CreateQuestionVariables>): UseDataConnectMutationResult<CreateQuestionData, CreateQuestionVariables>;
export function useCreateQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQuestionData, FirebaseError, CreateQuestionVariables>): UseDataConnectMutationResult<CreateQuestionData, CreateQuestionVariables>;

export function useUpdateQuestion(options?: useDataConnectMutationOptions<UpdateQuestionData, FirebaseError, UpdateQuestionVariables>): UseDataConnectMutationResult<UpdateQuestionData, UpdateQuestionVariables>;
export function useUpdateQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateQuestionData, FirebaseError, UpdateQuestionVariables>): UseDataConnectMutationResult<UpdateQuestionData, UpdateQuestionVariables>;

export function useDeleteQuestion(options?: useDataConnectMutationOptions<DeleteQuestionData, FirebaseError, DeleteQuestionVariables>): UseDataConnectMutationResult<DeleteQuestionData, DeleteQuestionVariables>;
export function useDeleteQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteQuestionData, FirebaseError, DeleteQuestionVariables>): UseDataConnectMutationResult<DeleteQuestionData, DeleteQuestionVariables>;

export function useAddChoice(options?: useDataConnectMutationOptions<AddChoiceData, FirebaseError, AddChoiceVariables>): UseDataConnectMutationResult<AddChoiceData, AddChoiceVariables>;
export function useAddChoice(dc: DataConnect, options?: useDataConnectMutationOptions<AddChoiceData, FirebaseError, AddChoiceVariables>): UseDataConnectMutationResult<AddChoiceData, AddChoiceVariables>;

export function useUpdateChoice(options?: useDataConnectMutationOptions<UpdateChoiceData, FirebaseError, UpdateChoiceVariables>): UseDataConnectMutationResult<UpdateChoiceData, UpdateChoiceVariables>;
export function useUpdateChoice(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateChoiceData, FirebaseError, UpdateChoiceVariables>): UseDataConnectMutationResult<UpdateChoiceData, UpdateChoiceVariables>;

export function useDeleteChoice(options?: useDataConnectMutationOptions<DeleteChoiceData, FirebaseError, DeleteChoiceVariables>): UseDataConnectMutationResult<DeleteChoiceData, DeleteChoiceVariables>;
export function useDeleteChoice(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteChoiceData, FirebaseError, DeleteChoiceVariables>): UseDataConnectMutationResult<DeleteChoiceData, DeleteChoiceVariables>;

export function useAddAnswer(options?: useDataConnectMutationOptions<AddAnswerData, FirebaseError, AddAnswerVariables>): UseDataConnectMutationResult<AddAnswerData, AddAnswerVariables>;
export function useAddAnswer(dc: DataConnect, options?: useDataConnectMutationOptions<AddAnswerData, FirebaseError, AddAnswerVariables>): UseDataConnectMutationResult<AddAnswerData, AddAnswerVariables>;

export function useUpdateAnswer(options?: useDataConnectMutationOptions<UpdateAnswerData, FirebaseError, UpdateAnswerVariables>): UseDataConnectMutationResult<UpdateAnswerData, UpdateAnswerVariables>;
export function useUpdateAnswer(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAnswerData, FirebaseError, UpdateAnswerVariables>): UseDataConnectMutationResult<UpdateAnswerData, UpdateAnswerVariables>;

export function useCreateExam(options?: useDataConnectMutationOptions<CreateExamData, FirebaseError, CreateExamVariables>): UseDataConnectMutationResult<CreateExamData, CreateExamVariables>;
export function useCreateExam(dc: DataConnect, options?: useDataConnectMutationOptions<CreateExamData, FirebaseError, CreateExamVariables>): UseDataConnectMutationResult<CreateExamData, CreateExamVariables>;

export function useUpdateExam(options?: useDataConnectMutationOptions<UpdateExamData, FirebaseError, UpdateExamVariables>): UseDataConnectMutationResult<UpdateExamData, UpdateExamVariables>;
export function useUpdateExam(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateExamData, FirebaseError, UpdateExamVariables>): UseDataConnectMutationResult<UpdateExamData, UpdateExamVariables>;

export function useDeleteExam(options?: useDataConnectMutationOptions<DeleteExamData, FirebaseError, DeleteExamVariables>): UseDataConnectMutationResult<DeleteExamData, DeleteExamVariables>;
export function useDeleteExam(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteExamData, FirebaseError, DeleteExamVariables>): UseDataConnectMutationResult<DeleteExamData, DeleteExamVariables>;

export function useAddQuestionToExam(options?: useDataConnectMutationOptions<AddQuestionToExamData, FirebaseError, AddQuestionToExamVariables>): UseDataConnectMutationResult<AddQuestionToExamData, AddQuestionToExamVariables>;
export function useAddQuestionToExam(dc: DataConnect, options?: useDataConnectMutationOptions<AddQuestionToExamData, FirebaseError, AddQuestionToExamVariables>): UseDataConnectMutationResult<AddQuestionToExamData, AddQuestionToExamVariables>;

export function useRemoveQuestionFromExam(options?: useDataConnectMutationOptions<RemoveQuestionFromExamData, FirebaseError, RemoveQuestionFromExamVariables>): UseDataConnectMutationResult<RemoveQuestionFromExamData, RemoveQuestionFromExamVariables>;
export function useRemoveQuestionFromExam(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveQuestionFromExamData, FirebaseError, RemoveQuestionFromExamVariables>): UseDataConnectMutationResult<RemoveQuestionFromExamData, RemoveQuestionFromExamVariables>;

export function useStartExam(options?: useDataConnectMutationOptions<StartExamData, FirebaseError, StartExamVariables>): UseDataConnectMutationResult<StartExamData, StartExamVariables>;
export function useStartExam(dc: DataConnect, options?: useDataConnectMutationOptions<StartExamData, FirebaseError, StartExamVariables>): UseDataConnectMutationResult<StartExamData, StartExamVariables>;

export function useSubmitAnswer(options?: useDataConnectMutationOptions<SubmitAnswerData, FirebaseError, SubmitAnswerVariables>): UseDataConnectMutationResult<SubmitAnswerData, SubmitAnswerVariables>;
export function useSubmitAnswer(dc: DataConnect, options?: useDataConnectMutationOptions<SubmitAnswerData, FirebaseError, SubmitAnswerVariables>): UseDataConnectMutationResult<SubmitAnswerData, SubmitAnswerVariables>;

export function useSubmitExam(options?: useDataConnectMutationOptions<SubmitExamData, FirebaseError, SubmitExamVariables>): UseDataConnectMutationResult<SubmitExamData, SubmitExamVariables>;
export function useSubmitExam(dc: DataConnect, options?: useDataConnectMutationOptions<SubmitExamData, FirebaseError, SubmitExamVariables>): UseDataConnectMutationResult<SubmitExamData, SubmitExamVariables>;

export function useGradeSubjectiveAnswer(options?: useDataConnectMutationOptions<GradeSubjectiveAnswerData, FirebaseError, GradeSubjectiveAnswerVariables>): UseDataConnectMutationResult<GradeSubjectiveAnswerData, GradeSubjectiveAnswerVariables>;
export function useGradeSubjectiveAnswer(dc: DataConnect, options?: useDataConnectMutationOptions<GradeSubjectiveAnswerData, FirebaseError, GradeSubjectiveAnswerVariables>): UseDataConnectMutationResult<GradeSubjectiveAnswerData, GradeSubjectiveAnswerVariables>;

export function useFinalizeExamGrading(options?: useDataConnectMutationOptions<FinalizeExamGradingData, FirebaseError, FinalizeExamGradingVariables>): UseDataConnectMutationResult<FinalizeExamGradingData, FinalizeExamGradingVariables>;
export function useFinalizeExamGrading(dc: DataConnect, options?: useDataConnectMutationOptions<FinalizeExamGradingData, FirebaseError, FinalizeExamGradingVariables>): UseDataConnectMutationResult<FinalizeExamGradingData, FinalizeExamGradingVariables>;

export function useUpdateQuestionStatistics(options?: useDataConnectMutationOptions<UpdateQuestionStatisticsData, FirebaseError, UpdateQuestionStatisticsVariables>): UseDataConnectMutationResult<UpdateQuestionStatisticsData, UpdateQuestionStatisticsVariables>;
export function useUpdateQuestionStatistics(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateQuestionStatisticsData, FirebaseError, UpdateQuestionStatisticsVariables>): UseDataConnectMutationResult<UpdateQuestionStatisticsData, UpdateQuestionStatisticsVariables>;

export function useGetCurrentUser(options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;
export function useGetCurrentUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;

export function useListAllUsers(options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;
export function useListAllUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;

export function useListCategories(options?: useDataConnectQueryOptions<ListCategoriesData>): UseDataConnectQueryResult<ListCategoriesData, undefined>;
export function useListCategories(dc: DataConnect, options?: useDataConnectQueryOptions<ListCategoriesData>): UseDataConnectQueryResult<ListCategoriesData, undefined>;

export function useListQuestions(vars?: ListQuestionsVariables, options?: useDataConnectQueryOptions<ListQuestionsData>): UseDataConnectQueryResult<ListQuestionsData, ListQuestionsVariables>;
export function useListQuestions(dc: DataConnect, vars?: ListQuestionsVariables, options?: useDataConnectQueryOptions<ListQuestionsData>): UseDataConnectQueryResult<ListQuestionsData, ListQuestionsVariables>;

export function useGetQuestionById(vars: GetQuestionByIdVariables, options?: useDataConnectQueryOptions<GetQuestionByIdData>): UseDataConnectQueryResult<GetQuestionByIdData, GetQuestionByIdVariables>;
export function useGetQuestionById(dc: DataConnect, vars: GetQuestionByIdVariables, options?: useDataConnectQueryOptions<GetQuestionByIdData>): UseDataConnectQueryResult<GetQuestionByIdData, GetQuestionByIdVariables>;

export function useListExams(vars?: ListExamsVariables, options?: useDataConnectQueryOptions<ListExamsData>): UseDataConnectQueryResult<ListExamsData, ListExamsVariables>;
export function useListExams(dc: DataConnect, vars?: ListExamsVariables, options?: useDataConnectQueryOptions<ListExamsData>): UseDataConnectQueryResult<ListExamsData, ListExamsVariables>;

export function useGetExamById(vars: GetExamByIdVariables, options?: useDataConnectQueryOptions<GetExamByIdData>): UseDataConnectQueryResult<GetExamByIdData, GetExamByIdVariables>;
export function useGetExamById(dc: DataConnect, vars: GetExamByIdVariables, options?: useDataConnectQueryOptions<GetExamByIdData>): UseDataConnectQueryResult<GetExamByIdData, GetExamByIdVariables>;

export function useListMyExamAttempts(options?: useDataConnectQueryOptions<ListMyExamAttemptsData>): UseDataConnectQueryResult<ListMyExamAttemptsData, undefined>;
export function useListMyExamAttempts(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyExamAttemptsData>): UseDataConnectQueryResult<ListMyExamAttemptsData, undefined>;

export function useGetExamAttemptById(vars: GetExamAttemptByIdVariables, options?: useDataConnectQueryOptions<GetExamAttemptByIdData>): UseDataConnectQueryResult<GetExamAttemptByIdData, GetExamAttemptByIdVariables>;
export function useGetExamAttemptById(dc: DataConnect, vars: GetExamAttemptByIdVariables, options?: useDataConnectQueryOptions<GetExamAttemptByIdData>): UseDataConnectQueryResult<GetExamAttemptByIdData, GetExamAttemptByIdVariables>;

export function useGetExamAttemptsByExam(vars: GetExamAttemptsByExamVariables, options?: useDataConnectQueryOptions<GetExamAttemptsByExamData>): UseDataConnectQueryResult<GetExamAttemptsByExamData, GetExamAttemptsByExamVariables>;
export function useGetExamAttemptsByExam(dc: DataConnect, vars: GetExamAttemptsByExamVariables, options?: useDataConnectQueryOptions<GetExamAttemptsByExamData>): UseDataConnectQueryResult<GetExamAttemptsByExamData, GetExamAttemptsByExamVariables>;

export function useGetQuestionStatistics(vars: GetQuestionStatisticsVariables, options?: useDataConnectQueryOptions<GetQuestionStatisticsData>): UseDataConnectQueryResult<GetQuestionStatisticsData, GetQuestionStatisticsVariables>;
export function useGetQuestionStatistics(dc: DataConnect, vars: GetQuestionStatisticsVariables, options?: useDataConnectQueryOptions<GetQuestionStatisticsData>): UseDataConnectQueryResult<GetQuestionStatisticsData, GetQuestionStatisticsVariables>;

export function useListAvailableExams(options?: useDataConnectQueryOptions<ListAvailableExamsData>): UseDataConnectQueryResult<ListAvailableExamsData, undefined>;
export function useListAvailableExams(dc: DataConnect, options?: useDataConnectQueryOptions<ListAvailableExamsData>): UseDataConnectQueryResult<ListAvailableExamsData, undefined>;
