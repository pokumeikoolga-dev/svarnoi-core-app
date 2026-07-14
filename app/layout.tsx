import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Первый Сварной",
  description: "Кузовные и сварочные работы в Минске.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
