import { redirect } from "next/navigation";
import { auth } from "@/auth";

const ALLOWED_ROLES = ["SUPER_ADMIN", "ADMIN", "MODERATOR", "VOLUNTEER"];

export default async function Home() {
  const session = await auth();

  if (
    session &&
    session.user.role &&
    ALLOWED_ROLES.includes(session.user.role)
  ) {
    redirect("/admin/scanner");
  }

  redirect("/login");
}