import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center h-dvh overflow-y-scroll">
      <Header />
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
}
