export default function Footer() {
  return (
    <footer className="bg-background text-muted-foreground border-t">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">

          {/* Left: System Info */}
          <div className="text-center md:text-left">
            <p className="font-bold text-foreground">
              Kora Control
            </p>
            <p className="mt-2 max-w-xs">
              Providing real-time monitoring and efficient water resource management solutions.
            </p>
          </div>

          {/* Center: Navigation / Policies */}
          <div className="flex gap-6 font-medium">
            <span className="hover:text-primary transition cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-primary transition cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-primary transition cursor-pointer">
              Support
            </span>
          </div>

          {/* Right: Copyright */}
          <div className="text-center md:text-right">
            <p className="font-medium">© {new Date().getFullYear()} Kora Control</p>
            <p className="text-xs opacity-70">All rights reserved.</p>
          </div>

        </div>
      </div>
    </footer>
  );
}