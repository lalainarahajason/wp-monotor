import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { NavBar } from "./_components/navbar"

async function SettingsPage() {

    const session = await auth()

  return (
    <div className="flex flex-col gap-y-10 items-center"> 
      <NavBar />
      <form action={async() => {
        "use server";
        await signOut({
          redirectTo:"/auth/login"
        })
      }}>
        <Button>Sign out</Button>
      </form>
      </div>
  )
}

export default SettingsPage