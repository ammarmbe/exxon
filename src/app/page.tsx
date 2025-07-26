import { Button } from "@/components/ui/button";
import db from "@/utils/db";
import { LucideTrash2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import Form from "./(form)/form";

export default async function Page() {
  const users = await db.user.findMany();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-12 px-6 pt-12 lg:flex-row lg:items-start lg:pt-30">
      <div className="flex w-full max-w-md flex-col gap-3">
        <div className="text-2xl font-bold">Users</div>
        <div className="flex max-h-96 flex-col overflow-auto">
          {users.length ? (
            users.map((user) => (
              <form
                key={user.id}
                className="odd:bg-secondary group flex items-center justify-between gap-5 px-3 py-2"
                action={async () => {
                  "use server";
                  await db.user.delete({ where: { id: user.id } });
                  revalidatePath("/");
                }}
              >
                <div className="flex flex-col gap-1">
                  {user.name} – {user.age}
                  <div className="text-muted-foreground text-sm">
                    {user.createdAt.toLocaleDateString()}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="group-odd:hover:bg-popover"
                >
                  <LucideTrash2 />
                </Button>
              </form>
            ))
          ) : (
            <p className="text-muted-foreground">No users found</p>
          )}
        </div>
      </div>
      <Form />
    </div>
  );
}
