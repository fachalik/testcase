import { AppLogo } from "@/components/AppLogo";
import Wrapper from "@/Layouts/WrapperLayout";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <main className="h-screen flex flex-col items-center justify-center gap-2">
        <div className="flex flex-col gap-2 items-center justify-center">
          {/* <p className="text-base font-semibold text-[#1677ff]">404</p> */}
          <AppLogo height={25} />
        </div>
        <div className="text-center">
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            404 Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div
              onClick={() => navigate("/")}
              className="rounded-md bg-[#1677ff] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff]"
            >
              Go back home
            </div>
          </div>
        </div>
      </main>
    </Wrapper>
  );
}
