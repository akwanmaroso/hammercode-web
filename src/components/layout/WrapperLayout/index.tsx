"use client";

import Navbar from "@/components/common/Navbar";
import { ThemeProvider } from "./ThemeProvider";
import Footer from "@/components/common/Footer";
import { useParams, usePathname } from "next/navigation";

const WrapperLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const pathname = usePathname();
  const isCertificateDetailPage = !!params?.slug && pathname.includes("certificates");

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      {isCertificateDetailPage ? (
        children
      ) : (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      )}
    </ThemeProvider>
  );
};
export default WrapperLayout;