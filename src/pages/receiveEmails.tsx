import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/src/components/home/HomePage";
import { getCookie } from "cookies-next";
import LogInPage from "../components/login/LoginPage";
import ReceiveEmailPage from "../components/receiveEmail/ReceiveEmailPage";

export default function Home() {
  return (
    <MainLayout>
      <ReceiveEmailPage />
    </MainLayout>
  );
}
