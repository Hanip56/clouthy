import Sidebar from "./components/Sidebar";
import Topbar from "./components/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Topbar />
      <div className="hidden md:block w-60 border-r">
        <Sidebar />
      </div>
      <main className="pt-14">{children}</main>
    </div>
  );
}
