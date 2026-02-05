import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";

export const metadata: Metadata = {
    title: {
        default: "Calitop Services",
        template: "%s | Calitop Services",
    },
    description:
        "Alquiler de equipos topográficos, servicio técnico especializado y servicios topográficos profesionales.",
    keywords: [
        "topografía",
        "equipos topográficos",
        "alquiler",
        "servicio técnico",
        "GPS",
        "estación total",
    ],
    authors: [{ name: "Calitop" }],
    openGraph: {
        type: "website",
        locale: "es_ES",
        siteName: "Calitop Services",
    },
};

import { ThemeProvider } from "@/components/theme-provider";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import Footer from "@/components/ui/footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className="antialiased font-sans" suppressHydrationWarning>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                    <WhatsAppButton />
                </ThemeProvider>
            </body>
        </html>
    );
}
