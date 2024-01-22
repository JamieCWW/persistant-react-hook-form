import { useEffect } from "react";
import { useForm, UseFormReturn, FieldValues, Path } from "react-hook-form";

type UseFormPersistReturn<T extends FieldValues> = UseFormReturn<T>;

export function useFormPersist<T extends FieldValues>(
  storageKey: string,
  storageLocation: Storage = localStorage,
  includeDirtyFields: boolean = true,
): UseFormPersistReturn<T> {
  const methods  = useForm<T>();
  const {
    formState,setValue,watch
  } = methods
  const { dirtyFields, isSubmitting, isSubmitted } = formState;

  if (!storageKey) {
    throw new Error("Storage Key is required");
  }

  // Retrieve values from storage on mount
  useEffect(() => {
    const storedData: string | null = storageLocation.getItem(storageKey);
    if (storedData && !isSubmitted) {
      const { values, dirtyFields } = JSON.parse(storedData);
      const keys = Object.keys(values);
      keys.forEach((key) => {
        setValue(key as Path<T>, values[key], {
          shouldDirty: includeDirtyFields && !!dirtyFields[key],
        });
      });
    }
  }, [storageKey, storageLocation, includeDirtyFields, setValue, dirtyFields, isSubmitted]);

  // Persist values and dirty fields to storage
  useEffect(() => {
    const valuesToPersist = watch();
    const dirtyFieldsToPersist = Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);

    if (Object.keys(dirtyFieldsToPersist).length > 0) {
      const dataToPersist = JSON.stringify({
        values: valuesToPersist,
        dirtyFields: dirtyFieldsToPersist,
      });
      storageLocation.setItem(storageKey, dataToPersist);
    }
  }, [watch(), dirtyFields, storageKey, storageLocation]);

  // Remove storage on form submission
  useEffect(() => {
    if (isSubmitting) {
      storageLocation.removeItem(storageKey);
    }
  }, [isSubmitting, storageKey, storageLocation]);

  return { ...methods };
}
