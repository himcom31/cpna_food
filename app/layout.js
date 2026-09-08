import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css"; // ✅ yahan import karo

export const metadata = {
  title: "CPNA Food Stuff | Fruits & Vegetables Export Dubai",
  description:
    "CPNA Food Stuff exports fresh fruits, vegetables, pulses & grains from India to Dubai and worldwide.",
  keywords: "fruits vegetables export Dubai, CPNA foods, pulses grains export",
  icons: {
    icon: "/logo.png?v=2",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}