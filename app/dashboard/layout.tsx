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
      <div className="hidden md:block w-60 border-r flex-shrink-0">
        <Sidebar />
      </div>
      <main className="w-full h-full pt-14">{children}</main>
    </div>
  );
}
