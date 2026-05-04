import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-between items-center h-dvh">
      <div>
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
