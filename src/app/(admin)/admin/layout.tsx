
export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Auth is handled by middleware.ts
    // This layout just provides the nav and structure

    return (
        <div className="min-h-screen bg-background">
            <main>{children}</main>
        </div>
    );
}
