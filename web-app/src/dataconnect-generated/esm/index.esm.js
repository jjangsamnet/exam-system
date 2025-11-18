import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'exam-system',
  location: 'us-east4'
};

export const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';

export function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
}

export const createCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCategory', inputVars);
}
createCategoryRef.operationName = 'CreateCategory';

export function createCategory(dcOrVars, vars) {
  return executeMutation(createCategoryRef(dcOrVars, vars));
}

export const updateCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCategory', inputVars);
}
updateCategoryRef.operationName = 'UpdateCategory';

export function updateCategory(dcOrVars, vars) {
  return executeMutation(updateCategoryRef(dcOrVars, vars));
}

export const deleteCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteCategory', inputVars);
}
deleteCategoryRef.operationName = 'DeleteCategory';

export function deleteCategory(dcOrVars, vars) {
  return executeMutation(deleteCategoryRef(dcOrVars, vars));
}

export const createQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestion', inputVars);
}
createQuestionRef.operationName = 'CreateQuestion';

export function createQuestion(dcOrVars, vars) {
  return executeMutation(createQuestionRef(dcOrVars, vars));
}

export const updateQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuestion', inputVars);
}
updateQuestionRef.operationName = 'UpdateQuestion';

export function updateQuestion(dcOrVars, vars) {
  return executeMutation(updateQuestionRef(dcOrVars, vars));
}

export const deleteQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteQuestion', inputVars);
}
deleteQuestionRef.operationName = 'DeleteQuestion';

export function deleteQuestion(dcOrVars, vars) {
  return executeMutation(deleteQuestionRef(dcOrVars, vars));
}

export const addChoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddChoice', inputVars);
}
addChoiceRef.operationName = 'AddChoice';

export function addChoice(dcOrVars, vars) {
  return executeMutation(addChoiceRef(dcOrVars, vars));
}

export const updateChoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateChoice', inputVars);
}
updateChoiceRef.operationName = 'UpdateChoice';

export function updateChoice(dcOrVars, vars) {
  return executeMutation(updateChoiceRef(dcOrVars, vars));
}

export const deleteChoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteChoice', inputVars);
}
deleteChoiceRef.operationName = 'DeleteChoice';

export function deleteChoice(dcOrVars, vars) {
  return executeMutation(deleteChoiceRef(dcOrVars, vars));
}

export const addAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddAnswer', inputVars);
}
addAnswerRef.operationName = 'AddAnswer';

export function addAnswer(dcOrVars, vars) {
  return executeMutation(addAnswerRef(dcOrVars, vars));
}

export const updateAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAnswer', inputVars);
}
updateAnswerRef.operationName = 'UpdateAnswer';

export function updateAnswer(dcOrVars, vars) {
  return executeMutation(updateAnswerRef(dcOrVars, vars));
}

export const createExamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateExam', inputVars);
}
createExamRef.operationName = 'CreateExam';

export function createExam(dcOrVars, vars) {
  return executeMutation(createExamRef(dcOrVars, vars));
}

export const updateExamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateExam', inputVars);
}
updateExamRef.operationName = 'UpdateExam';

export function updateExam(dcOrVars, vars) {
  return executeMutation(updateExamRef(dcOrVars, vars));
}

export const deleteExamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteExam', inputVars);
}
deleteExamRef.operationName = 'DeleteExam';

export function deleteExam(dcOrVars, vars) {
  return executeMutation(deleteExamRef(dcOrVars, vars));
}

export const addQuestionToExamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddQuestionToExam', inputVars);
}
addQuestionToExamRef.operationName = 'AddQuestionToExam';

export function addQuestionToExam(dcOrVars, vars) {
  return executeMutation(addQuestionToExamRef(dcOrVars, vars));
}

export const removeQuestionFromExamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveQuestionFromExam', inputVars);
}
removeQuestionFromExamRef.operationName = 'RemoveQuestionFromExam';

export function removeQuestionFromExam(dcOrVars, vars) {
  return executeMutation(removeQuestionFromExamRef(dcOrVars, vars));
}

export const startExamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'StartExam', inputVars);
}
startExamRef.operationName = 'StartExam';

export function startExam(dcOrVars, vars) {
  return executeMutation(startExamRef(dcOrVars, vars));
}

export const submitAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubmitAnswer', inputVars);
}
submitAnswerRef.operationName = 'SubmitAnswer';

export function submitAnswer(dcOrVars, vars) {
  return executeMutation(submitAnswerRef(dcOrVars, vars));
}

export const submitExamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubmitExam', inputVars);
}
submitExamRef.operationName = 'SubmitExam';

export function submitExam(dcOrVars, vars) {
  return executeMutation(submitExamRef(dcOrVars, vars));
}

export const gradeSubjectiveAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'GradeSubjectiveAnswer', inputVars);
}
gradeSubjectiveAnswerRef.operationName = 'GradeSubjectiveAnswer';

export function gradeSubjectiveAnswer(dcOrVars, vars) {
  return executeMutation(gradeSubjectiveAnswerRef(dcOrVars, vars));
}

export const finalizeExamGradingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'FinalizeExamGrading', inputVars);
}
finalizeExamGradingRef.operationName = 'FinalizeExamGrading';

export function finalizeExamGrading(dcOrVars, vars) {
  return executeMutation(finalizeExamGradingRef(dcOrVars, vars));
}

export const updateQuestionStatisticsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuestionStatistics', inputVars);
}
updateQuestionStatisticsRef.operationName = 'UpdateQuestionStatistics';

export function updateQuestionStatistics(dcOrVars, vars) {
  return executeMutation(updateQuestionStatisticsRef(dcOrVars, vars));
}

export const getCurrentUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUser');
}
getCurrentUserRef.operationName = 'GetCurrentUser';

export function getCurrentUser(dc) {
  return executeQuery(getCurrentUserRef(dc));
}

export const listAllUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllUsers');
}
listAllUsersRef.operationName = 'ListAllUsers';

export function listAllUsers(dc) {
  return executeQuery(listAllUsersRef(dc));
}

export const listCategoriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCategories');
}
listCategoriesRef.operationName = 'ListCategories';

export function listCategories(dc) {
  return executeQuery(listCategoriesRef(dc));
}

export const listQuestionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuestions', inputVars);
}
listQuestionsRef.operationName = 'ListQuestions';

export function listQuestions(dcOrVars, vars) {
  return executeQuery(listQuestionsRef(dcOrVars, vars));
}

export const getQuestionByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuestionById', inputVars);
}
getQuestionByIdRef.operationName = 'GetQuestionById';

export function getQuestionById(dcOrVars, vars) {
  return executeQuery(getQuestionByIdRef(dcOrVars, vars));
}

export const listExamsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExams', inputVars);
}
listExamsRef.operationName = 'ListExams';

export function listExams(dcOrVars, vars) {
  return executeQuery(listExamsRef(dcOrVars, vars));
}

export const getExamByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetExamById', inputVars);
}
getExamByIdRef.operationName = 'GetExamById';

export function getExamById(dcOrVars, vars) {
  return executeQuery(getExamByIdRef(dcOrVars, vars));
}

export const listMyExamAttemptsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyExamAttempts');
}
listMyExamAttemptsRef.operationName = 'ListMyExamAttempts';

export function listMyExamAttempts(dc) {
  return executeQuery(listMyExamAttemptsRef(dc));
}

export const getExamAttemptByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetExamAttemptById', inputVars);
}
getExamAttemptByIdRef.operationName = 'GetExamAttemptById';

export function getExamAttemptById(dcOrVars, vars) {
  return executeQuery(getExamAttemptByIdRef(dcOrVars, vars));
}

export const getExamAttemptsByExamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetExamAttemptsByExam', inputVars);
}
getExamAttemptsByExamRef.operationName = 'GetExamAttemptsByExam';

export function getExamAttemptsByExam(dcOrVars, vars) {
  return executeQuery(getExamAttemptsByExamRef(dcOrVars, vars));
}

export const getQuestionStatisticsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuestionStatistics', inputVars);
}
getQuestionStatisticsRef.operationName = 'GetQuestionStatistics';

export function getQuestionStatistics(dcOrVars, vars) {
  return executeQuery(getQuestionStatisticsRef(dcOrVars, vars));
}

export const listAvailableExamsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableExams');
}
listAvailableExamsRef.operationName = 'ListAvailableExams';

export function listAvailableExams(dc) {
  return executeQuery(listAvailableExamsRef(dc));
}

