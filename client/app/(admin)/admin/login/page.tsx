import LoginForm from "@/components/auth/login-form"
import { getAuthUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  // Check if user is already authenticated
  const user = await getAuthUser()

  if (user) {
    redirect("/admin")
  }

  return <LoginForm />
}
