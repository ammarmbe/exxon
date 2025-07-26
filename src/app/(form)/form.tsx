"use client";

import type { TActionResponse } from "@/app/(form)/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { submit } from "./action";

const initialState: TActionResponse = {
  success: false,
  message: "",
};

export default function Form() {
  const [state, action, isPending] = useActionState(submit, initialState);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>ExxonMobile Demo</CardTitle>
        <CardDescription>Please enter your name and age.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6" autoComplete="on">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                aria-describedby="name-error"
                className={state?.errors?.name ? "border-red-500" : ""}
              />
              {state?.errors?.name && (
                <p id="name-error" className="text-sm text-red-500">
                  {state.errors.name.errors[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                placeholder="25"
                maxLength={20}
                autoComplete="age"
                aria-describedby="age-error"
                className={state?.errors?.age ? "border-red-500" : ""}
              />
              {state?.errors?.age && (
                <p id="age-error" className="text-sm text-red-500">
                  {state.errors.age.errors[0]}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
