import "./globals.css";
import "./mobile-improvements.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: "CRM Dashboard - DT Fellowship",
  description: "CRM Data Champion - B2B SaaS Lead Management System",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="min-h-screen">
          {/* Fixed Navbar */}
          <div className="fixed top-0 left-0 right-0 z-30">
            <Navbar />
          </div>
          
          {/* Sidebar and Main Content Container */}
          <div className="flex pt-16"> {/* pt-16 accounts for navbar height */}
            <Sidebar />
            <main className="flex-1 md:ml-64 w-full min-w-0">
              <div className="py-4 md:py-6">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
