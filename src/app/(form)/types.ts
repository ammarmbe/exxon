import { schema } from "@/app/(form)/schema";
import z from "zod";

export type TFormData = z.infer<typeof schema>;

export type TActionResponse = {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof TFormData]?: {
      errors: string[];
    };
  };
};
