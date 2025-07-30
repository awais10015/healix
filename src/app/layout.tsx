import type { Metadata } from "next";
import "./globals.css";
// import "@stream-io/video-react-sdk/dist/css/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
// import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import SelectedUserContextProvider from "@/app/context/selectedUserContextProvider";
import TrackThemeContextProvider from "@/app/context/trackThemeContextProvider";
// import { StreamVideoProvider } from "@/providers/StreamClientProvider";

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
          {/* <ClerkProvider> */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TrackThemeContextProvider>
              <SelectedUserContextProvider>
                {/* <StreamVideoProvider> */}

                {children}
                {/* </StreamVideoProvider> */}
              </SelectedUserContextProvider>
            </TrackThemeContextProvider>
          </ThemeProvider>
          {/* </ClerkProvider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
