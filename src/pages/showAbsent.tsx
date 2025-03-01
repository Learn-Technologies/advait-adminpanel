import MainLayout from "@/layouts/MainLayout";
import ShowAbsentStudentPage from "../components/absent/ShowAbsentStudentPage";

export default function showAbsent() {
  return (
    <MainLayout>
      <ShowAbsentStudentPage />
    </MainLayout>
  );
}
