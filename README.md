# `persistant-react-hook-form`

An easy use hook that allow you to store the form data in local storage to refer back to.

# `How to install`

npm i persistant-react-hook-form

# `How to use`

simple import the hook and replace it with the current useForm().

All the functionalities provided by the useForm() functions and hooks remain accessible through their conventional practices, such as the method approach.


```tsx

import { useFormPersist } from "persistant-react-hook-form";

// once imported you will need to add a unique

const storageKey = "form-persistent";

const methods = useFormPersist(storageKey);

		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(handleFormSubmit)}>
				<input type="text" {...methods.register("Post")}/>
				<button type="submit"> Post </button>
			</form>
		</FormProvider>
 ```   


 # `Additional Options`

 As default it set the storage option to local storage, but you can set it to sessionStorage aswell.
```tsx
const methods = useFormPersist({storageKey:"randomKey", storageLocation:sessionStorage});

                         ///or////

const methods = useFormPersist("randomKey", sessionStorage);
```  

You can also opt-out if you want the dirtystate of fields to be stored or not. 
```tsx
const methods = useFormPersist({storageKey:"randomKey",includeDirtyFields:false});

                         ///or////
                         
const methods = useFormPersist("randomKey", sessionStorage,false);
```  


