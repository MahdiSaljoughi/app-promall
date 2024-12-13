import MainFooter from "../Footer/MainFooter";
import MainHeader from "../Header/MainHeader";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen container mx-auto">
      <MainHeader />
      <div className="px-4 md:px-0">{children}</div>
      <MainFooter />
    </div>
  );
}
