import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddAnswerData {
  answer_insert: Answer_Key;
}

export interface AddAnswerVariables {
  questionId: UUIDString;
  answerText: string;
  keywords?: string | null;
}

export interface AddChoiceData {
  choice_insert: Choice_Key;
}

export interface AddChoiceVariables {
  questionId: UUIDString;
  choiceText: string;
  choiceNumber: number;
  isCorrect: boolean;
}

export interface AddQuestionToExamData {
  examQuestion_insert: ExamQuestion_Key;
}

export interface AddQuestionToExamVariables {
  examId: UUIDString;
  questionId: UUIDString;
  questionOrder: number;
  pointsOverride?: number | null;
}

export interface Answer_Key {
  id: UUIDString;
  __typename?: 'Answer_Key';
}

export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface Choice_Key {
  id: UUIDString;
  __typename?: 'Choice_Key';
}

export interface CreateCategoryData {
  category_insert: Category_Key;
}

export interface CreateCategoryVariables {
  name: string;
  description?: string | null;
  parentCategoryId?: UUIDString | null;
}

export interface CreateExamData {
  exam_insert: Exam_Key;
}

export interface CreateExamVariables {
  title: string;
  description?: string | null;
  duration: number;
  totalPoints: number;
  passingScore: number;
  startTime?: TimestampString | null;
  endTime?: TimestampString | null;
}

export interface CreateQuestionData {
  question_insert: Question_Key;
}

export interface CreateQuestionVariables {
  categoryId: UUIDString;
  type: string;
  questionText: string;
  imageUrl?: string | null;
  difficulty: string;
  points: number;
}

export interface DeleteCategoryData {
  category_delete?: Category_Key | null;
}

export interface DeleteCategoryVariables {
  id: UUIDString;
}

export interface DeleteChoiceData {
  choice_delete?: Choice_Key | null;
}

export interface DeleteChoiceVariables {
  id: UUIDString;
}

export interface DeleteExamData {
  exam_delete?: Exam_Key | null;
}

export interface DeleteExamVariables {
  id: UUIDString;
}

export interface DeleteQuestionData {
  question_delete?: Question_Key | null;
}

export interface DeleteQuestionVariables {
  id: UUIDString;
}

export interface ExamAttempt_Key {
  id: UUIDString;
  __typename?: 'ExamAttempt_Key';
}

export interface ExamQuestion_Key {
  examId: UUIDString;
  questionId: UUIDString;
  __typename?: 'ExamQuestion_Key';
}

export interface Exam_Key {
  id: UUIDString;
  __typename?: 'Exam_Key';
}

export interface FinalizeExamGradingData {
  examAttempt_update?: ExamAttempt_Key | null;
}

export interface FinalizeExamGradingVariables {
  attemptId: UUIDString;
  score: number;
  isPassed: boolean;
}

export interface GetCurrentUserData {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
    schoolName?: string | null;
    approvalStatus?: string | null;
    createdAt: TimestampString;
  } & User_Key;
}

export interface GetExamAttemptByIdData {
  examAttempt?: {
    id: UUIDString;
    exam: {
      id: UUIDString;
      title: string;
      description?: string | null;
      duration: number;
      totalPoints: number;
      passingScore: number;
    } & Exam_Key;
      student: {
        id: string;
        name: string;
        email: string;
      } & User_Key;
        startedAt: TimestampString;
        submittedAt?: TimestampString | null;
        score?: number | null;
        isPassed?: boolean | null;
        status: string;
        answers: ({
          id: UUIDString;
          question: {
            id: UUIDString;
            questionText: string;
            type: string;
            points: number;
          } & Question_Key;
            selectedChoice?: {
              choiceText: string;
            };
              textAnswer?: string | null;
              isCorrect?: boolean | null;
              earnedPoints?: number | null;
              feedback?: string | null;
              answeredAt: TimestampString;
        } & StudentAnswer_Key)[];
  } & ExamAttempt_Key;
}

export interface GetExamAttemptByIdVariables {
  id: UUIDString;
}

export interface GetExamAttemptsByExamData {
  exam?: {
    id: UUIDString;
    title: string;
    attempts: ({
      id: UUIDString;
      student: {
        name: string;
        email: string;
      };
        startedAt: TimestampString;
        submittedAt?: TimestampString | null;
        score?: number | null;
        isPassed?: boolean | null;
        status: string;
    } & ExamAttempt_Key)[];
  } & Exam_Key;
}

export interface GetExamAttemptsByExamVariables {
  examId: UUIDString;
}

export interface GetExamByIdData {
  exam?: {
    id: UUIDString;
    title: string;
    description?: string | null;
    duration: number;
    totalPoints: number;
    passingScore: number;
    startTime?: TimestampString | null;
    endTime?: TimestampString | null;
    isPublished: boolean;
    createdBy: {
      id: string;
      name: string;
    } & User_Key;
      questions: ({
        questionOrder: number;
        pointsOverride?: number | null;
        question: {
          id: UUIDString;
          questionText: string;
          type: string;
          difficulty: string;
          points: number;
          imageUrl?: string | null;
        } & Question_Key;
      })[];
        createdAt: TimestampString;
  } & Exam_Key;
}

export interface GetExamByIdVariables {
  id: UUIDString;
}

export interface GetQuestionByIdData {
  question?: {
    id: UUIDString;
    questionText: string;
    type: string;
    difficulty: string;
    points: number;
    imageUrl?: string | null;
    category: {
      id: UUIDString;
      name: string;
    } & Category_Key;
      choices: ({
        id: UUIDString;
        choiceText: string;
        choiceNumber: number;
        isCorrect: boolean;
      } & Choice_Key)[];
        answers: ({
          id: UUIDString;
          answerText: string;
          keywords?: string | null;
        } & Answer_Key)[];
          createdBy: {
            id: string;
            name: string;
          } & User_Key;
            createdAt: TimestampString;
            updatedAt: TimestampString;
  } & Question_Key;
}

export interface GetQuestionByIdVariables {
  id: UUIDString;
}

export interface GradeSubjectiveAnswerData {
  studentAnswer_update?: StudentAnswer_Key | null;
}

export interface GradeSubjectiveAnswerVariables {
  answerId: UUIDString;
  isCorrect: boolean;
  earnedPoints: number;
  feedback?: string | null;
}

export interface ListAllUsersData {
  users: ({
    id: string;
    email: string;
    name: string;
    role: string;
    schoolName?: string | null;
    approvalStatus?: string | null;
    createdAt: TimestampString;
  } & User_Key)[];
}

export interface ListAvailableExamsData {
  exams: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    duration: number;
    totalPoints: number;
    passingScore: number;
    startTime?: TimestampString | null;
    endTime?: TimestampString | null;
  } & Exam_Key)[];
}

export interface ListCategoriesData {
  categories: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    createdBy: {
      name: string;
    };
      createdAt: TimestampString;
  } & Category_Key)[];
}

export interface ListExamsData {
  exams: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    duration: number;
    totalPoints: number;
    passingScore: number;
    startTime?: TimestampString | null;
    endTime?: TimestampString | null;
    isPublished: boolean;
    createdBy: {
      name: string;
    };
      createdAt: TimestampString;
  } & Exam_Key)[];
}

export interface ListExamsVariables {
  isPublished?: boolean | null;
}

export interface ListMyExamAttemptsData {
  user?: {
    attempts: ({
      id: UUIDString;
      exam: {
        id: UUIDString;
        title: string;
        totalPoints: number;
      } & Exam_Key;
        startedAt: TimestampString;
        submittedAt?: TimestampString | null;
        score?: number | null;
        isPassed?: boolean | null;
        status: string;
    } & ExamAttempt_Key)[];
  };
}

export interface ListQuestionsData {
  questions: ({
    id: UUIDString;
    questionText: string;
    type: string;
    difficulty: string;
    points: number;
    imageUrl?: string | null;
    category: {
      name: string;
    };
      createdBy: {
        name: string;
      };
        createdAt: TimestampString;
  } & Question_Key)[];
}

export interface ListQuestionsVariables {
  categoryId?: UUIDString | null;
  difficulty?: string | null;
  type?: string | null;
}

export interface QuestionStatistics_Key {
  id: UUIDString;
  __typename?: 'QuestionStatistics_Key';
}

export interface Question_Key {
  id: UUIDString;
  __typename?: 'Question_Key';
}

export interface RemoveQuestionFromExamData {
  examQuestion_delete?: ExamQuestion_Key | null;
}

export interface RemoveQuestionFromExamVariables {
  examId: UUIDString;
  questionId: UUIDString;
}

export interface StartExamData {
  examAttempt_insert: ExamAttempt_Key;
}

export interface StartExamVariables {
  examId: UUIDString;
}

export interface StudentAnswer_Key {
  id: UUIDString;
  __typename?: 'StudentAnswer_Key';
}

export interface SubmitExamData {
  examAttempt_update?: ExamAttempt_Key | null;
}

export interface SubmitExamVariables {
  attemptId: UUIDString;
}

export interface UpdateAnswerData {
  answer_update?: Answer_Key | null;
}

export interface UpdateAnswerVariables {
  id: UUIDString;
  answerText?: string | null;
  keywords?: string | null;
}

export interface UpdateCategoryData {
  category_update?: Category_Key | null;
}

export interface UpdateCategoryVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
}

export interface UpdateChoiceData {
  choice_update?: Choice_Key | null;
}

export interface UpdateChoiceVariables {
  id: UUIDString;
  choiceText?: string | null;
  isCorrect?: boolean | null;
}

export interface UpdateExamData {
  exam_update?: Exam_Key | null;
}

export interface UpdateExamVariables {
  id: UUIDString;
  title?: string | null;
  description?: string | null;
  duration?: number | null;
  totalPoints?: number | null;
  passingScore?: number | null;
  startTime?: TimestampString | null;
  endTime?: TimestampString | null;
  isPublished?: boolean | null;
}

export interface UpdateQuestionData {
  question_update?: Question_Key | null;
}

export interface UpdateQuestionVariables {
  id: UUIDString;
  questionText?: string | null;
  imageUrl?: string | null;
  difficulty?: string | null;
  points?: number | null;
}

export interface UpdateUserApprovalStatusData {
  user_update?: User_Key | null;
}

export interface UpdateUserApprovalStatusVariables {
  userId: string;
  approvalStatus: string;
}

export interface UpdateUserRoleData {
  user_update?: User_Key | null;
}

export interface UpdateUserRoleVariables {
  userId: string;
  role: string;
}

export interface UpsertUserData {
  user_upsert: User_Key;
}

export interface UpsertUserVariables {
  email: string;
  name: string;
  role: string;
  schoolName?: string | null;
  approvalStatus?: string | null;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect): QueryPromise<GetCurrentUserData, undefined>;

interface ListAllUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
  operationName: string;
}
export const listAllUsersRef: ListAllUsersRef;

export function listAllUsers(): QueryPromise<ListAllUsersData, undefined>;
export function listAllUsers(dc: DataConnect): QueryPromise<ListAllUsersData, undefined>;

interface ListCategoriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCategoriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCategoriesData, undefined>;
  operationName: string;
}
export const listCategoriesRef: ListCategoriesRef;

export function listCategories(): QueryPromise<ListCategoriesData, undefined>;
export function listCategories(dc: DataConnect): QueryPromise<ListCategoriesData, undefined>;

interface ListQuestionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListQuestionsVariables): QueryRef<ListQuestionsData, ListQuestionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListQuestionsVariables): QueryRef<ListQuestionsData, ListQuestionsVariables>;
  operationName: string;
}
export const listQuestionsRef: ListQuestionsRef;

export function listQuestions(vars?: ListQuestionsVariables): QueryPromise<ListQuestionsData, ListQuestionsVariables>;
export function listQuestions(dc: DataConnect, vars?: ListQuestionsVariables): QueryPromise<ListQuestionsData, ListQuestionsVariables>;

interface GetQuestionByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionByIdVariables): QueryRef<GetQuestionByIdData, GetQuestionByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuestionByIdVariables): QueryRef<GetQuestionByIdData, GetQuestionByIdVariables>;
  operationName: string;
}
export const getQuestionByIdRef: GetQuestionByIdRef;

export function getQuestionById(vars: GetQuestionByIdVariables): QueryPromise<GetQuestionByIdData, GetQuestionByIdVariables>;
export function getQuestionById(dc: DataConnect, vars: GetQuestionByIdVariables): QueryPromise<GetQuestionByIdData, GetQuestionByIdVariables>;

interface ListExamsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListExamsVariables): QueryRef<ListExamsData, ListExamsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListExamsVariables): QueryRef<ListExamsData, ListExamsVariables>;
  operationName: string;
}
export const listExamsRef: ListExamsRef;

export function listExams(vars?: ListExamsVariables): QueryPromise<ListExamsData, ListExamsVariables>;
export function listExams(dc: DataConnect, vars?: ListExamsVariables): QueryPromise<ListExamsData, ListExamsVariables>;

interface GetExamByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetExamByIdVariables): QueryRef<GetExamByIdData, GetExamByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetExamByIdVariables): QueryRef<GetExamByIdData, GetExamByIdVariables>;
  operationName: string;
}
export const getExamByIdRef: GetExamByIdRef;

export function getExamById(vars: GetExamByIdVariables): QueryPromise<GetExamByIdData, GetExamByIdVariables>;
export function getExamById(dc: DataConnect, vars: GetExamByIdVariables): QueryPromise<GetExamByIdData, GetExamByIdVariables>;

interface ListMyExamAttemptsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyExamAttemptsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyExamAttemptsData, undefined>;
  operationName: string;
}
export const listMyExamAttemptsRef: ListMyExamAttemptsRef;

export function listMyExamAttempts(): QueryPromise<ListMyExamAttemptsData, undefined>;
export function listMyExamAttempts(dc: DataConnect): QueryPromise<ListMyExamAttemptsData, undefined>;

interface GetExamAttemptByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetExamAttemptByIdVariables): QueryRef<GetExamAttemptByIdData, GetExamAttemptByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetExamAttemptByIdVariables): QueryRef<GetExamAttemptByIdData, GetExamAttemptByIdVariables>;
  operationName: string;
}
export const getExamAttemptByIdRef: GetExamAttemptByIdRef;

export function getExamAttemptById(vars: GetExamAttemptByIdVariables): QueryPromise<GetExamAttemptByIdData, GetExamAttemptByIdVariables>;
export function getExamAttemptById(dc: DataConnect, vars: GetExamAttemptByIdVariables): QueryPromise<GetExamAttemptByIdData, GetExamAttemptByIdVariables>;

interface GetExamAttemptsByExamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetExamAttemptsByExamVariables): QueryRef<GetExamAttemptsByExamData, GetExamAttemptsByExamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetExamAttemptsByExamVariables): QueryRef<GetExamAttemptsByExamData, GetExamAttemptsByExamVariables>;
  operationName: string;
}
export const getExamAttemptsByExamRef: GetExamAttemptsByExamRef;

export function getExamAttemptsByExam(vars: GetExamAttemptsByExamVariables): QueryPromise<GetExamAttemptsByExamData, GetExamAttemptsByExamVariables>;
export function getExamAttemptsByExam(dc: DataConnect, vars: GetExamAttemptsByExamVariables): QueryPromise<GetExamAttemptsByExamData, GetExamAttemptsByExamVariables>;

interface ListAvailableExamsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAvailableExamsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAvailableExamsData, undefined>;
  operationName: string;
}
export const listAvailableExamsRef: ListAvailableExamsRef;

export function listAvailableExams(): QueryPromise<ListAvailableExamsData, undefined>;
export function listAvailableExams(dc: DataConnect): QueryPromise<ListAvailableExamsData, undefined>;

interface UpsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  operationName: string;
}
export const upsertUserRef: UpsertUserRef;

export function upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpdateUserApprovalStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserApprovalStatusVariables): MutationRef<UpdateUserApprovalStatusData, UpdateUserApprovalStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserApprovalStatusVariables): MutationRef<UpdateUserApprovalStatusData, UpdateUserApprovalStatusVariables>;
  operationName: string;
}
export const updateUserApprovalStatusRef: UpdateUserApprovalStatusRef;

export function updateUserApprovalStatus(vars: UpdateUserApprovalStatusVariables): MutationPromise<UpdateUserApprovalStatusData, UpdateUserApprovalStatusVariables>;
export function updateUserApprovalStatus(dc: DataConnect, vars: UpdateUserApprovalStatusVariables): MutationPromise<UpdateUserApprovalStatusData, UpdateUserApprovalStatusVariables>;

interface UpdateUserRoleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
  operationName: string;
}
export const updateUserRoleRef: UpdateUserRoleRef;

export function updateUserRole(vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;
export function updateUserRole(dc: DataConnect, vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;

interface CreateCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCategoryVariables): MutationRef<CreateCategoryData, CreateCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCategoryVariables): MutationRef<CreateCategoryData, CreateCategoryVariables>;
  operationName: string;
}
export const createCategoryRef: CreateCategoryRef;

export function createCategory(vars: CreateCategoryVariables): MutationPromise<CreateCategoryData, CreateCategoryVariables>;
export function createCategory(dc: DataConnect, vars: CreateCategoryVariables): MutationPromise<CreateCategoryData, CreateCategoryVariables>;

interface UpdateCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCategoryVariables): MutationRef<UpdateCategoryData, UpdateCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCategoryVariables): MutationRef<UpdateCategoryData, UpdateCategoryVariables>;
  operationName: string;
}
export const updateCategoryRef: UpdateCategoryRef;

export function updateCategory(vars: UpdateCategoryVariables): MutationPromise<UpdateCategoryData, UpdateCategoryVariables>;
export function updateCategory(dc: DataConnect, vars: UpdateCategoryVariables): MutationPromise<UpdateCategoryData, UpdateCategoryVariables>;

interface DeleteCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCategoryVariables): MutationRef<DeleteCategoryData, DeleteCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCategoryVariables): MutationRef<DeleteCategoryData, DeleteCategoryVariables>;
  operationName: string;
}
export const deleteCategoryRef: DeleteCategoryRef;

export function deleteCategory(vars: DeleteCategoryVariables): MutationPromise<DeleteCategoryData, DeleteCategoryVariables>;
export function deleteCategory(dc: DataConnect, vars: DeleteCategoryVariables): MutationPromise<DeleteCategoryData, DeleteCategoryVariables>;

interface CreateQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionVariables): MutationRef<CreateQuestionData, CreateQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuestionVariables): MutationRef<CreateQuestionData, CreateQuestionVariables>;
  operationName: string;
}
export const createQuestionRef: CreateQuestionRef;

export function createQuestion(vars: CreateQuestionVariables): MutationPromise<CreateQuestionData, CreateQuestionVariables>;
export function createQuestion(dc: DataConnect, vars: CreateQuestionVariables): MutationPromise<CreateQuestionData, CreateQuestionVariables>;

interface UpdateQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuestionVariables): MutationRef<UpdateQuestionData, UpdateQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuestionVariables): MutationRef<UpdateQuestionData, UpdateQuestionVariables>;
  operationName: string;
}
export const updateQuestionRef: UpdateQuestionRef;

export function updateQuestion(vars: UpdateQuestionVariables): MutationPromise<UpdateQuestionData, UpdateQuestionVariables>;
export function updateQuestion(dc: DataConnect, vars: UpdateQuestionVariables): MutationPromise<UpdateQuestionData, UpdateQuestionVariables>;

interface DeleteQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuestionVariables): MutationRef<DeleteQuestionData, DeleteQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteQuestionVariables): MutationRef<DeleteQuestionData, DeleteQuestionVariables>;
  operationName: string;
}
export const deleteQuestionRef: DeleteQuestionRef;

export function deleteQuestion(vars: DeleteQuestionVariables): MutationPromise<DeleteQuestionData, DeleteQuestionVariables>;
export function deleteQuestion(dc: DataConnect, vars: DeleteQuestionVariables): MutationPromise<DeleteQuestionData, DeleteQuestionVariables>;

interface AddChoiceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddChoiceVariables): MutationRef<AddChoiceData, AddChoiceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddChoiceVariables): MutationRef<AddChoiceData, AddChoiceVariables>;
  operationName: string;
}
export const addChoiceRef: AddChoiceRef;

export function addChoice(vars: AddChoiceVariables): MutationPromise<AddChoiceData, AddChoiceVariables>;
export function addChoice(dc: DataConnect, vars: AddChoiceVariables): MutationPromise<AddChoiceData, AddChoiceVariables>;

interface UpdateChoiceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateChoiceVariables): MutationRef<UpdateChoiceData, UpdateChoiceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateChoiceVariables): MutationRef<UpdateChoiceData, UpdateChoiceVariables>;
  operationName: string;
}
export const updateChoiceRef: UpdateChoiceRef;

export function updateChoice(vars: UpdateChoiceVariables): MutationPromise<UpdateChoiceData, UpdateChoiceVariables>;
export function updateChoice(dc: DataConnect, vars: UpdateChoiceVariables): MutationPromise<UpdateChoiceData, UpdateChoiceVariables>;

interface DeleteChoiceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteChoiceVariables): MutationRef<DeleteChoiceData, DeleteChoiceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteChoiceVariables): MutationRef<DeleteChoiceData, DeleteChoiceVariables>;
  operationName: string;
}
export const deleteChoiceRef: DeleteChoiceRef;

export function deleteChoice(vars: DeleteChoiceVariables): MutationPromise<DeleteChoiceData, DeleteChoiceVariables>;
export function deleteChoice(dc: DataConnect, vars: DeleteChoiceVariables): MutationPromise<DeleteChoiceData, DeleteChoiceVariables>;

interface AddAnswerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddAnswerVariables): MutationRef<AddAnswerData, AddAnswerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddAnswerVariables): MutationRef<AddAnswerData, AddAnswerVariables>;
  operationName: string;
}
export const addAnswerRef: AddAnswerRef;

export function addAnswer(vars: AddAnswerVariables): MutationPromise<AddAnswerData, AddAnswerVariables>;
export function addAnswer(dc: DataConnect, vars: AddAnswerVariables): MutationPromise<AddAnswerData, AddAnswerVariables>;

interface UpdateAnswerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAnswerVariables): MutationRef<UpdateAnswerData, UpdateAnswerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAnswerVariables): MutationRef<UpdateAnswerData, UpdateAnswerVariables>;
  operationName: string;
}
export const updateAnswerRef: UpdateAnswerRef;

export function updateAnswer(vars: UpdateAnswerVariables): MutationPromise<UpdateAnswerData, UpdateAnswerVariables>;
export function updateAnswer(dc: DataConnect, vars: UpdateAnswerVariables): MutationPromise<UpdateAnswerData, UpdateAnswerVariables>;

interface CreateExamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateExamVariables): MutationRef<CreateExamData, CreateExamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateExamVariables): MutationRef<CreateExamData, CreateExamVariables>;
  operationName: string;
}
export const createExamRef: CreateExamRef;

export function createExam(vars: CreateExamVariables): MutationPromise<CreateExamData, CreateExamVariables>;
export function createExam(dc: DataConnect, vars: CreateExamVariables): MutationPromise<CreateExamData, CreateExamVariables>;

interface UpdateExamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateExamVariables): MutationRef<UpdateExamData, UpdateExamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateExamVariables): MutationRef<UpdateExamData, UpdateExamVariables>;
  operationName: string;
}
export const updateExamRef: UpdateExamRef;

export function updateExam(vars: UpdateExamVariables): MutationPromise<UpdateExamData, UpdateExamVariables>;
export function updateExam(dc: DataConnect, vars: UpdateExamVariables): MutationPromise<UpdateExamData, UpdateExamVariables>;

interface DeleteExamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteExamVariables): MutationRef<DeleteExamData, DeleteExamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteExamVariables): MutationRef<DeleteExamData, DeleteExamVariables>;
  operationName: string;
}
export const deleteExamRef: DeleteExamRef;

export function deleteExam(vars: DeleteExamVariables): MutationPromise<DeleteExamData, DeleteExamVariables>;
export function deleteExam(dc: DataConnect, vars: DeleteExamVariables): MutationPromise<DeleteExamData, DeleteExamVariables>;

interface AddQuestionToExamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddQuestionToExamVariables): MutationRef<AddQuestionToExamData, AddQuestionToExamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddQuestionToExamVariables): MutationRef<AddQuestionToExamData, AddQuestionToExamVariables>;
  operationName: string;
}
export const addQuestionToExamRef: AddQuestionToExamRef;

export function addQuestionToExam(vars: AddQuestionToExamVariables): MutationPromise<AddQuestionToExamData, AddQuestionToExamVariables>;
export function addQuestionToExam(dc: DataConnect, vars: AddQuestionToExamVariables): MutationPromise<AddQuestionToExamData, AddQuestionToExamVariables>;

interface RemoveQuestionFromExamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveQuestionFromExamVariables): MutationRef<RemoveQuestionFromExamData, RemoveQuestionFromExamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveQuestionFromExamVariables): MutationRef<RemoveQuestionFromExamData, RemoveQuestionFromExamVariables>;
  operationName: string;
}
export const removeQuestionFromExamRef: RemoveQuestionFromExamRef;

export function removeQuestionFromExam(vars: RemoveQuestionFromExamVariables): MutationPromise<RemoveQuestionFromExamData, RemoveQuestionFromExamVariables>;
export function removeQuestionFromExam(dc: DataConnect, vars: RemoveQuestionFromExamVariables): MutationPromise<RemoveQuestionFromExamData, RemoveQuestionFromExamVariables>;

interface StartExamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: StartExamVariables): MutationRef<StartExamData, StartExamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: StartExamVariables): MutationRef<StartExamData, StartExamVariables>;
  operationName: string;
}
export const startExamRef: StartExamRef;

export function startExam(vars: StartExamVariables): MutationPromise<StartExamData, StartExamVariables>;
export function startExam(dc: DataConnect, vars: StartExamVariables): MutationPromise<StartExamData, StartExamVariables>;

interface SubmitExamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitExamVariables): MutationRef<SubmitExamData, SubmitExamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SubmitExamVariables): MutationRef<SubmitExamData, SubmitExamVariables>;
  operationName: string;
}
export const submitExamRef: SubmitExamRef;

export function submitExam(vars: SubmitExamVariables): MutationPromise<SubmitExamData, SubmitExamVariables>;
export function submitExam(dc: DataConnect, vars: SubmitExamVariables): MutationPromise<SubmitExamData, SubmitExamVariables>;

interface GradeSubjectiveAnswerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GradeSubjectiveAnswerVariables): MutationRef<GradeSubjectiveAnswerData, GradeSubjectiveAnswerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GradeSubjectiveAnswerVariables): MutationRef<GradeSubjectiveAnswerData, GradeSubjectiveAnswerVariables>;
  operationName: string;
}
export const gradeSubjectiveAnswerRef: GradeSubjectiveAnswerRef;

export function gradeSubjectiveAnswer(vars: GradeSubjectiveAnswerVariables): MutationPromise<GradeSubjectiveAnswerData, GradeSubjectiveAnswerVariables>;
export function gradeSubjectiveAnswer(dc: DataConnect, vars: GradeSubjectiveAnswerVariables): MutationPromise<GradeSubjectiveAnswerData, GradeSubjectiveAnswerVariables>;

interface FinalizeExamGradingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: FinalizeExamGradingVariables): MutationRef<FinalizeExamGradingData, FinalizeExamGradingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: FinalizeExamGradingVariables): MutationRef<FinalizeExamGradingData, FinalizeExamGradingVariables>;
  operationName: string;
}
export const finalizeExamGradingRef: FinalizeExamGradingRef;

export function finalizeExamGrading(vars: FinalizeExamGradingVariables): MutationPromise<FinalizeExamGradingData, FinalizeExamGradingVariables>;
export function finalizeExamGrading(dc: DataConnect, vars: FinalizeExamGradingVariables): MutationPromise<FinalizeExamGradingData, FinalizeExamGradingVariables>;

