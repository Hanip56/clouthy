import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { options } from "@/lib/nextAuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Clouthy",
  description: "Clouthy shop",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  if (session && session.user.isAdmin) {
    redirect("/dashboard");
  }

  return (
    <div className={poppins.className}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
