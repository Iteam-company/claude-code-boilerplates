import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined" && token) {
      router.replace(ROUTES.HOME);
    }
  }, [router]);

  return <main>{children}</main>;
}
