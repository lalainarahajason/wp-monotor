"use server";

import { CurrentRole } from "@/lib/auth";
import AdminCard from "./_components/card";

function AdminPage() {

    const role = CurrentRole();

  return (
    <AdminCard />
  )
}

export default AdminPage