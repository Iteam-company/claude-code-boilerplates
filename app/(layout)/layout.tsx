import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PropsWithChildren } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
