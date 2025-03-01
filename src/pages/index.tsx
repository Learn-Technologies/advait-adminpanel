import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/src/components/home/HomePage";
import { getCookie } from "cookies-next";
import LogInPage from "../components/login/LoginPage";

export default function Home() {
  const isCookieToken = getCookie("token");
  // this condition  typeof window !== "undefined"  escape me from next js UI hydration error
  // if (typeof window !== "undefined" && !isCookieToken) return <LogInPage />;
  // console.log(isCookieToken, "isCookieToken");
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  );
}
