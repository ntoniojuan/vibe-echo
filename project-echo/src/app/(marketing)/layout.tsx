export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="echo-theme-transition min-h-screen bg-background text-on-background">
      {children}
    </div>
  );
}
