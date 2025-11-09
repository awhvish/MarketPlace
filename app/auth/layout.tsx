export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=" flex items-center justify-center bg-black">
            <div className=" space-y-8 p-6 bg-black rounded-xl shadow-md">
                {children}
            </div>
        </div>
    );
}

