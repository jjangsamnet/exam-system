const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'exam-system',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const getCurrentUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUser');
}
getCurrentUserRef.operationName = 'GetCurrentUser';
exports.getCurrentUserRef = getCurrentUserRef;

exports.getCurrentUser = function getCurrentUser(dc) {
  return executeQuery(getCurrentUserRef(dc));
};

const listAllUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllUsers');
}
listAllUsersRef.operationName = 'ListAllUsers';
exports.listAllUsersRef = listAllUsersRef;

exports.listAllUsers = function listAllUsers(dc) {
  return executeQuery(listAllUsersRef(dc));
};

const listCategoriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCategories');
}
listCategoriesRef.operationName = 'ListCategories';
exports.listCategoriesRef = listCategoriesRef;

exports.listCategories = function listCategories(dc) {
  return executeQuery(listCategoriesRef(dc));
};

const listQuestionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuestions', inputVars);
}
listQuestionsRef.operationName = 'ListQuestions';
exports.listQuestionsRef = listQuestionsRef;

exports.listQuestions = function listQuestions(dcOrVars, vars) {
  return executeQuery(listQuestionsRef(dcOrVars, vars));
};

const getQuestionByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuestionById', inputVars);
}
getQuestionByIdRef.operationName = 'GetQuestionById';
exports.getQuestionByIdRef = getQuestionByIdRef;

exports.getQuestionById = function getQuestionById(dcOrVars, vars) {
  return executeQuery(getQuestionByIdRef(dcOrVars, vars));
};

const listExamsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExams', inputVars);
}
listExamsRef.operationName = 'ListExams';
exports.listExamsRef = listExamsRef;

exports.listExams = function listExams(dcOrVars, vars) {
  return executeQuery(listExamsRef(dcOrVars, vars));
};

const getExamByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetExamById', inputVars);
}
getExamByIdRef.operationName = 'GetExamById';
exports.getExamByIdRef = getExamByIdRef;

exports.getExamById = function getExamById(dcOrVars, vars) {
  return executeQuery(getExamByIdRef(dcOrVars, vars));
};

const listMyExamAttemptsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyExamAttempts');
}
listMyExamAttemptsRef.operationName = 'ListMyExamAttempts';
exports.listMyExamAttemptsRef = listMyExamAttemptsRef;

exports.listMyExamAttempts = function listMyExamAttempts(dc) {
  return executeQuery(listMyExamAttemptsRef(dc));
};

const getExamAttemptByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetExamAttemptById', inputVars);
}
getExamAttemptByIdRef.operationName = 'GetExamAttemptById';
exports.getExamAttemptByIdRef = getExamAttemptByIdRef;

exports.getExamAttemptById = function getExamAttemptById(dcOrVars, vars) {
  return executeQuery(getExamAttemptByIdRef(dcOrVars, vars));
};

const getExamAttemptsByExamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetExamAttemptsByExam', inputVars);
}
getExamAttemptsByExamRef.operationName = 'GetExamAttemptsByExam';
exports.getExamAttemptsByExamRef = getExamAttemptsByExamRef;

exports.getExamAttemptsByExam = function getExamAttemptsByExam(dcOrVars, vars) {
  return executeQuery(getExamAttemptsByExamRef(dcOrVars, vars));
};

const listAvailableExamsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableExams');
}
listAvailableExamsRef.operationName = 'ListAvailableExams';
exports.listAvailableExamsRef = listAvailableExamsRef;

exports.listAvailableExams = function listAvailableExams(dc) {
  return executeQuery(listAvailableExamsRef(dc));
};

const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';
exports.upsertUserRef = upsertUserRef;

exports.upsertUser = function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
};

const createCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCategory', inputVars);
}
createCategoryRef.operationName = 'CreateCategory';
exports.createCategoryRef = createCategoryRef;

exports.createCategory = function createCategory(dcOrVars, vars) {
  return executeMutation(createCategoryRef(dcOrVars, vars));
};

const updateCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCategory', inputVars);
}
updateCategoryRef.operationName = 'UpdateCategory';
exports.updateCategoryRef = updateCategoryRef;

exports.updateCategory = function updateCategory(dcOrVars, vars) {
  return executeMutation(updateCategoryRef(dcOrVars, vars));
};

const deleteCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteCategory', inputVars);
}
deleteCategoryRef.operationName = 'DeleteCategory';
exports.deleteCategoryRef = deleteCategoryRef;

exports.deleteCategory = function deleteCategory(dcOrVars, vars) {
  return executeMutation(deleteCategoryRef(dcOrVars, vars));
};

const createQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestion', inputVars);
}
createQuestionRef.operationName = 'CreateQuestion';
exports.createQuestionRef = createQuestionRef;

exports.createQuestion = function createQuestion(dcOrVars, vars) {
  return executeMutation(createQuestionRef(dcOrVars, vars));
};

const updateQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuestion', inputVars);
}
updateQuestionRef.operationName = 'UpdateQuestion';
exports.updateQuestionRef = updateQuestionRef;

exports.updateQuestion = function updateQuestion(dcOrVars, vars) {
  return executeMutation(updateQuestionRef(dcOrVars, vars));
};

const deleteQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteQuestion', inputVars);
}
deleteQuestionRef.operationName = 'DeleteQuestion';
exports.deleteQuestionRef = deleteQuestionRef;

exports.deleteQuestion = function deleteQuestion(dcOrVars, vars) {
  return executeMutation(deleteQuestionRef(dcOrVars, vars));
};

const addChoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddChoice', inputVars);
}
addChoiceRef.operationName = 'AddChoice';
exports.addChoiceRef = addChoiceRef;

exports.addChoice = function addChoice(dcOrVars, vars) {
  return executeMutation(addChoiceRef(dcOrVars, vars));
};

const updateChoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateChoice', inputVars);
}
updateChoiceRef.operationName = 'UpdateChoice';
exports.updateChoiceRef = updateChoiceRef;

exports.updateChoice = function updateChoice(dcOrVars, vars) {
  return executeMutation(updateChoiceRef(dcOrVars, vars));
};

const deleteChoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteChoice', inputVars);
}
deleteChoiceRef.operationName = 'DeleteChoice';
exports.deleteChoiceRef = deleteChoiceRef;

exports.deleteChoice = function deleteChoice(dcOrVars, vars) {
  return executeMutation(deleteChoiceRef(dcOrVars, vars));
};

const addAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddAnswer', inputVars);
}
addAnswerRef.operationName = 'AddAnswer';
exports.addAnswerRef = addAnswerRef;

exports.addAnswer = function addAnswer(dcOrVars, vars) {
  return executeMutation(addAnswerRef(dcOrVars, vars));
};

const updateAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAnswer', inputVars);
}
updateAnswerRef.operationName = 'UpdateAnswer';
exports.updateAnswerRef = updateAnswerRef;

exports.updateAnswer = function updateAnswer(dcOrVars, vars) {
  return executeMutation(updateAnswerRef(dcOrVars, vars));
};

const createExamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateExam', inputVars);
}
createExamRef.operationName = 'CreateExam';
exports.createExamRef = createExamRef;

exports.createExam = function createExam(dcOrVars, vars) {
  return executeMutation(createExamRef(dcOrVars, vars));
};

const updateExamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateExam', inputVars);
}
updateExamRef.operationName = 'UpdateExam';
exports.updateExamRef = updateExamRef;

exports.updateExam = function updateExam(dcOrVars, vars) {
  return executeMutation(updateExamRef(dcOrVars, vars));
};

const deleteExamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteExam', inputVars);
}
deleteExamRef.operationName = 'DeleteExam';
exports.deleteExamRef = deleteExamRef;

exports.deleteExam = function deleteExam(dcOrVars, vars) {
  return executeMutation(deleteExamRef(dcOrVars, vars));
};

const addQuestionToExamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddQuestionToExam', inputVars);
}
addQuestionToExamRef.operationName = 'AddQuestionToExam';
exports.addQuestionToExamRef = addQuestionToExamRef;

exports.addQuestionToExam = function addQuestionToExam(dcOrVars, vars) {
  return executeMutation(addQuestionToExamRef(dcOrVars, vars));
};

const removeQuestionFromExamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveQuestionFromExam', inputVars);
}
removeQuestionFromExamRef.operationName = 'RemoveQuestionFromExam';
exports.removeQuestionFromExamRef = removeQuestionFromExamRef;

exports.removeQuestionFromExam = function removeQuestionFromExam(dcOrVars, vars) {
  return executeMutation(removeQuestionFromExamRef(dcOrVars, vars));
};

const startExamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'StartExam', inputVars);
}
startExamRef.operationName = 'StartExam';
exports.startExamRef = startExamRef;

exports.startExam = function startExam(dcOrVars, vars) {
  return executeMutation(startExamRef(dcOrVars, vars));
};

const submitExamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubmitExam', inputVars);
}
submitExamRef.operationName = 'SubmitExam';
exports.submitExamRef = submitExamRef;

exports.submitExam = function submitExam(dcOrVars, vars) {
  return executeMutation(submitExamRef(dcOrVars, vars));
};

const gradeSubjectiveAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'GradeSubjectiveAnswer', inputVars);
}
gradeSubjectiveAnswerRef.operationName = 'GradeSubjectiveAnswer';
exports.gradeSubjectiveAnswerRef = gradeSubjectiveAnswerRef;

exports.gradeSubjectiveAnswer = function gradeSubjectiveAnswer(dcOrVars, vars) {
  return executeMutation(gradeSubjectiveAnswerRef(dcOrVars, vars));
};

const finalizeExamGradingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'FinalizeExamGrading', inputVars);
}
finalizeExamGradingRef.operationName = 'FinalizeExamGrading';
exports.finalizeExamGradingRef = finalizeExamGradingRef;

exports.finalizeExamGrading = function finalizeExamGrading(dcOrVars, vars) {
  return executeMutation(finalizeExamGradingRef(dcOrVars, vars));
};
