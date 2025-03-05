//'use server'

import { CreateUserState } from "@/lib/definitions";
import { userSchema } from "@/components/dashboard/tables/users/users-schema";
//import { revalidatePath } from "next/cache";
//import { createUser } from "@/lib/services/userService";

export async function createUserAction(prevState: CreateUserState, formData: FormData) {
  const rowData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    enabled: formData.get("enabled") === "true",
    emailVerified: false,
  };
  
  const validatedFields = userSchema.safeParse(rowData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors in the form",
      inputs: rowData,
    }
  }

  try {
    // To do
    //const result = await createUser(validatedFields.data);
    
    return {
      message: "User created successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
        inputs: rowData
      }
    }
    return {
      message: "An unexpected error occurred",
      inputs: rowData
    }
  } finally {
    //revalidatePath('/');
  }
}