import AuthWrapper from "@/components/AuthWrapper";
import { AppLogo } from "@/components/AppLogo";
import FormComponent from "./FormComponent";

export default function SignIn() {
  return (
    <AuthWrapper>
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="mb-3">
            <AppLogo height={50} />
          </div>
          <h2 className="mb-2 text-3xl font-bold">Welcome back</h2>
          <p className="mt-1 text-gray-500 w-[80%] text-center">
            Welcome back! Please enter your details for sign-in to Storix
          </p>
        </div>
      </div>
      <div>
        <FormComponent />
      </div>
    </AuthWrapper>
  );
}
