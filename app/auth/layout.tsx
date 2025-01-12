export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">

<<<<<<< HEAD
                {children}
=======
            <body
                className={``}
            >
                {children}
            </body>

>>>>>>> 2a2ccd0f384a41650db6e07cd99c943aecaad690
        </html>
    );
}

