import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Metadata } from "next";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Clouthy",
  description: "Clouthy shop",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={poppins.className}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
