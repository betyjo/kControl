export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-[#cfc3b3] text-sm">
          Overview of your water usage, billing, and system activity
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="card hover:scale-[1.02]">
          <h3>Total Water Usage</h3>
          <p className="text-3xl font-bold mt-2">-- L</p>
          <p className="text-xs text-[#cfc3b3] mt-1">
            Total consumption
          </p>
        </div>

        <div className="card hover:scale-[1.02]">
          <h3>Monthly Usage</h3>
          <p className="text-3xl font-bold mt-2">-- L</p>
          <p className="text-xs text-[#cfc3b3] mt-1">
            Current month usage
          </p>
        </div>

        <div className="card hover:scale-[1.02]">
          <h3>Current Bill</h3>
          <p className="text-3xl font-bold mt-2">-- ETB</p>
          <p className="text-xs text-[#cfc3b3] mt-1">
            Outstanding balance
          </p>
        </div>

        <div className="card hover:scale-[1.02]">
          <h3>Active Complaints</h3>
          <p className="text-3xl font-bold mt-2">--</p>
          <p className="text-xs text-[#cfc3b3] mt-1">
            Pending issues
          </p>
        </div>

      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Usage Chart Placeholder */}
        <div className="card h-64 flex items-center justify-center">
          <p className="text-[#cfc3b3]">
            Water Usage Chart (Coming Soon)
          </p>
        </div>

        {/* Billing Summary */}
        <div className="card space-y-3">
          <h3 className="text-lg font-semibold">Billing Summary</h3>

          <div className="flex justify-between">
            <span>Last Payment</span>
            <span>-- ETB</span>
          </div>

          <div className="flex justify-between">
            <span>Due Date</span>
            <span>--</span>
          </div>

          <div className="flex justify-between">
            <span>Status</span>
            <span className="text-yellow-400">Pending</span>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">
          Recent Activities
        </h3>

        <ul className="space-y-3 text-sm text-[#cfc3b3]">
          <li>• Water usage updated</li>
          <li>• New bill generated</li>
          <li>• Complaint submitted</li>
        </ul>
      </div>

    </div>
  );
}