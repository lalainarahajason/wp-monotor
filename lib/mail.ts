import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email:string, 
    token:string
) => {
    const confirmLink = `${process.env.APP_DOMAIN}auth/new-verification?token=${token}`

    await resend.emails.send({
        from:"ikalangitahaja@gmail.com",
        to: email,
        subject:"Confirm your email",
        html: `
            <h1>Confirm your email</h1>
            <p>Click the link below to confirm your email</p>
            <a href="${confirmLink}">Confirm email</a>
        `
    })
}