"use server";

import * as z from "zod";
import { SettingsSchema } from "@/schemas";
import { db } from "@/lib/db";

import { getUserById } from "@/data/user";
import { CurrentUser } from "@/lib/auth";

export const settings = async (
    values : z.infer<typeof SettingsSchema>
) => {
    const user = await CurrentUser();

    if(!user) {
        return {
            error: "Unauthorized"
        }
    }

    const dbUser = await getUserById(user.id);

    if(!dbUser) {
        return {
            error: "Unauthorized"
        }
    }

    // if account is social login, disable those fields
    if(user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    await db.user.update({
        where: {
            id: dbUser.id
        },
        data: {
            ...values
        }
    });

    return { success : "settings updated" }
}