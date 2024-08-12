import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"


async function SettingsPage() {

    const session = await auth()

  return (
    <div className="flex flex-col gap-y-10 items-center"> 
      Settings
      
      </div>
  )
}

export default SettingsPage