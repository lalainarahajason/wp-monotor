import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { NavBar } from "./_components/navbar"

async function SettingsPage() {

    const session = await auth()

  return (
    <div className="flex flex-col gap-y-10 items-center"> 
      <NavBar />
      
      </div>
  )
}

export default SettingsPage