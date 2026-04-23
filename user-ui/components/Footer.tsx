export default function Footer() {
  return (
    <footer className="bg-[#1c1a17] text-[#e7dcca] border-t border-[#3a2f26] rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">

          {/* Left: System Info */}
          <div>
            <p className="font-semibold tracking-wide">
              Kora Control – Smart Water Management System
            </p>
            <p className="text-[#cfc3b3] mt-2">
              Providing real-time monitoring, billing, and customer service
              solutions for efficient water resource management.
            </p>
          </div>

          {/* Center: Navigation / Policies */}
          <div className="flex gap-6">
            <span className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white transition cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-white transition cursor-pointer">
              Support Center
            </span>
          </div>

          {/* Right: Copyright */}
          <div className="text-[#cfc3b3] text-center md:text-right">
            <p>© {new Date().getFullYear()} Kora Control</p>
            <p>All rights reserved.</p>
          </div>

        </div>
      </div>
    </footer>
  );
}