"use server";

import { schema } from "@/app/(form)/schema";
import { TActionResponse, TFormData } from "@/app/(form)/types";
import db from "@/utils/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function submit(
  _: TActionResponse | null,
  formData: FormData,
): Promise<TActionResponse> {
  try {
    const rawData: TFormData = {
      name: formData.get("name") as string,
      age: Number(formData.get("age")),
    };

    const validatedData = schema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: z.treeifyError(validatedData.error).properties,
      };
    }

    await db.user.create({
      data: {
        name: validatedData.data.name,
        age: validatedData.data.age,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Data saved successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
}
