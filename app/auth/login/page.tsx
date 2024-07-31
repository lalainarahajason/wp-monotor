import { LoginForm } from "@/components/auth/login-form";
import { CardWrapper } from "@/components/auth/card-wrapper";

const LoginPage = () => {
    return(
        <CardWrapper 
            headerLabel="Welcom back" 
            backButtonHref="/auth/register" 
            backButtonLabel="Create an account"
            showSocial
            >
            <LoginForm />
        </CardWrapper>
    )
}

export default LoginPage;