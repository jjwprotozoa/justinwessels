import Link from 'next/link';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <>
      {children}
      
      {/* Footer Navigation */}
      <footer className="py-8 px-4 border-t bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 Justin Wessels. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link 
                href="/projects" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Portfolio
              </Link>
              <Link 
                href="/labs" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Labs
              </Link>
              <Link 
                href="/ventures" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Ventures
              </Link>
              <Link 
                href="/hire" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Hire
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
