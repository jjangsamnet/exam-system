# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useUpsertUser, useCreateCategory, useUpdateCategory, useDeleteCategory, useCreateQuestion, useUpdateQuestion, useDeleteQuestion, useAddChoice, useUpdateChoice, useDeleteChoice } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useUpsertUser(upsertUserVars);

const { data, isPending, isSuccess, isError, error } = useCreateCategory(createCategoryVars);

const { data, isPending, isSuccess, isError, error } = useUpdateCategory(updateCategoryVars);

const { data, isPending, isSuccess, isError, error } = useDeleteCategory(deleteCategoryVars);

const { data, isPending, isSuccess, isError, error } = useCreateQuestion(createQuestionVars);

const { data, isPending, isSuccess, isError, error } = useUpdateQuestion(updateQuestionVars);

const { data, isPending, isSuccess, isError, error } = useDeleteQuestion(deleteQuestionVars);

const { data, isPending, isSuccess, isError, error } = useAddChoice(addChoiceVars);

const { data, isPending, isSuccess, isError, error } = useUpdateChoice(updateChoiceVars);

const { data, isPending, isSuccess, isError, error } = useDeleteChoice(deleteChoiceVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { upsertUser, createCategory, updateCategory, deleteCategory, createQuestion, updateQuestion, deleteQuestion, addChoice, updateChoice, deleteChoice } from '@dataconnect/generated';


// Operation UpsertUser:  For variables, look at type UpsertUserVars in ../index.d.ts
const { data } = await UpsertUser(dataConnect, upsertUserVars);

// Operation CreateCategory:  For variables, look at type CreateCategoryVars in ../index.d.ts
const { data } = await CreateCategory(dataConnect, createCategoryVars);

// Operation UpdateCategory:  For variables, look at type UpdateCategoryVars in ../index.d.ts
const { data } = await UpdateCategory(dataConnect, updateCategoryVars);

// Operation DeleteCategory:  For variables, look at type DeleteCategoryVars in ../index.d.ts
const { data } = await DeleteCategory(dataConnect, deleteCategoryVars);

// Operation CreateQuestion:  For variables, look at type CreateQuestionVars in ../index.d.ts
const { data } = await CreateQuestion(dataConnect, createQuestionVars);

// Operation UpdateQuestion:  For variables, look at type UpdateQuestionVars in ../index.d.ts
const { data } = await UpdateQuestion(dataConnect, updateQuestionVars);

// Operation DeleteQuestion:  For variables, look at type DeleteQuestionVars in ../index.d.ts
const { data } = await DeleteQuestion(dataConnect, deleteQuestionVars);

// Operation AddChoice:  For variables, look at type AddChoiceVars in ../index.d.ts
const { data } = await AddChoice(dataConnect, addChoiceVars);

// Operation UpdateChoice:  For variables, look at type UpdateChoiceVars in ../index.d.ts
const { data } = await UpdateChoice(dataConnect, updateChoiceVars);

// Operation DeleteChoice:  For variables, look at type DeleteChoiceVars in ../index.d.ts
const { data } = await DeleteChoice(dataConnect, deleteChoiceVars);


```