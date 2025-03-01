import Footer from "@/src/components/common/footer/Footer";
import Header from "./Header";

export default function MainLayout({ children }: { children: any }) {
  return (
    <div className="w-full">
      <Header />
      <div className="md:container mx-auto md:justify-center items-center">
        <main>{children}</main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
