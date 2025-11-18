# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*ListAllUsers*](#listallusers)
  - [*ListCategories*](#listcategories)
  - [*ListQuestions*](#listquestions)
  - [*GetQuestionById*](#getquestionbyid)
  - [*ListExams*](#listexams)
  - [*GetExamById*](#getexambyid)
  - [*ListMyExamAttempts*](#listmyexamattempts)
  - [*GetExamAttemptById*](#getexamattemptbyid)
  - [*GetExamAttemptsByExam*](#getexamattemptsbyexam)
  - [*GetQuestionStatistics*](#getquestionstatistics)
  - [*ListAvailableExams*](#listavailableexams)
- [**Mutations**](#mutations)
  - [*UpsertUser*](#upsertuser)
  - [*CreateCategory*](#createcategory)
  - [*UpdateCategory*](#updatecategory)
  - [*DeleteCategory*](#deletecategory)
  - [*CreateQuestion*](#createquestion)
  - [*UpdateQuestion*](#updatequestion)
  - [*DeleteQuestion*](#deletequestion)
  - [*AddChoice*](#addchoice)
  - [*UpdateChoice*](#updatechoice)
  - [*DeleteChoice*](#deletechoice)
  - [*AddAnswer*](#addanswer)
  - [*UpdateAnswer*](#updateanswer)
  - [*CreateExam*](#createexam)
  - [*UpdateExam*](#updateexam)
  - [*DeleteExam*](#deleteexam)
  - [*AddQuestionToExam*](#addquestiontoexam)
  - [*RemoveQuestionFromExam*](#removequestionfromexam)
  - [*StartExam*](#startexam)
  - [*SubmitAnswer*](#submitanswer)
  - [*SubmitExam*](#submitexam)
  - [*GradeSubjectiveAnswer*](#gradesubjectiveanswer)
  - [*FinalizeExamGrading*](#finalizeexamgrading)
  - [*UpdateQuestionStatistics*](#updatequestionstatistics)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCurrentUserData {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: TimestampString;
  } & User_Key;
}
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@dataconnect/generated';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@dataconnect/generated';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListAllUsers
You can execute the `ListAllUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllUsers(): QueryPromise<ListAllUsersData, undefined>;

interface ListAllUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
}
export const listAllUsersRef: ListAllUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllUsers(dc: DataConnect): QueryPromise<ListAllUsersData, undefined>;

interface ListAllUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
}
export const listAllUsersRef: ListAllUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllUsersRef:
```typescript
const name = listAllUsersRef.operationName;
console.log(name);
```

### Variables
The `ListAllUsers` query has no variables.
### Return Type
Recall that executing the `ListAllUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAllUsersData {
  users: ({
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: TimestampString;
  } & User_Key)[];
}
```
### Using `ListAllUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllUsers } from '@dataconnect/generated';


// Call the `listAllUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listAllUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListAllUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllUsersRef } from '@dataconnect/generated';


// Call the `listAllUsersRef()` function to get a reference to the query.
const ref = listAllUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## ListCategories
You can execute the `ListCategories` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCategories(): QueryPromise<ListCategoriesData, undefined>;

interface ListCategoriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCategoriesData, undefined>;
}
export const listCategoriesRef: ListCategoriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCategories(dc: DataConnect): QueryPromise<ListCategoriesData, undefined>;

interface ListCategoriesRef {
  ...
  (dc: DataConnect): QueryRef<ListCategoriesData, undefined>;
}
export const listCategoriesRef: ListCategoriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCategoriesRef:
```typescript
const name = listCategoriesRef.operationName;
console.log(name);
```

### Variables
The `ListCategories` query has no variables.
### Return Type
Recall that executing the `ListCategories` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCategoriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListCategories`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCategories } from '@dataconnect/generated';


// Call the `listCategories()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCategories();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCategories(dataConnect);

console.log(data.categories);

// Or, you can use the `Promise` API.
listCategories().then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

### Using `ListCategories`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCategoriesRef } from '@dataconnect/generated';


// Call the `listCategoriesRef()` function to get a reference to the query.
const ref = listCategoriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCategoriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.categories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

## ListQuestions
You can execute the `ListQuestions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listQuestions(vars?: ListQuestionsVariables): QueryPromise<ListQuestionsData, ListQuestionsVariables>;

interface ListQuestionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListQuestionsVariables): QueryRef<ListQuestionsData, ListQuestionsVariables>;
}
export const listQuestionsRef: ListQuestionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listQuestions(dc: DataConnect, vars?: ListQuestionsVariables): QueryPromise<ListQuestionsData, ListQuestionsVariables>;

interface ListQuestionsRef {
  ...
  (dc: DataConnect, vars?: ListQuestionsVariables): QueryRef<ListQuestionsData, ListQuestionsVariables>;
}
export const listQuestionsRef: ListQuestionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listQuestionsRef:
```typescript
const name = listQuestionsRef.operationName;
console.log(name);
```

### Variables
The `ListQuestions` query has an optional argument of type `ListQuestionsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListQuestionsVariables {
  categoryId?: UUIDString | null;
  difficulty?: string | null;
  type?: string | null;
}
```
### Return Type
Recall that executing the `ListQuestions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListQuestionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListQuestions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listQuestions, ListQuestionsVariables } from '@dataconnect/generated';

// The `ListQuestions` query has an optional argument of type `ListQuestionsVariables`:
const listQuestionsVars: ListQuestionsVariables = {
  categoryId: ..., // optional
  difficulty: ..., // optional
  type: ..., // optional
};

// Call the `listQuestions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listQuestions(listQuestionsVars);
// Variables can be defined inline as well.
const { data } = await listQuestions({ categoryId: ..., difficulty: ..., type: ..., });
// Since all variables are optional for this query, you can omit the `ListQuestionsVariables` argument.
const { data } = await listQuestions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listQuestions(dataConnect, listQuestionsVars);

console.log(data.questions);

// Or, you can use the `Promise` API.
listQuestions(listQuestionsVars).then((response) => {
  const data = response.data;
  console.log(data.questions);
});
```

### Using `ListQuestions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listQuestionsRef, ListQuestionsVariables } from '@dataconnect/generated';

// The `ListQuestions` query has an optional argument of type `ListQuestionsVariables`:
const listQuestionsVars: ListQuestionsVariables = {
  categoryId: ..., // optional
  difficulty: ..., // optional
  type: ..., // optional
};

// Call the `listQuestionsRef()` function to get a reference to the query.
const ref = listQuestionsRef(listQuestionsVars);
// Variables can be defined inline as well.
const ref = listQuestionsRef({ categoryId: ..., difficulty: ..., type: ..., });
// Since all variables are optional for this query, you can omit the `ListQuestionsVariables` argument.
const ref = listQuestionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listQuestionsRef(dataConnect, listQuestionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.questions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.questions);
});
```

## GetQuestionById
You can execute the `GetQuestionById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getQuestionById(vars: GetQuestionByIdVariables): QueryPromise<GetQuestionByIdData, GetQuestionByIdVariables>;

interface GetQuestionByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionByIdVariables): QueryRef<GetQuestionByIdData, GetQuestionByIdVariables>;
}
export const getQuestionByIdRef: GetQuestionByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuestionById(dc: DataConnect, vars: GetQuestionByIdVariables): QueryPromise<GetQuestionByIdData, GetQuestionByIdVariables>;

interface GetQuestionByIdRef {
  ...
  (dc: DataConnect, vars: GetQuestionByIdVariables): QueryRef<GetQuestionByIdData, GetQuestionByIdVariables>;
}
export const getQuestionByIdRef: GetQuestionByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuestionByIdRef:
```typescript
const name = getQuestionByIdRef.operationName;
console.log(name);
```

### Variables
The `GetQuestionById` query requires an argument of type `GetQuestionByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuestionByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetQuestionById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuestionByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetQuestionById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuestionById, GetQuestionByIdVariables } from '@dataconnect/generated';

// The `GetQuestionById` query requires an argument of type `GetQuestionByIdVariables`:
const getQuestionByIdVars: GetQuestionByIdVariables = {
  id: ..., 
};

// Call the `getQuestionById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuestionById(getQuestionByIdVars);
// Variables can be defined inline as well.
const { data } = await getQuestionById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuestionById(dataConnect, getQuestionByIdVars);

console.log(data.question);

// Or, you can use the `Promise` API.
getQuestionById(getQuestionByIdVars).then((response) => {
  const data = response.data;
  console.log(data.question);
});
```

### Using `GetQuestionById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuestionByIdRef, GetQuestionByIdVariables } from '@dataconnect/generated';

// The `GetQuestionById` query requires an argument of type `GetQuestionByIdVariables`:
const getQuestionByIdVars: GetQuestionByIdVariables = {
  id: ..., 
};

// Call the `getQuestionByIdRef()` function to get a reference to the query.
const ref = getQuestionByIdRef(getQuestionByIdVars);
// Variables can be defined inline as well.
const ref = getQuestionByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuestionByIdRef(dataConnect, getQuestionByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.question);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.question);
});
```

## ListExams
You can execute the `ListExams` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listExams(vars?: ListExamsVariables): QueryPromise<ListExamsData, ListExamsVariables>;

interface ListExamsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListExamsVariables): QueryRef<ListExamsData, ListExamsVariables>;
}
export const listExamsRef: ListExamsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listExams(dc: DataConnect, vars?: ListExamsVariables): QueryPromise<ListExamsData, ListExamsVariables>;

interface ListExamsRef {
  ...
  (dc: DataConnect, vars?: ListExamsVariables): QueryRef<ListExamsData, ListExamsVariables>;
}
export const listExamsRef: ListExamsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listExamsRef:
```typescript
const name = listExamsRef.operationName;
console.log(name);
```

### Variables
The `ListExams` query has an optional argument of type `ListExamsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListExamsVariables {
  isPublished?: boolean | null;
}
```
### Return Type
Recall that executing the `ListExams` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListExamsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListExams`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listExams, ListExamsVariables } from '@dataconnect/generated';

// The `ListExams` query has an optional argument of type `ListExamsVariables`:
const listExamsVars: ListExamsVariables = {
  isPublished: ..., // optional
};

// Call the `listExams()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listExams(listExamsVars);
// Variables can be defined inline as well.
const { data } = await listExams({ isPublished: ..., });
// Since all variables are optional for this query, you can omit the `ListExamsVariables` argument.
const { data } = await listExams();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listExams(dataConnect, listExamsVars);

console.log(data.exams);

// Or, you can use the `Promise` API.
listExams(listExamsVars).then((response) => {
  const data = response.data;
  console.log(data.exams);
});
```

### Using `ListExams`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listExamsRef, ListExamsVariables } from '@dataconnect/generated';

// The `ListExams` query has an optional argument of type `ListExamsVariables`:
const listExamsVars: ListExamsVariables = {
  isPublished: ..., // optional
};

// Call the `listExamsRef()` function to get a reference to the query.
const ref = listExamsRef(listExamsVars);
// Variables can be defined inline as well.
const ref = listExamsRef({ isPublished: ..., });
// Since all variables are optional for this query, you can omit the `ListExamsVariables` argument.
const ref = listExamsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listExamsRef(dataConnect, listExamsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.exams);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.exams);
});
```

## GetExamById
You can execute the `GetExamById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getExamById(vars: GetExamByIdVariables): QueryPromise<GetExamByIdData, GetExamByIdVariables>;

interface GetExamByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetExamByIdVariables): QueryRef<GetExamByIdData, GetExamByIdVariables>;
}
export const getExamByIdRef: GetExamByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getExamById(dc: DataConnect, vars: GetExamByIdVariables): QueryPromise<GetExamByIdData, GetExamByIdVariables>;

interface GetExamByIdRef {
  ...
  (dc: DataConnect, vars: GetExamByIdVariables): QueryRef<GetExamByIdData, GetExamByIdVariables>;
}
export const getExamByIdRef: GetExamByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getExamByIdRef:
```typescript
const name = getExamByIdRef.operationName;
console.log(name);
```

### Variables
The `GetExamById` query requires an argument of type `GetExamByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetExamByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetExamById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetExamByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetExamById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getExamById, GetExamByIdVariables } from '@dataconnect/generated';

// The `GetExamById` query requires an argument of type `GetExamByIdVariables`:
const getExamByIdVars: GetExamByIdVariables = {
  id: ..., 
};

// Call the `getExamById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getExamById(getExamByIdVars);
// Variables can be defined inline as well.
const { data } = await getExamById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getExamById(dataConnect, getExamByIdVars);

console.log(data.exam);

// Or, you can use the `Promise` API.
getExamById(getExamByIdVars).then((response) => {
  const data = response.data;
  console.log(data.exam);
});
```

### Using `GetExamById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getExamByIdRef, GetExamByIdVariables } from '@dataconnect/generated';

// The `GetExamById` query requires an argument of type `GetExamByIdVariables`:
const getExamByIdVars: GetExamByIdVariables = {
  id: ..., 
};

// Call the `getExamByIdRef()` function to get a reference to the query.
const ref = getExamByIdRef(getExamByIdVars);
// Variables can be defined inline as well.
const ref = getExamByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getExamByIdRef(dataConnect, getExamByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.exam);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.exam);
});
```

## ListMyExamAttempts
You can execute the `ListMyExamAttempts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyExamAttempts(): QueryPromise<ListMyExamAttemptsData, undefined>;

interface ListMyExamAttemptsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyExamAttemptsData, undefined>;
}
export const listMyExamAttemptsRef: ListMyExamAttemptsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyExamAttempts(dc: DataConnect): QueryPromise<ListMyExamAttemptsData, undefined>;

interface ListMyExamAttemptsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyExamAttemptsData, undefined>;
}
export const listMyExamAttemptsRef: ListMyExamAttemptsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyExamAttemptsRef:
```typescript
const name = listMyExamAttemptsRef.operationName;
console.log(name);
```

### Variables
The `ListMyExamAttempts` query has no variables.
### Return Type
Recall that executing the `ListMyExamAttempts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyExamAttemptsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListMyExamAttempts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyExamAttempts } from '@dataconnect/generated';


// Call the `listMyExamAttempts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyExamAttempts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyExamAttempts(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
listMyExamAttempts().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `ListMyExamAttempts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyExamAttemptsRef } from '@dataconnect/generated';


// Call the `listMyExamAttemptsRef()` function to get a reference to the query.
const ref = listMyExamAttemptsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyExamAttemptsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetExamAttemptById
You can execute the `GetExamAttemptById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getExamAttemptById(vars: GetExamAttemptByIdVariables): QueryPromise<GetExamAttemptByIdData, GetExamAttemptByIdVariables>;

interface GetExamAttemptByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetExamAttemptByIdVariables): QueryRef<GetExamAttemptByIdData, GetExamAttemptByIdVariables>;
}
export const getExamAttemptByIdRef: GetExamAttemptByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getExamAttemptById(dc: DataConnect, vars: GetExamAttemptByIdVariables): QueryPromise<GetExamAttemptByIdData, GetExamAttemptByIdVariables>;

interface GetExamAttemptByIdRef {
  ...
  (dc: DataConnect, vars: GetExamAttemptByIdVariables): QueryRef<GetExamAttemptByIdData, GetExamAttemptByIdVariables>;
}
export const getExamAttemptByIdRef: GetExamAttemptByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getExamAttemptByIdRef:
```typescript
const name = getExamAttemptByIdRef.operationName;
console.log(name);
```

### Variables
The `GetExamAttemptById` query requires an argument of type `GetExamAttemptByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetExamAttemptByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetExamAttemptById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetExamAttemptByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetExamAttemptById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getExamAttemptById, GetExamAttemptByIdVariables } from '@dataconnect/generated';

// The `GetExamAttemptById` query requires an argument of type `GetExamAttemptByIdVariables`:
const getExamAttemptByIdVars: GetExamAttemptByIdVariables = {
  id: ..., 
};

// Call the `getExamAttemptById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getExamAttemptById(getExamAttemptByIdVars);
// Variables can be defined inline as well.
const { data } = await getExamAttemptById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getExamAttemptById(dataConnect, getExamAttemptByIdVars);

console.log(data.examAttempt);

// Or, you can use the `Promise` API.
getExamAttemptById(getExamAttemptByIdVars).then((response) => {
  const data = response.data;
  console.log(data.examAttempt);
});
```

### Using `GetExamAttemptById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getExamAttemptByIdRef, GetExamAttemptByIdVariables } from '@dataconnect/generated';

// The `GetExamAttemptById` query requires an argument of type `GetExamAttemptByIdVariables`:
const getExamAttemptByIdVars: GetExamAttemptByIdVariables = {
  id: ..., 
};

// Call the `getExamAttemptByIdRef()` function to get a reference to the query.
const ref = getExamAttemptByIdRef(getExamAttemptByIdVars);
// Variables can be defined inline as well.
const ref = getExamAttemptByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getExamAttemptByIdRef(dataConnect, getExamAttemptByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.examAttempt);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.examAttempt);
});
```

## GetExamAttemptsByExam
You can execute the `GetExamAttemptsByExam` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getExamAttemptsByExam(vars: GetExamAttemptsByExamVariables): QueryPromise<GetExamAttemptsByExamData, GetExamAttemptsByExamVariables>;

interface GetExamAttemptsByExamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetExamAttemptsByExamVariables): QueryRef<GetExamAttemptsByExamData, GetExamAttemptsByExamVariables>;
}
export const getExamAttemptsByExamRef: GetExamAttemptsByExamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getExamAttemptsByExam(dc: DataConnect, vars: GetExamAttemptsByExamVariables): QueryPromise<GetExamAttemptsByExamData, GetExamAttemptsByExamVariables>;

interface GetExamAttemptsByExamRef {
  ...
  (dc: DataConnect, vars: GetExamAttemptsByExamVariables): QueryRef<GetExamAttemptsByExamData, GetExamAttemptsByExamVariables>;
}
export const getExamAttemptsByExamRef: GetExamAttemptsByExamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getExamAttemptsByExamRef:
```typescript
const name = getExamAttemptsByExamRef.operationName;
console.log(name);
```

### Variables
The `GetExamAttemptsByExam` query requires an argument of type `GetExamAttemptsByExamVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetExamAttemptsByExamVariables {
  examId: UUIDString;
}
```
### Return Type
Recall that executing the `GetExamAttemptsByExam` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetExamAttemptsByExamData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetExamAttemptsByExam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getExamAttemptsByExam, GetExamAttemptsByExamVariables } from '@dataconnect/generated';

// The `GetExamAttemptsByExam` query requires an argument of type `GetExamAttemptsByExamVariables`:
const getExamAttemptsByExamVars: GetExamAttemptsByExamVariables = {
  examId: ..., 
};

// Call the `getExamAttemptsByExam()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getExamAttemptsByExam(getExamAttemptsByExamVars);
// Variables can be defined inline as well.
const { data } = await getExamAttemptsByExam({ examId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getExamAttemptsByExam(dataConnect, getExamAttemptsByExamVars);

console.log(data.exam);

// Or, you can use the `Promise` API.
getExamAttemptsByExam(getExamAttemptsByExamVars).then((response) => {
  const data = response.data;
  console.log(data.exam);
});
```

### Using `GetExamAttemptsByExam`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getExamAttemptsByExamRef, GetExamAttemptsByExamVariables } from '@dataconnect/generated';

// The `GetExamAttemptsByExam` query requires an argument of type `GetExamAttemptsByExamVariables`:
const getExamAttemptsByExamVars: GetExamAttemptsByExamVariables = {
  examId: ..., 
};

// Call the `getExamAttemptsByExamRef()` function to get a reference to the query.
const ref = getExamAttemptsByExamRef(getExamAttemptsByExamVars);
// Variables can be defined inline as well.
const ref = getExamAttemptsByExamRef({ examId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getExamAttemptsByExamRef(dataConnect, getExamAttemptsByExamVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.exam);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.exam);
});
```

## GetQuestionStatistics
You can execute the `GetQuestionStatistics` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getQuestionStatistics(vars: GetQuestionStatisticsVariables): QueryPromise<GetQuestionStatisticsData, GetQuestionStatisticsVariables>;

interface GetQuestionStatisticsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionStatisticsVariables): QueryRef<GetQuestionStatisticsData, GetQuestionStatisticsVariables>;
}
export const getQuestionStatisticsRef: GetQuestionStatisticsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuestionStatistics(dc: DataConnect, vars: GetQuestionStatisticsVariables): QueryPromise<GetQuestionStatisticsData, GetQuestionStatisticsVariables>;

interface GetQuestionStatisticsRef {
  ...
  (dc: DataConnect, vars: GetQuestionStatisticsVariables): QueryRef<GetQuestionStatisticsData, GetQuestionStatisticsVariables>;
}
export const getQuestionStatisticsRef: GetQuestionStatisticsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuestionStatisticsRef:
```typescript
const name = getQuestionStatisticsRef.operationName;
console.log(name);
```

### Variables
The `GetQuestionStatistics` query requires an argument of type `GetQuestionStatisticsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuestionStatisticsVariables {
  questionId: UUIDString;
}
```
### Return Type
Recall that executing the `GetQuestionStatistics` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuestionStatisticsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetQuestionStatisticsData {
  questionStatistics?: {
    question: {
      questionText: string;
    };
      totalAttempts: number;
      correctAttempts: number;
      averageScore?: number | null;
      lastUpdated: TimestampString;
  };
}
```
### Using `GetQuestionStatistics`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuestionStatistics, GetQuestionStatisticsVariables } from '@dataconnect/generated';

// The `GetQuestionStatistics` query requires an argument of type `GetQuestionStatisticsVariables`:
const getQuestionStatisticsVars: GetQuestionStatisticsVariables = {
  questionId: ..., 
};

// Call the `getQuestionStatistics()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuestionStatistics(getQuestionStatisticsVars);
// Variables can be defined inline as well.
const { data } = await getQuestionStatistics({ questionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuestionStatistics(dataConnect, getQuestionStatisticsVars);

console.log(data.questionStatistics);

// Or, you can use the `Promise` API.
getQuestionStatistics(getQuestionStatisticsVars).then((response) => {
  const data = response.data;
  console.log(data.questionStatistics);
});
```

### Using `GetQuestionStatistics`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuestionStatisticsRef, GetQuestionStatisticsVariables } from '@dataconnect/generated';

// The `GetQuestionStatistics` query requires an argument of type `GetQuestionStatisticsVariables`:
const getQuestionStatisticsVars: GetQuestionStatisticsVariables = {
  questionId: ..., 
};

// Call the `getQuestionStatisticsRef()` function to get a reference to the query.
const ref = getQuestionStatisticsRef(getQuestionStatisticsVars);
// Variables can be defined inline as well.
const ref = getQuestionStatisticsRef({ questionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuestionStatisticsRef(dataConnect, getQuestionStatisticsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.questionStatistics);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.questionStatistics);
});
```

## ListAvailableExams
You can execute the `ListAvailableExams` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAvailableExams(): QueryPromise<ListAvailableExamsData, undefined>;

interface ListAvailableExamsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAvailableExamsData, undefined>;
}
export const listAvailableExamsRef: ListAvailableExamsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAvailableExams(dc: DataConnect): QueryPromise<ListAvailableExamsData, undefined>;

interface ListAvailableExamsRef {
  ...
  (dc: DataConnect): QueryRef<ListAvailableExamsData, undefined>;
}
export const listAvailableExamsRef: ListAvailableExamsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAvailableExamsRef:
```typescript
const name = listAvailableExamsRef.operationName;
console.log(name);
```

### Variables
The `ListAvailableExams` query has no variables.
### Return Type
Recall that executing the `ListAvailableExams` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAvailableExamsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAvailableExams`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAvailableExams } from '@dataconnect/generated';


// Call the `listAvailableExams()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAvailableExams();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAvailableExams(dataConnect);

console.log(data.exams);

// Or, you can use the `Promise` API.
listAvailableExams().then((response) => {
  const data = response.data;
  console.log(data.exams);
});
```

### Using `ListAvailableExams`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAvailableExamsRef } from '@dataconnect/generated';


// Call the `listAvailableExamsRef()` function to get a reference to the query.
const ref = listAvailableExamsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAvailableExamsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.exams);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.exams);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertUser
You can execute the `UpsertUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertUserRef:
```typescript
const name = upsertUserRef.operationName;
console.log(name);
```

### Variables
The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertUserVariables {
  email: string;
  name: string;
  role: string;
}
```
### Return Type
Recall that executing the `UpsertUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertUserData {
  user_upsert: User_Key;
}
```
### Using `UpsertUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertUser, UpsertUserVariables } from '@dataconnect/generated';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  email: ..., 
  name: ..., 
  role: ..., 
};

// Call the `upsertUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertUser(upsertUserVars);
// Variables can be defined inline as well.
const { data } = await upsertUser({ email: ..., name: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertUser(dataConnect, upsertUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
upsertUser(upsertUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `UpsertUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertUserRef, UpsertUserVariables } from '@dataconnect/generated';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  email: ..., 
  name: ..., 
  role: ..., 
};

// Call the `upsertUserRef()` function to get a reference to the mutation.
const ref = upsertUserRef(upsertUserVars);
// Variables can be defined inline as well.
const ref = upsertUserRef({ email: ..., name: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertUserRef(dataConnect, upsertUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

## CreateCategory
You can execute the `CreateCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCategory(vars: CreateCategoryVariables): MutationPromise<CreateCategoryData, CreateCategoryVariables>;

interface CreateCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCategoryVariables): MutationRef<CreateCategoryData, CreateCategoryVariables>;
}
export const createCategoryRef: CreateCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCategory(dc: DataConnect, vars: CreateCategoryVariables): MutationPromise<CreateCategoryData, CreateCategoryVariables>;

interface CreateCategoryRef {
  ...
  (dc: DataConnect, vars: CreateCategoryVariables): MutationRef<CreateCategoryData, CreateCategoryVariables>;
}
export const createCategoryRef: CreateCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCategoryRef:
```typescript
const name = createCategoryRef.operationName;
console.log(name);
```

### Variables
The `CreateCategory` mutation requires an argument of type `CreateCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateCategoryVariables {
  name: string;
  description?: string | null;
  parentCategoryId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreateCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCategoryData {
  category_insert: Category_Key;
}
```
### Using `CreateCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCategory, CreateCategoryVariables } from '@dataconnect/generated';

// The `CreateCategory` mutation requires an argument of type `CreateCategoryVariables`:
const createCategoryVars: CreateCategoryVariables = {
  name: ..., 
  description: ..., // optional
  parentCategoryId: ..., // optional
};

// Call the `createCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCategory(createCategoryVars);
// Variables can be defined inline as well.
const { data } = await createCategory({ name: ..., description: ..., parentCategoryId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCategory(dataConnect, createCategoryVars);

console.log(data.category_insert);

// Or, you can use the `Promise` API.
createCategory(createCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.category_insert);
});
```

### Using `CreateCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCategoryRef, CreateCategoryVariables } from '@dataconnect/generated';

// The `CreateCategory` mutation requires an argument of type `CreateCategoryVariables`:
const createCategoryVars: CreateCategoryVariables = {
  name: ..., 
  description: ..., // optional
  parentCategoryId: ..., // optional
};

// Call the `createCategoryRef()` function to get a reference to the mutation.
const ref = createCategoryRef(createCategoryVars);
// Variables can be defined inline as well.
const ref = createCategoryRef({ name: ..., description: ..., parentCategoryId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCategoryRef(dataConnect, createCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.category_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.category_insert);
});
```

## UpdateCategory
You can execute the `UpdateCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCategory(vars: UpdateCategoryVariables): MutationPromise<UpdateCategoryData, UpdateCategoryVariables>;

interface UpdateCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCategoryVariables): MutationRef<UpdateCategoryData, UpdateCategoryVariables>;
}
export const updateCategoryRef: UpdateCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCategory(dc: DataConnect, vars: UpdateCategoryVariables): MutationPromise<UpdateCategoryData, UpdateCategoryVariables>;

interface UpdateCategoryRef {
  ...
  (dc: DataConnect, vars: UpdateCategoryVariables): MutationRef<UpdateCategoryData, UpdateCategoryVariables>;
}
export const updateCategoryRef: UpdateCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCategoryRef:
```typescript
const name = updateCategoryRef.operationName;
console.log(name);
```

### Variables
The `UpdateCategory` mutation requires an argument of type `UpdateCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCategoryVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
}
```
### Return Type
Recall that executing the `UpdateCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCategoryData {
  category_update?: Category_Key | null;
}
```
### Using `UpdateCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCategory, UpdateCategoryVariables } from '@dataconnect/generated';

// The `UpdateCategory` mutation requires an argument of type `UpdateCategoryVariables`:
const updateCategoryVars: UpdateCategoryVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
};

// Call the `updateCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCategory(updateCategoryVars);
// Variables can be defined inline as well.
const { data } = await updateCategory({ id: ..., name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCategory(dataConnect, updateCategoryVars);

console.log(data.category_update);

// Or, you can use the `Promise` API.
updateCategory(updateCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.category_update);
});
```

### Using `UpdateCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCategoryRef, UpdateCategoryVariables } from '@dataconnect/generated';

// The `UpdateCategory` mutation requires an argument of type `UpdateCategoryVariables`:
const updateCategoryVars: UpdateCategoryVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
};

// Call the `updateCategoryRef()` function to get a reference to the mutation.
const ref = updateCategoryRef(updateCategoryVars);
// Variables can be defined inline as well.
const ref = updateCategoryRef({ id: ..., name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCategoryRef(dataConnect, updateCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.category_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.category_update);
});
```

## DeleteCategory
You can execute the `DeleteCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteCategory(vars: DeleteCategoryVariables): MutationPromise<DeleteCategoryData, DeleteCategoryVariables>;

interface DeleteCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCategoryVariables): MutationRef<DeleteCategoryData, DeleteCategoryVariables>;
}
export const deleteCategoryRef: DeleteCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteCategory(dc: DataConnect, vars: DeleteCategoryVariables): MutationPromise<DeleteCategoryData, DeleteCategoryVariables>;

interface DeleteCategoryRef {
  ...
  (dc: DataConnect, vars: DeleteCategoryVariables): MutationRef<DeleteCategoryData, DeleteCategoryVariables>;
}
export const deleteCategoryRef: DeleteCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteCategoryRef:
```typescript
const name = deleteCategoryRef.operationName;
console.log(name);
```

### Variables
The `DeleteCategory` mutation requires an argument of type `DeleteCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteCategoryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteCategoryData {
  category_delete?: Category_Key | null;
}
```
### Using `DeleteCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteCategory, DeleteCategoryVariables } from '@dataconnect/generated';

// The `DeleteCategory` mutation requires an argument of type `DeleteCategoryVariables`:
const deleteCategoryVars: DeleteCategoryVariables = {
  id: ..., 
};

// Call the `deleteCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteCategory(deleteCategoryVars);
// Variables can be defined inline as well.
const { data } = await deleteCategory({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteCategory(dataConnect, deleteCategoryVars);

console.log(data.category_delete);

// Or, you can use the `Promise` API.
deleteCategory(deleteCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.category_delete);
});
```

### Using `DeleteCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteCategoryRef, DeleteCategoryVariables } from '@dataconnect/generated';

// The `DeleteCategory` mutation requires an argument of type `DeleteCategoryVariables`:
const deleteCategoryVars: DeleteCategoryVariables = {
  id: ..., 
};

// Call the `deleteCategoryRef()` function to get a reference to the mutation.
const ref = deleteCategoryRef(deleteCategoryVars);
// Variables can be defined inline as well.
const ref = deleteCategoryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteCategoryRef(dataConnect, deleteCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.category_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.category_delete);
});
```

## CreateQuestion
You can execute the `CreateQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createQuestion(vars: CreateQuestionVariables): MutationPromise<CreateQuestionData, CreateQuestionVariables>;

interface CreateQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionVariables): MutationRef<CreateQuestionData, CreateQuestionVariables>;
}
export const createQuestionRef: CreateQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuestion(dc: DataConnect, vars: CreateQuestionVariables): MutationPromise<CreateQuestionData, CreateQuestionVariables>;

interface CreateQuestionRef {
  ...
  (dc: DataConnect, vars: CreateQuestionVariables): MutationRef<CreateQuestionData, CreateQuestionVariables>;
}
export const createQuestionRef: CreateQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuestionRef:
```typescript
const name = createQuestionRef.operationName;
console.log(name);
```

### Variables
The `CreateQuestion` mutation requires an argument of type `CreateQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuestionVariables {
  categoryId: UUIDString;
  type: string;
  questionText: string;
  imageUrl?: string | null;
  difficulty: string;
  points: number;
}
```
### Return Type
Recall that executing the `CreateQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuestionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuestionData {
  question_insert: Question_Key;
}
```
### Using `CreateQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuestion, CreateQuestionVariables } from '@dataconnect/generated';

// The `CreateQuestion` mutation requires an argument of type `CreateQuestionVariables`:
const createQuestionVars: CreateQuestionVariables = {
  categoryId: ..., 
  type: ..., 
  questionText: ..., 
  imageUrl: ..., // optional
  difficulty: ..., 
  points: ..., 
};

// Call the `createQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuestion(createQuestionVars);
// Variables can be defined inline as well.
const { data } = await createQuestion({ categoryId: ..., type: ..., questionText: ..., imageUrl: ..., difficulty: ..., points: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuestion(dataConnect, createQuestionVars);

console.log(data.question_insert);

// Or, you can use the `Promise` API.
createQuestion(createQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.question_insert);
});
```

### Using `CreateQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuestionRef, CreateQuestionVariables } from '@dataconnect/generated';

// The `CreateQuestion` mutation requires an argument of type `CreateQuestionVariables`:
const createQuestionVars: CreateQuestionVariables = {
  categoryId: ..., 
  type: ..., 
  questionText: ..., 
  imageUrl: ..., // optional
  difficulty: ..., 
  points: ..., 
};

// Call the `createQuestionRef()` function to get a reference to the mutation.
const ref = createQuestionRef(createQuestionVars);
// Variables can be defined inline as well.
const ref = createQuestionRef({ categoryId: ..., type: ..., questionText: ..., imageUrl: ..., difficulty: ..., points: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuestionRef(dataConnect, createQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.question_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.question_insert);
});
```

## UpdateQuestion
You can execute the `UpdateQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateQuestion(vars: UpdateQuestionVariables): MutationPromise<UpdateQuestionData, UpdateQuestionVariables>;

interface UpdateQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuestionVariables): MutationRef<UpdateQuestionData, UpdateQuestionVariables>;
}
export const updateQuestionRef: UpdateQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateQuestion(dc: DataConnect, vars: UpdateQuestionVariables): MutationPromise<UpdateQuestionData, UpdateQuestionVariables>;

interface UpdateQuestionRef {
  ...
  (dc: DataConnect, vars: UpdateQuestionVariables): MutationRef<UpdateQuestionData, UpdateQuestionVariables>;
}
export const updateQuestionRef: UpdateQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateQuestionRef:
```typescript
const name = updateQuestionRef.operationName;
console.log(name);
```

### Variables
The `UpdateQuestion` mutation requires an argument of type `UpdateQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateQuestionVariables {
  id: UUIDString;
  questionText?: string | null;
  imageUrl?: string | null;
  difficulty?: string | null;
  points?: number | null;
}
```
### Return Type
Recall that executing the `UpdateQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateQuestionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateQuestionData {
  question_update?: Question_Key | null;
}
```
### Using `UpdateQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateQuestion, UpdateQuestionVariables } from '@dataconnect/generated';

// The `UpdateQuestion` mutation requires an argument of type `UpdateQuestionVariables`:
const updateQuestionVars: UpdateQuestionVariables = {
  id: ..., 
  questionText: ..., // optional
  imageUrl: ..., // optional
  difficulty: ..., // optional
  points: ..., // optional
};

// Call the `updateQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuestion(updateQuestionVars);
// Variables can be defined inline as well.
const { data } = await updateQuestion({ id: ..., questionText: ..., imageUrl: ..., difficulty: ..., points: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateQuestion(dataConnect, updateQuestionVars);

console.log(data.question_update);

// Or, you can use the `Promise` API.
updateQuestion(updateQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.question_update);
});
```

### Using `UpdateQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateQuestionRef, UpdateQuestionVariables } from '@dataconnect/generated';

// The `UpdateQuestion` mutation requires an argument of type `UpdateQuestionVariables`:
const updateQuestionVars: UpdateQuestionVariables = {
  id: ..., 
  questionText: ..., // optional
  imageUrl: ..., // optional
  difficulty: ..., // optional
  points: ..., // optional
};

// Call the `updateQuestionRef()` function to get a reference to the mutation.
const ref = updateQuestionRef(updateQuestionVars);
// Variables can be defined inline as well.
const ref = updateQuestionRef({ id: ..., questionText: ..., imageUrl: ..., difficulty: ..., points: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateQuestionRef(dataConnect, updateQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.question_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.question_update);
});
```

## DeleteQuestion
You can execute the `DeleteQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteQuestion(vars: DeleteQuestionVariables): MutationPromise<DeleteQuestionData, DeleteQuestionVariables>;

interface DeleteQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuestionVariables): MutationRef<DeleteQuestionData, DeleteQuestionVariables>;
}
export const deleteQuestionRef: DeleteQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteQuestion(dc: DataConnect, vars: DeleteQuestionVariables): MutationPromise<DeleteQuestionData, DeleteQuestionVariables>;

interface DeleteQuestionRef {
  ...
  (dc: DataConnect, vars: DeleteQuestionVariables): MutationRef<DeleteQuestionData, DeleteQuestionVariables>;
}
export const deleteQuestionRef: DeleteQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteQuestionRef:
```typescript
const name = deleteQuestionRef.operationName;
console.log(name);
```

### Variables
The `DeleteQuestion` mutation requires an argument of type `DeleteQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteQuestionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteQuestionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteQuestionData {
  question_delete?: Question_Key | null;
}
```
### Using `DeleteQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteQuestion, DeleteQuestionVariables } from '@dataconnect/generated';

// The `DeleteQuestion` mutation requires an argument of type `DeleteQuestionVariables`:
const deleteQuestionVars: DeleteQuestionVariables = {
  id: ..., 
};

// Call the `deleteQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteQuestion(deleteQuestionVars);
// Variables can be defined inline as well.
const { data } = await deleteQuestion({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteQuestion(dataConnect, deleteQuestionVars);

console.log(data.question_delete);

// Or, you can use the `Promise` API.
deleteQuestion(deleteQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.question_delete);
});
```

### Using `DeleteQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteQuestionRef, DeleteQuestionVariables } from '@dataconnect/generated';

// The `DeleteQuestion` mutation requires an argument of type `DeleteQuestionVariables`:
const deleteQuestionVars: DeleteQuestionVariables = {
  id: ..., 
};

// Call the `deleteQuestionRef()` function to get a reference to the mutation.
const ref = deleteQuestionRef(deleteQuestionVars);
// Variables can be defined inline as well.
const ref = deleteQuestionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteQuestionRef(dataConnect, deleteQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.question_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.question_delete);
});
```

## AddChoice
You can execute the `AddChoice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addChoice(vars: AddChoiceVariables): MutationPromise<AddChoiceData, AddChoiceVariables>;

interface AddChoiceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddChoiceVariables): MutationRef<AddChoiceData, AddChoiceVariables>;
}
export const addChoiceRef: AddChoiceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addChoice(dc: DataConnect, vars: AddChoiceVariables): MutationPromise<AddChoiceData, AddChoiceVariables>;

interface AddChoiceRef {
  ...
  (dc: DataConnect, vars: AddChoiceVariables): MutationRef<AddChoiceData, AddChoiceVariables>;
}
export const addChoiceRef: AddChoiceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addChoiceRef:
```typescript
const name = addChoiceRef.operationName;
console.log(name);
```

### Variables
The `AddChoice` mutation requires an argument of type `AddChoiceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddChoiceVariables {
  questionId: UUIDString;
  choiceText: string;
  choiceNumber: number;
  isCorrect: boolean;
}
```
### Return Type
Recall that executing the `AddChoice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddChoiceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddChoiceData {
  choice_insert: Choice_Key;
}
```
### Using `AddChoice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addChoice, AddChoiceVariables } from '@dataconnect/generated';

// The `AddChoice` mutation requires an argument of type `AddChoiceVariables`:
const addChoiceVars: AddChoiceVariables = {
  questionId: ..., 
  choiceText: ..., 
  choiceNumber: ..., 
  isCorrect: ..., 
};

// Call the `addChoice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addChoice(addChoiceVars);
// Variables can be defined inline as well.
const { data } = await addChoice({ questionId: ..., choiceText: ..., choiceNumber: ..., isCorrect: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addChoice(dataConnect, addChoiceVars);

console.log(data.choice_insert);

// Or, you can use the `Promise` API.
addChoice(addChoiceVars).then((response) => {
  const data = response.data;
  console.log(data.choice_insert);
});
```

### Using `AddChoice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addChoiceRef, AddChoiceVariables } from '@dataconnect/generated';

// The `AddChoice` mutation requires an argument of type `AddChoiceVariables`:
const addChoiceVars: AddChoiceVariables = {
  questionId: ..., 
  choiceText: ..., 
  choiceNumber: ..., 
  isCorrect: ..., 
};

// Call the `addChoiceRef()` function to get a reference to the mutation.
const ref = addChoiceRef(addChoiceVars);
// Variables can be defined inline as well.
const ref = addChoiceRef({ questionId: ..., choiceText: ..., choiceNumber: ..., isCorrect: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addChoiceRef(dataConnect, addChoiceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.choice_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.choice_insert);
});
```

## UpdateChoice
You can execute the `UpdateChoice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateChoice(vars: UpdateChoiceVariables): MutationPromise<UpdateChoiceData, UpdateChoiceVariables>;

interface UpdateChoiceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateChoiceVariables): MutationRef<UpdateChoiceData, UpdateChoiceVariables>;
}
export const updateChoiceRef: UpdateChoiceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateChoice(dc: DataConnect, vars: UpdateChoiceVariables): MutationPromise<UpdateChoiceData, UpdateChoiceVariables>;

interface UpdateChoiceRef {
  ...
  (dc: DataConnect, vars: UpdateChoiceVariables): MutationRef<UpdateChoiceData, UpdateChoiceVariables>;
}
export const updateChoiceRef: UpdateChoiceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateChoiceRef:
```typescript
const name = updateChoiceRef.operationName;
console.log(name);
```

### Variables
The `UpdateChoice` mutation requires an argument of type `UpdateChoiceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateChoiceVariables {
  id: UUIDString;
  choiceText?: string | null;
  isCorrect?: boolean | null;
}
```
### Return Type
Recall that executing the `UpdateChoice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateChoiceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateChoiceData {
  choice_update?: Choice_Key | null;
}
```
### Using `UpdateChoice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateChoice, UpdateChoiceVariables } from '@dataconnect/generated';

// The `UpdateChoice` mutation requires an argument of type `UpdateChoiceVariables`:
const updateChoiceVars: UpdateChoiceVariables = {
  id: ..., 
  choiceText: ..., // optional
  isCorrect: ..., // optional
};

// Call the `updateChoice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateChoice(updateChoiceVars);
// Variables can be defined inline as well.
const { data } = await updateChoice({ id: ..., choiceText: ..., isCorrect: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateChoice(dataConnect, updateChoiceVars);

console.log(data.choice_update);

// Or, you can use the `Promise` API.
updateChoice(updateChoiceVars).then((response) => {
  const data = response.data;
  console.log(data.choice_update);
});
```

### Using `UpdateChoice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateChoiceRef, UpdateChoiceVariables } from '@dataconnect/generated';

// The `UpdateChoice` mutation requires an argument of type `UpdateChoiceVariables`:
const updateChoiceVars: UpdateChoiceVariables = {
  id: ..., 
  choiceText: ..., // optional
  isCorrect: ..., // optional
};

// Call the `updateChoiceRef()` function to get a reference to the mutation.
const ref = updateChoiceRef(updateChoiceVars);
// Variables can be defined inline as well.
const ref = updateChoiceRef({ id: ..., choiceText: ..., isCorrect: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateChoiceRef(dataConnect, updateChoiceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.choice_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.choice_update);
});
```

## DeleteChoice
You can execute the `DeleteChoice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteChoice(vars: DeleteChoiceVariables): MutationPromise<DeleteChoiceData, DeleteChoiceVariables>;

interface DeleteChoiceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteChoiceVariables): MutationRef<DeleteChoiceData, DeleteChoiceVariables>;
}
export const deleteChoiceRef: DeleteChoiceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteChoice(dc: DataConnect, vars: DeleteChoiceVariables): MutationPromise<DeleteChoiceData, DeleteChoiceVariables>;

interface DeleteChoiceRef {
  ...
  (dc: DataConnect, vars: DeleteChoiceVariables): MutationRef<DeleteChoiceData, DeleteChoiceVariables>;
}
export const deleteChoiceRef: DeleteChoiceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteChoiceRef:
```typescript
const name = deleteChoiceRef.operationName;
console.log(name);
```

### Variables
The `DeleteChoice` mutation requires an argument of type `DeleteChoiceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteChoiceVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteChoice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteChoiceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteChoiceData {
  choice_delete?: Choice_Key | null;
}
```
### Using `DeleteChoice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteChoice, DeleteChoiceVariables } from '@dataconnect/generated';

// The `DeleteChoice` mutation requires an argument of type `DeleteChoiceVariables`:
const deleteChoiceVars: DeleteChoiceVariables = {
  id: ..., 
};

// Call the `deleteChoice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteChoice(deleteChoiceVars);
// Variables can be defined inline as well.
const { data } = await deleteChoice({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteChoice(dataConnect, deleteChoiceVars);

console.log(data.choice_delete);

// Or, you can use the `Promise` API.
deleteChoice(deleteChoiceVars).then((response) => {
  const data = response.data;
  console.log(data.choice_delete);
});
```

### Using `DeleteChoice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteChoiceRef, DeleteChoiceVariables } from '@dataconnect/generated';

// The `DeleteChoice` mutation requires an argument of type `DeleteChoiceVariables`:
const deleteChoiceVars: DeleteChoiceVariables = {
  id: ..., 
};

// Call the `deleteChoiceRef()` function to get a reference to the mutation.
const ref = deleteChoiceRef(deleteChoiceVars);
// Variables can be defined inline as well.
const ref = deleteChoiceRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteChoiceRef(dataConnect, deleteChoiceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.choice_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.choice_delete);
});
```

## AddAnswer
You can execute the `AddAnswer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addAnswer(vars: AddAnswerVariables): MutationPromise<AddAnswerData, AddAnswerVariables>;

interface AddAnswerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddAnswerVariables): MutationRef<AddAnswerData, AddAnswerVariables>;
}
export const addAnswerRef: AddAnswerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addAnswer(dc: DataConnect, vars: AddAnswerVariables): MutationPromise<AddAnswerData, AddAnswerVariables>;

interface AddAnswerRef {
  ...
  (dc: DataConnect, vars: AddAnswerVariables): MutationRef<AddAnswerData, AddAnswerVariables>;
}
export const addAnswerRef: AddAnswerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addAnswerRef:
```typescript
const name = addAnswerRef.operationName;
console.log(name);
```

### Variables
The `AddAnswer` mutation requires an argument of type `AddAnswerVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddAnswerVariables {
  questionId: UUIDString;
  answerText: string;
  keywords?: string | null;
}
```
### Return Type
Recall that executing the `AddAnswer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddAnswerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddAnswerData {
  answer_insert: Answer_Key;
}
```
### Using `AddAnswer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addAnswer, AddAnswerVariables } from '@dataconnect/generated';

// The `AddAnswer` mutation requires an argument of type `AddAnswerVariables`:
const addAnswerVars: AddAnswerVariables = {
  questionId: ..., 
  answerText: ..., 
  keywords: ..., // optional
};

// Call the `addAnswer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addAnswer(addAnswerVars);
// Variables can be defined inline as well.
const { data } = await addAnswer({ questionId: ..., answerText: ..., keywords: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addAnswer(dataConnect, addAnswerVars);

console.log(data.answer_insert);

// Or, you can use the `Promise` API.
addAnswer(addAnswerVars).then((response) => {
  const data = response.data;
  console.log(data.answer_insert);
});
```

### Using `AddAnswer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addAnswerRef, AddAnswerVariables } from '@dataconnect/generated';

// The `AddAnswer` mutation requires an argument of type `AddAnswerVariables`:
const addAnswerVars: AddAnswerVariables = {
  questionId: ..., 
  answerText: ..., 
  keywords: ..., // optional
};

// Call the `addAnswerRef()` function to get a reference to the mutation.
const ref = addAnswerRef(addAnswerVars);
// Variables can be defined inline as well.
const ref = addAnswerRef({ questionId: ..., answerText: ..., keywords: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addAnswerRef(dataConnect, addAnswerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.answer_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.answer_insert);
});
```

## UpdateAnswer
You can execute the `UpdateAnswer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateAnswer(vars: UpdateAnswerVariables): MutationPromise<UpdateAnswerData, UpdateAnswerVariables>;

interface UpdateAnswerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAnswerVariables): MutationRef<UpdateAnswerData, UpdateAnswerVariables>;
}
export const updateAnswerRef: UpdateAnswerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAnswer(dc: DataConnect, vars: UpdateAnswerVariables): MutationPromise<UpdateAnswerData, UpdateAnswerVariables>;

interface UpdateAnswerRef {
  ...
  (dc: DataConnect, vars: UpdateAnswerVariables): MutationRef<UpdateAnswerData, UpdateAnswerVariables>;
}
export const updateAnswerRef: UpdateAnswerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAnswerRef:
```typescript
const name = updateAnswerRef.operationName;
console.log(name);
```

### Variables
The `UpdateAnswer` mutation requires an argument of type `UpdateAnswerVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAnswerVariables {
  id: UUIDString;
  answerText?: string | null;
  keywords?: string | null;
}
```
### Return Type
Recall that executing the `UpdateAnswer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAnswerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAnswerData {
  answer_update?: Answer_Key | null;
}
```
### Using `UpdateAnswer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAnswer, UpdateAnswerVariables } from '@dataconnect/generated';

// The `UpdateAnswer` mutation requires an argument of type `UpdateAnswerVariables`:
const updateAnswerVars: UpdateAnswerVariables = {
  id: ..., 
  answerText: ..., // optional
  keywords: ..., // optional
};

// Call the `updateAnswer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAnswer(updateAnswerVars);
// Variables can be defined inline as well.
const { data } = await updateAnswer({ id: ..., answerText: ..., keywords: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAnswer(dataConnect, updateAnswerVars);

console.log(data.answer_update);

// Or, you can use the `Promise` API.
updateAnswer(updateAnswerVars).then((response) => {
  const data = response.data;
  console.log(data.answer_update);
});
```

### Using `UpdateAnswer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAnswerRef, UpdateAnswerVariables } from '@dataconnect/generated';

// The `UpdateAnswer` mutation requires an argument of type `UpdateAnswerVariables`:
const updateAnswerVars: UpdateAnswerVariables = {
  id: ..., 
  answerText: ..., // optional
  keywords: ..., // optional
};

// Call the `updateAnswerRef()` function to get a reference to the mutation.
const ref = updateAnswerRef(updateAnswerVars);
// Variables can be defined inline as well.
const ref = updateAnswerRef({ id: ..., answerText: ..., keywords: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAnswerRef(dataConnect, updateAnswerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.answer_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.answer_update);
});
```

## CreateExam
You can execute the `CreateExam` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createExam(vars: CreateExamVariables): MutationPromise<CreateExamData, CreateExamVariables>;

interface CreateExamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateExamVariables): MutationRef<CreateExamData, CreateExamVariables>;
}
export const createExamRef: CreateExamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createExam(dc: DataConnect, vars: CreateExamVariables): MutationPromise<CreateExamData, CreateExamVariables>;

interface CreateExamRef {
  ...
  (dc: DataConnect, vars: CreateExamVariables): MutationRef<CreateExamData, CreateExamVariables>;
}
export const createExamRef: CreateExamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createExamRef:
```typescript
const name = createExamRef.operationName;
console.log(name);
```

### Variables
The `CreateExam` mutation requires an argument of type `CreateExamVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateExamVariables {
  title: string;
  description?: string | null;
  duration: number;
  totalPoints: number;
  passingScore: number;
  startTime?: TimestampString | null;
  endTime?: TimestampString | null;
}
```
### Return Type
Recall that executing the `CreateExam` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateExamData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateExamData {
  exam_insert: Exam_Key;
}
```
### Using `CreateExam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createExam, CreateExamVariables } from '@dataconnect/generated';

// The `CreateExam` mutation requires an argument of type `CreateExamVariables`:
const createExamVars: CreateExamVariables = {
  title: ..., 
  description: ..., // optional
  duration: ..., 
  totalPoints: ..., 
  passingScore: ..., 
  startTime: ..., // optional
  endTime: ..., // optional
};

// Call the `createExam()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createExam(createExamVars);
// Variables can be defined inline as well.
const { data } = await createExam({ title: ..., description: ..., duration: ..., totalPoints: ..., passingScore: ..., startTime: ..., endTime: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createExam(dataConnect, createExamVars);

console.log(data.exam_insert);

// Or, you can use the `Promise` API.
createExam(createExamVars).then((response) => {
  const data = response.data;
  console.log(data.exam_insert);
});
```

### Using `CreateExam`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createExamRef, CreateExamVariables } from '@dataconnect/generated';

// The `CreateExam` mutation requires an argument of type `CreateExamVariables`:
const createExamVars: CreateExamVariables = {
  title: ..., 
  description: ..., // optional
  duration: ..., 
  totalPoints: ..., 
  passingScore: ..., 
  startTime: ..., // optional
  endTime: ..., // optional
};

// Call the `createExamRef()` function to get a reference to the mutation.
const ref = createExamRef(createExamVars);
// Variables can be defined inline as well.
const ref = createExamRef({ title: ..., description: ..., duration: ..., totalPoints: ..., passingScore: ..., startTime: ..., endTime: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createExamRef(dataConnect, createExamVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.exam_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.exam_insert);
});
```

## UpdateExam
You can execute the `UpdateExam` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateExam(vars: UpdateExamVariables): MutationPromise<UpdateExamData, UpdateExamVariables>;

interface UpdateExamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateExamVariables): MutationRef<UpdateExamData, UpdateExamVariables>;
}
export const updateExamRef: UpdateExamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateExam(dc: DataConnect, vars: UpdateExamVariables): MutationPromise<UpdateExamData, UpdateExamVariables>;

interface UpdateExamRef {
  ...
  (dc: DataConnect, vars: UpdateExamVariables): MutationRef<UpdateExamData, UpdateExamVariables>;
}
export const updateExamRef: UpdateExamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateExamRef:
```typescript
const name = updateExamRef.operationName;
console.log(name);
```

### Variables
The `UpdateExam` mutation requires an argument of type `UpdateExamVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateExam` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateExamData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateExamData {
  exam_update?: Exam_Key | null;
}
```
### Using `UpdateExam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateExam, UpdateExamVariables } from '@dataconnect/generated';

// The `UpdateExam` mutation requires an argument of type `UpdateExamVariables`:
const updateExamVars: UpdateExamVariables = {
  id: ..., 
  title: ..., // optional
  description: ..., // optional
  duration: ..., // optional
  totalPoints: ..., // optional
  passingScore: ..., // optional
  startTime: ..., // optional
  endTime: ..., // optional
  isPublished: ..., // optional
};

// Call the `updateExam()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateExam(updateExamVars);
// Variables can be defined inline as well.
const { data } = await updateExam({ id: ..., title: ..., description: ..., duration: ..., totalPoints: ..., passingScore: ..., startTime: ..., endTime: ..., isPublished: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateExam(dataConnect, updateExamVars);

console.log(data.exam_update);

// Or, you can use the `Promise` API.
updateExam(updateExamVars).then((response) => {
  const data = response.data;
  console.log(data.exam_update);
});
```

### Using `UpdateExam`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateExamRef, UpdateExamVariables } from '@dataconnect/generated';

// The `UpdateExam` mutation requires an argument of type `UpdateExamVariables`:
const updateExamVars: UpdateExamVariables = {
  id: ..., 
  title: ..., // optional
  description: ..., // optional
  duration: ..., // optional
  totalPoints: ..., // optional
  passingScore: ..., // optional
  startTime: ..., // optional
  endTime: ..., // optional
  isPublished: ..., // optional
};

// Call the `updateExamRef()` function to get a reference to the mutation.
const ref = updateExamRef(updateExamVars);
// Variables can be defined inline as well.
const ref = updateExamRef({ id: ..., title: ..., description: ..., duration: ..., totalPoints: ..., passingScore: ..., startTime: ..., endTime: ..., isPublished: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateExamRef(dataConnect, updateExamVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.exam_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.exam_update);
});
```

## DeleteExam
You can execute the `DeleteExam` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteExam(vars: DeleteExamVariables): MutationPromise<DeleteExamData, DeleteExamVariables>;

interface DeleteExamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteExamVariables): MutationRef<DeleteExamData, DeleteExamVariables>;
}
export const deleteExamRef: DeleteExamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteExam(dc: DataConnect, vars: DeleteExamVariables): MutationPromise<DeleteExamData, DeleteExamVariables>;

interface DeleteExamRef {
  ...
  (dc: DataConnect, vars: DeleteExamVariables): MutationRef<DeleteExamData, DeleteExamVariables>;
}
export const deleteExamRef: DeleteExamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteExamRef:
```typescript
const name = deleteExamRef.operationName;
console.log(name);
```

### Variables
The `DeleteExam` mutation requires an argument of type `DeleteExamVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteExamVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteExam` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteExamData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteExamData {
  exam_delete?: Exam_Key | null;
}
```
### Using `DeleteExam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteExam, DeleteExamVariables } from '@dataconnect/generated';

// The `DeleteExam` mutation requires an argument of type `DeleteExamVariables`:
const deleteExamVars: DeleteExamVariables = {
  id: ..., 
};

// Call the `deleteExam()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteExam(deleteExamVars);
// Variables can be defined inline as well.
const { data } = await deleteExam({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteExam(dataConnect, deleteExamVars);

console.log(data.exam_delete);

// Or, you can use the `Promise` API.
deleteExam(deleteExamVars).then((response) => {
  const data = response.data;
  console.log(data.exam_delete);
});
```

### Using `DeleteExam`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteExamRef, DeleteExamVariables } from '@dataconnect/generated';

// The `DeleteExam` mutation requires an argument of type `DeleteExamVariables`:
const deleteExamVars: DeleteExamVariables = {
  id: ..., 
};

// Call the `deleteExamRef()` function to get a reference to the mutation.
const ref = deleteExamRef(deleteExamVars);
// Variables can be defined inline as well.
const ref = deleteExamRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteExamRef(dataConnect, deleteExamVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.exam_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.exam_delete);
});
```

## AddQuestionToExam
You can execute the `AddQuestionToExam` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addQuestionToExam(vars: AddQuestionToExamVariables): MutationPromise<AddQuestionToExamData, AddQuestionToExamVariables>;

interface AddQuestionToExamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddQuestionToExamVariables): MutationRef<AddQuestionToExamData, AddQuestionToExamVariables>;
}
export const addQuestionToExamRef: AddQuestionToExamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addQuestionToExam(dc: DataConnect, vars: AddQuestionToExamVariables): MutationPromise<AddQuestionToExamData, AddQuestionToExamVariables>;

interface AddQuestionToExamRef {
  ...
  (dc: DataConnect, vars: AddQuestionToExamVariables): MutationRef<AddQuestionToExamData, AddQuestionToExamVariables>;
}
export const addQuestionToExamRef: AddQuestionToExamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addQuestionToExamRef:
```typescript
const name = addQuestionToExamRef.operationName;
console.log(name);
```

### Variables
The `AddQuestionToExam` mutation requires an argument of type `AddQuestionToExamVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddQuestionToExamVariables {
  examId: UUIDString;
  questionId: UUIDString;
  questionOrder: number;
  pointsOverride?: number | null;
}
```
### Return Type
Recall that executing the `AddQuestionToExam` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddQuestionToExamData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddQuestionToExamData {
  examQuestion_insert: ExamQuestion_Key;
}
```
### Using `AddQuestionToExam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addQuestionToExam, AddQuestionToExamVariables } from '@dataconnect/generated';

// The `AddQuestionToExam` mutation requires an argument of type `AddQuestionToExamVariables`:
const addQuestionToExamVars: AddQuestionToExamVariables = {
  examId: ..., 
  questionId: ..., 
  questionOrder: ..., 
  pointsOverride: ..., // optional
};

// Call the `addQuestionToExam()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addQuestionToExam(addQuestionToExamVars);
// Variables can be defined inline as well.
const { data } = await addQuestionToExam({ examId: ..., questionId: ..., questionOrder: ..., pointsOverride: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addQuestionToExam(dataConnect, addQuestionToExamVars);

console.log(data.examQuestion_insert);

// Or, you can use the `Promise` API.
addQuestionToExam(addQuestionToExamVars).then((response) => {
  const data = response.data;
  console.log(data.examQuestion_insert);
});
```

### Using `AddQuestionToExam`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addQuestionToExamRef, AddQuestionToExamVariables } from '@dataconnect/generated';

// The `AddQuestionToExam` mutation requires an argument of type `AddQuestionToExamVariables`:
const addQuestionToExamVars: AddQuestionToExamVariables = {
  examId: ..., 
  questionId: ..., 
  questionOrder: ..., 
  pointsOverride: ..., // optional
};

// Call the `addQuestionToExamRef()` function to get a reference to the mutation.
const ref = addQuestionToExamRef(addQuestionToExamVars);
// Variables can be defined inline as well.
const ref = addQuestionToExamRef({ examId: ..., questionId: ..., questionOrder: ..., pointsOverride: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addQuestionToExamRef(dataConnect, addQuestionToExamVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.examQuestion_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.examQuestion_insert);
});
```

## RemoveQuestionFromExam
You can execute the `RemoveQuestionFromExam` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
removeQuestionFromExam(vars: RemoveQuestionFromExamVariables): MutationPromise<RemoveQuestionFromExamData, RemoveQuestionFromExamVariables>;

interface RemoveQuestionFromExamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveQuestionFromExamVariables): MutationRef<RemoveQuestionFromExamData, RemoveQuestionFromExamVariables>;
}
export const removeQuestionFromExamRef: RemoveQuestionFromExamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeQuestionFromExam(dc: DataConnect, vars: RemoveQuestionFromExamVariables): MutationPromise<RemoveQuestionFromExamData, RemoveQuestionFromExamVariables>;

interface RemoveQuestionFromExamRef {
  ...
  (dc: DataConnect, vars: RemoveQuestionFromExamVariables): MutationRef<RemoveQuestionFromExamData, RemoveQuestionFromExamVariables>;
}
export const removeQuestionFromExamRef: RemoveQuestionFromExamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeQuestionFromExamRef:
```typescript
const name = removeQuestionFromExamRef.operationName;
console.log(name);
```

### Variables
The `RemoveQuestionFromExam` mutation requires an argument of type `RemoveQuestionFromExamVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveQuestionFromExamVariables {
  examId: UUIDString;
  questionId: UUIDString;
}
```
### Return Type
Recall that executing the `RemoveQuestionFromExam` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveQuestionFromExamData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveQuestionFromExamData {
  examQuestion_delete?: ExamQuestion_Key | null;
}
```
### Using `RemoveQuestionFromExam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeQuestionFromExam, RemoveQuestionFromExamVariables } from '@dataconnect/generated';

// The `RemoveQuestionFromExam` mutation requires an argument of type `RemoveQuestionFromExamVariables`:
const removeQuestionFromExamVars: RemoveQuestionFromExamVariables = {
  examId: ..., 
  questionId: ..., 
};

// Call the `removeQuestionFromExam()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeQuestionFromExam(removeQuestionFromExamVars);
// Variables can be defined inline as well.
const { data } = await removeQuestionFromExam({ examId: ..., questionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeQuestionFromExam(dataConnect, removeQuestionFromExamVars);

console.log(data.examQuestion_delete);

// Or, you can use the `Promise` API.
removeQuestionFromExam(removeQuestionFromExamVars).then((response) => {
  const data = response.data;
  console.log(data.examQuestion_delete);
});
```

### Using `RemoveQuestionFromExam`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeQuestionFromExamRef, RemoveQuestionFromExamVariables } from '@dataconnect/generated';

// The `RemoveQuestionFromExam` mutation requires an argument of type `RemoveQuestionFromExamVariables`:
const removeQuestionFromExamVars: RemoveQuestionFromExamVariables = {
  examId: ..., 
  questionId: ..., 
};

// Call the `removeQuestionFromExamRef()` function to get a reference to the mutation.
const ref = removeQuestionFromExamRef(removeQuestionFromExamVars);
// Variables can be defined inline as well.
const ref = removeQuestionFromExamRef({ examId: ..., questionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeQuestionFromExamRef(dataConnect, removeQuestionFromExamVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.examQuestion_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.examQuestion_delete);
});
```

## StartExam
You can execute the `StartExam` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
startExam(vars: StartExamVariables): MutationPromise<StartExamData, StartExamVariables>;

interface StartExamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: StartExamVariables): MutationRef<StartExamData, StartExamVariables>;
}
export const startExamRef: StartExamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
startExam(dc: DataConnect, vars: StartExamVariables): MutationPromise<StartExamData, StartExamVariables>;

interface StartExamRef {
  ...
  (dc: DataConnect, vars: StartExamVariables): MutationRef<StartExamData, StartExamVariables>;
}
export const startExamRef: StartExamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the startExamRef:
```typescript
const name = startExamRef.operationName;
console.log(name);
```

### Variables
The `StartExam` mutation requires an argument of type `StartExamVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface StartExamVariables {
  examId: UUIDString;
}
```
### Return Type
Recall that executing the `StartExam` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `StartExamData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface StartExamData {
  examAttempt_insert: ExamAttempt_Key;
}
```
### Using `StartExam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, startExam, StartExamVariables } from '@dataconnect/generated';

// The `StartExam` mutation requires an argument of type `StartExamVariables`:
const startExamVars: StartExamVariables = {
  examId: ..., 
};

// Call the `startExam()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await startExam(startExamVars);
// Variables can be defined inline as well.
const { data } = await startExam({ examId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await startExam(dataConnect, startExamVars);

console.log(data.examAttempt_insert);

// Or, you can use the `Promise` API.
startExam(startExamVars).then((response) => {
  const data = response.data;
  console.log(data.examAttempt_insert);
});
```

### Using `StartExam`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, startExamRef, StartExamVariables } from '@dataconnect/generated';

// The `StartExam` mutation requires an argument of type `StartExamVariables`:
const startExamVars: StartExamVariables = {
  examId: ..., 
};

// Call the `startExamRef()` function to get a reference to the mutation.
const ref = startExamRef(startExamVars);
// Variables can be defined inline as well.
const ref = startExamRef({ examId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = startExamRef(dataConnect, startExamVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.examAttempt_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.examAttempt_insert);
});
```

## SubmitAnswer
You can execute the `SubmitAnswer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
submitAnswer(vars: SubmitAnswerVariables): MutationPromise<SubmitAnswerData, SubmitAnswerVariables>;

interface SubmitAnswerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitAnswerVariables): MutationRef<SubmitAnswerData, SubmitAnswerVariables>;
}
export const submitAnswerRef: SubmitAnswerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
submitAnswer(dc: DataConnect, vars: SubmitAnswerVariables): MutationPromise<SubmitAnswerData, SubmitAnswerVariables>;

interface SubmitAnswerRef {
  ...
  (dc: DataConnect, vars: SubmitAnswerVariables): MutationRef<SubmitAnswerData, SubmitAnswerVariables>;
}
export const submitAnswerRef: SubmitAnswerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the submitAnswerRef:
```typescript
const name = submitAnswerRef.operationName;
console.log(name);
```

### Variables
The `SubmitAnswer` mutation requires an argument of type `SubmitAnswerVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SubmitAnswerVariables {
  attemptId: UUIDString;
  questionId: UUIDString;
  selectedChoiceId?: UUIDString | null;
  textAnswer?: string | null;
}
```
### Return Type
Recall that executing the `SubmitAnswer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SubmitAnswerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SubmitAnswerData {
  studentAnswer_upsert: StudentAnswer_Key;
}
```
### Using `SubmitAnswer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, submitAnswer, SubmitAnswerVariables } from '@dataconnect/generated';

// The `SubmitAnswer` mutation requires an argument of type `SubmitAnswerVariables`:
const submitAnswerVars: SubmitAnswerVariables = {
  attemptId: ..., 
  questionId: ..., 
  selectedChoiceId: ..., // optional
  textAnswer: ..., // optional
};

// Call the `submitAnswer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await submitAnswer(submitAnswerVars);
// Variables can be defined inline as well.
const { data } = await submitAnswer({ attemptId: ..., questionId: ..., selectedChoiceId: ..., textAnswer: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await submitAnswer(dataConnect, submitAnswerVars);

console.log(data.studentAnswer_upsert);

// Or, you can use the `Promise` API.
submitAnswer(submitAnswerVars).then((response) => {
  const data = response.data;
  console.log(data.studentAnswer_upsert);
});
```

### Using `SubmitAnswer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, submitAnswerRef, SubmitAnswerVariables } from '@dataconnect/generated';

// The `SubmitAnswer` mutation requires an argument of type `SubmitAnswerVariables`:
const submitAnswerVars: SubmitAnswerVariables = {
  attemptId: ..., 
  questionId: ..., 
  selectedChoiceId: ..., // optional
  textAnswer: ..., // optional
};

// Call the `submitAnswerRef()` function to get a reference to the mutation.
const ref = submitAnswerRef(submitAnswerVars);
// Variables can be defined inline as well.
const ref = submitAnswerRef({ attemptId: ..., questionId: ..., selectedChoiceId: ..., textAnswer: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = submitAnswerRef(dataConnect, submitAnswerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studentAnswer_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studentAnswer_upsert);
});
```

## SubmitExam
You can execute the `SubmitExam` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
submitExam(vars: SubmitExamVariables): MutationPromise<SubmitExamData, SubmitExamVariables>;

interface SubmitExamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitExamVariables): MutationRef<SubmitExamData, SubmitExamVariables>;
}
export const submitExamRef: SubmitExamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
submitExam(dc: DataConnect, vars: SubmitExamVariables): MutationPromise<SubmitExamData, SubmitExamVariables>;

interface SubmitExamRef {
  ...
  (dc: DataConnect, vars: SubmitExamVariables): MutationRef<SubmitExamData, SubmitExamVariables>;
}
export const submitExamRef: SubmitExamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the submitExamRef:
```typescript
const name = submitExamRef.operationName;
console.log(name);
```

### Variables
The `SubmitExam` mutation requires an argument of type `SubmitExamVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SubmitExamVariables {
  attemptId: UUIDString;
}
```
### Return Type
Recall that executing the `SubmitExam` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SubmitExamData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SubmitExamData {
  examAttempt_update?: ExamAttempt_Key | null;
}
```
### Using `SubmitExam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, submitExam, SubmitExamVariables } from '@dataconnect/generated';

// The `SubmitExam` mutation requires an argument of type `SubmitExamVariables`:
const submitExamVars: SubmitExamVariables = {
  attemptId: ..., 
};

// Call the `submitExam()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await submitExam(submitExamVars);
// Variables can be defined inline as well.
const { data } = await submitExam({ attemptId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await submitExam(dataConnect, submitExamVars);

console.log(data.examAttempt_update);

// Or, you can use the `Promise` API.
submitExam(submitExamVars).then((response) => {
  const data = response.data;
  console.log(data.examAttempt_update);
});
```

### Using `SubmitExam`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, submitExamRef, SubmitExamVariables } from '@dataconnect/generated';

// The `SubmitExam` mutation requires an argument of type `SubmitExamVariables`:
const submitExamVars: SubmitExamVariables = {
  attemptId: ..., 
};

// Call the `submitExamRef()` function to get a reference to the mutation.
const ref = submitExamRef(submitExamVars);
// Variables can be defined inline as well.
const ref = submitExamRef({ attemptId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = submitExamRef(dataConnect, submitExamVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.examAttempt_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.examAttempt_update);
});
```

## GradeSubjectiveAnswer
You can execute the `GradeSubjectiveAnswer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
gradeSubjectiveAnswer(vars: GradeSubjectiveAnswerVariables): MutationPromise<GradeSubjectiveAnswerData, GradeSubjectiveAnswerVariables>;

interface GradeSubjectiveAnswerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GradeSubjectiveAnswerVariables): MutationRef<GradeSubjectiveAnswerData, GradeSubjectiveAnswerVariables>;
}
export const gradeSubjectiveAnswerRef: GradeSubjectiveAnswerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
gradeSubjectiveAnswer(dc: DataConnect, vars: GradeSubjectiveAnswerVariables): MutationPromise<GradeSubjectiveAnswerData, GradeSubjectiveAnswerVariables>;

interface GradeSubjectiveAnswerRef {
  ...
  (dc: DataConnect, vars: GradeSubjectiveAnswerVariables): MutationRef<GradeSubjectiveAnswerData, GradeSubjectiveAnswerVariables>;
}
export const gradeSubjectiveAnswerRef: GradeSubjectiveAnswerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the gradeSubjectiveAnswerRef:
```typescript
const name = gradeSubjectiveAnswerRef.operationName;
console.log(name);
```

### Variables
The `GradeSubjectiveAnswer` mutation requires an argument of type `GradeSubjectiveAnswerVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GradeSubjectiveAnswerVariables {
  answerId: UUIDString;
  isCorrect: boolean;
  earnedPoints: number;
  feedback?: string | null;
}
```
### Return Type
Recall that executing the `GradeSubjectiveAnswer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GradeSubjectiveAnswerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GradeSubjectiveAnswerData {
  studentAnswer_update?: StudentAnswer_Key | null;
}
```
### Using `GradeSubjectiveAnswer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, gradeSubjectiveAnswer, GradeSubjectiveAnswerVariables } from '@dataconnect/generated';

// The `GradeSubjectiveAnswer` mutation requires an argument of type `GradeSubjectiveAnswerVariables`:
const gradeSubjectiveAnswerVars: GradeSubjectiveAnswerVariables = {
  answerId: ..., 
  isCorrect: ..., 
  earnedPoints: ..., 
  feedback: ..., // optional
};

// Call the `gradeSubjectiveAnswer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await gradeSubjectiveAnswer(gradeSubjectiveAnswerVars);
// Variables can be defined inline as well.
const { data } = await gradeSubjectiveAnswer({ answerId: ..., isCorrect: ..., earnedPoints: ..., feedback: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await gradeSubjectiveAnswer(dataConnect, gradeSubjectiveAnswerVars);

console.log(data.studentAnswer_update);

// Or, you can use the `Promise` API.
gradeSubjectiveAnswer(gradeSubjectiveAnswerVars).then((response) => {
  const data = response.data;
  console.log(data.studentAnswer_update);
});
```

### Using `GradeSubjectiveAnswer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, gradeSubjectiveAnswerRef, GradeSubjectiveAnswerVariables } from '@dataconnect/generated';

// The `GradeSubjectiveAnswer` mutation requires an argument of type `GradeSubjectiveAnswerVariables`:
const gradeSubjectiveAnswerVars: GradeSubjectiveAnswerVariables = {
  answerId: ..., 
  isCorrect: ..., 
  earnedPoints: ..., 
  feedback: ..., // optional
};

// Call the `gradeSubjectiveAnswerRef()` function to get a reference to the mutation.
const ref = gradeSubjectiveAnswerRef(gradeSubjectiveAnswerVars);
// Variables can be defined inline as well.
const ref = gradeSubjectiveAnswerRef({ answerId: ..., isCorrect: ..., earnedPoints: ..., feedback: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = gradeSubjectiveAnswerRef(dataConnect, gradeSubjectiveAnswerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studentAnswer_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studentAnswer_update);
});
```

## FinalizeExamGrading
You can execute the `FinalizeExamGrading` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
finalizeExamGrading(vars: FinalizeExamGradingVariables): MutationPromise<FinalizeExamGradingData, FinalizeExamGradingVariables>;

interface FinalizeExamGradingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: FinalizeExamGradingVariables): MutationRef<FinalizeExamGradingData, FinalizeExamGradingVariables>;
}
export const finalizeExamGradingRef: FinalizeExamGradingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
finalizeExamGrading(dc: DataConnect, vars: FinalizeExamGradingVariables): MutationPromise<FinalizeExamGradingData, FinalizeExamGradingVariables>;

interface FinalizeExamGradingRef {
  ...
  (dc: DataConnect, vars: FinalizeExamGradingVariables): MutationRef<FinalizeExamGradingData, FinalizeExamGradingVariables>;
}
export const finalizeExamGradingRef: FinalizeExamGradingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the finalizeExamGradingRef:
```typescript
const name = finalizeExamGradingRef.operationName;
console.log(name);
```

### Variables
The `FinalizeExamGrading` mutation requires an argument of type `FinalizeExamGradingVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface FinalizeExamGradingVariables {
  attemptId: UUIDString;
  score: number;
  isPassed: boolean;
}
```
### Return Type
Recall that executing the `FinalizeExamGrading` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `FinalizeExamGradingData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface FinalizeExamGradingData {
  examAttempt_update?: ExamAttempt_Key | null;
}
```
### Using `FinalizeExamGrading`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, finalizeExamGrading, FinalizeExamGradingVariables } from '@dataconnect/generated';

// The `FinalizeExamGrading` mutation requires an argument of type `FinalizeExamGradingVariables`:
const finalizeExamGradingVars: FinalizeExamGradingVariables = {
  attemptId: ..., 
  score: ..., 
  isPassed: ..., 
};

// Call the `finalizeExamGrading()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await finalizeExamGrading(finalizeExamGradingVars);
// Variables can be defined inline as well.
const { data } = await finalizeExamGrading({ attemptId: ..., score: ..., isPassed: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await finalizeExamGrading(dataConnect, finalizeExamGradingVars);

console.log(data.examAttempt_update);

// Or, you can use the `Promise` API.
finalizeExamGrading(finalizeExamGradingVars).then((response) => {
  const data = response.data;
  console.log(data.examAttempt_update);
});
```

### Using `FinalizeExamGrading`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, finalizeExamGradingRef, FinalizeExamGradingVariables } from '@dataconnect/generated';

// The `FinalizeExamGrading` mutation requires an argument of type `FinalizeExamGradingVariables`:
const finalizeExamGradingVars: FinalizeExamGradingVariables = {
  attemptId: ..., 
  score: ..., 
  isPassed: ..., 
};

// Call the `finalizeExamGradingRef()` function to get a reference to the mutation.
const ref = finalizeExamGradingRef(finalizeExamGradingVars);
// Variables can be defined inline as well.
const ref = finalizeExamGradingRef({ attemptId: ..., score: ..., isPassed: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = finalizeExamGradingRef(dataConnect, finalizeExamGradingVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.examAttempt_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.examAttempt_update);
});
```

## UpdateQuestionStatistics
You can execute the `UpdateQuestionStatistics` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateQuestionStatistics(vars: UpdateQuestionStatisticsVariables): MutationPromise<UpdateQuestionStatisticsData, UpdateQuestionStatisticsVariables>;

interface UpdateQuestionStatisticsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuestionStatisticsVariables): MutationRef<UpdateQuestionStatisticsData, UpdateQuestionStatisticsVariables>;
}
export const updateQuestionStatisticsRef: UpdateQuestionStatisticsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateQuestionStatistics(dc: DataConnect, vars: UpdateQuestionStatisticsVariables): MutationPromise<UpdateQuestionStatisticsData, UpdateQuestionStatisticsVariables>;

interface UpdateQuestionStatisticsRef {
  ...
  (dc: DataConnect, vars: UpdateQuestionStatisticsVariables): MutationRef<UpdateQuestionStatisticsData, UpdateQuestionStatisticsVariables>;
}
export const updateQuestionStatisticsRef: UpdateQuestionStatisticsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateQuestionStatisticsRef:
```typescript
const name = updateQuestionStatisticsRef.operationName;
console.log(name);
```

### Variables
The `UpdateQuestionStatistics` mutation requires an argument of type `UpdateQuestionStatisticsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateQuestionStatisticsVariables {
  questionId: UUIDString;
  totalAttempts: number;
  correctAttempts: number;
  averageScore?: number | null;
}
```
### Return Type
Recall that executing the `UpdateQuestionStatistics` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateQuestionStatisticsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateQuestionStatisticsData {
  questionStatistics_upsert: QuestionStatistics_Key;
}
```
### Using `UpdateQuestionStatistics`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateQuestionStatistics, UpdateQuestionStatisticsVariables } from '@dataconnect/generated';

// The `UpdateQuestionStatistics` mutation requires an argument of type `UpdateQuestionStatisticsVariables`:
const updateQuestionStatisticsVars: UpdateQuestionStatisticsVariables = {
  questionId: ..., 
  totalAttempts: ..., 
  correctAttempts: ..., 
  averageScore: ..., // optional
};

// Call the `updateQuestionStatistics()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuestionStatistics(updateQuestionStatisticsVars);
// Variables can be defined inline as well.
const { data } = await updateQuestionStatistics({ questionId: ..., totalAttempts: ..., correctAttempts: ..., averageScore: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateQuestionStatistics(dataConnect, updateQuestionStatisticsVars);

console.log(data.questionStatistics_upsert);

// Or, you can use the `Promise` API.
updateQuestionStatistics(updateQuestionStatisticsVars).then((response) => {
  const data = response.data;
  console.log(data.questionStatistics_upsert);
});
```

### Using `UpdateQuestionStatistics`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateQuestionStatisticsRef, UpdateQuestionStatisticsVariables } from '@dataconnect/generated';

// The `UpdateQuestionStatistics` mutation requires an argument of type `UpdateQuestionStatisticsVariables`:
const updateQuestionStatisticsVars: UpdateQuestionStatisticsVariables = {
  questionId: ..., 
  totalAttempts: ..., 
  correctAttempts: ..., 
  averageScore: ..., // optional
};

// Call the `updateQuestionStatisticsRef()` function to get a reference to the mutation.
const ref = updateQuestionStatisticsRef(updateQuestionStatisticsVars);
// Variables can be defined inline as well.
const ref = updateQuestionStatisticsRef({ questionId: ..., totalAttempts: ..., correctAttempts: ..., averageScore: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateQuestionStatisticsRef(dataConnect, updateQuestionStatisticsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.questionStatistics_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.questionStatistics_upsert);
});
```

