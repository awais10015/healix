import type { Metadata } from "next";
import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import SelectedUserContextProvider from "@/app/context/selectedUserContextProvider";
import TrackThemeContextProvider from "@/app/context/trackThemeContextProvider";
import { StreamVideoProvider } from "@/providers/StreamClientProvider";
import DoctorContextProvider from "@/app/context/doctorContextProvider";
export const metadata: Metadata = {
  title: "Healix",
  description: "Where care meets innovation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning>
         
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DoctorContextProvider>
              <TrackThemeContextProvider>
                <SelectedUserContextProvider>
                  <StreamVideoProvider>
                    {children}
                    <Toaster />
                  </StreamVideoProvider>
                </SelectedUserContextProvider>
              </TrackThemeContextProvider>
            </DoctorContextProvider>
          </ThemeProvider>
        
        </body>
      </html>
    </ClerkProvider>
  );
}
