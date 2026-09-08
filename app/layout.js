import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    min-height: 100vh;
    max-width: 100vw;
  }


  body {
    display: flex;
    flex-direction: column;
    overflow-x: clip;
  }

  .main-content {
    flex: 1;
    width: 100%;
    min-width: 0;
    padding-top: 142px;
  }
    
  @media (max-width: 767px) {
    .main-content {
      padding-top: 114px;
    }
  }

  @media (max-width: 420px) {
    .main-content {
      padding-top: 108px;
    }
  }
`;

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
      <head>
        <style>{styles}</style>
      </head>
      <body>
        <Navbar />
        <div className="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}