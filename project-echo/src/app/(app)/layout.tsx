import { EchoProtectedAppLayout } from "@/components/auth/EchoProtectedAppLayout";

export default function AppGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <EchoProtectedAppLayout>{children}</EchoProtectedAppLayout>;
}
