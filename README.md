# `persisting-react-hook-form`

An easy use hook that allow you to store the form data in local storage to refer back to.

# `How to install`

npm i persisting-react-hook-form

# `How to use`

simple import the hook and replace it with the current useForm().

```tsx

import { useFormPersist } from "persisting-react-hook-form";

once imported you will need to add a unique

const storageKey = "form-persistent";

const methods = useFormPersist(storageKey);

			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(handleFormSubmit)}
					className="flex gap-2"
				>
					<input
						type="text"
						{...methods.register("Post")}
						className="grow bg-slate-400 py-2 px-4 rounded-full"
					/>
					<button
						type="submit"
						className={`px-8 py-2 bg-emerald-600 rounded-full ${
							isPostAnimated && "animate-bounce"
						}`}
					>
						Post
					</button>
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
		const methods = useFormPersist({storageKey:"randomKey", storageLocation:sessionStorage,includeDirtyFields:false});

                         ///or////
                         
    const methods = useFormPersist("randomKey", sessionStorage,false);
```  


