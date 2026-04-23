"use client";

import { useState } from "react";

export default function ComplaintsPage() {
  const [form, setForm] = useState({
    name: "",
    account: "",
    category: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form); // later connect to backend
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-[#1c1a17] p-6 rounded-2xl shadow-xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white">
            Submit a Complaint
          </h1>
          <p className="text-sm text-[#cfc3b3] mt-2">
            Report issues related to water usage, billing, or service disruptions.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-sm mb-1 text-[#e7dcca]">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#2a241e] border border-[#3a2f26]
                         focus:outline-none focus:ring-2 focus:ring-[#6b4f3a]"
            />
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm mb-1 text-[#e7dcca]">
              Account Number
            </label>
            <input
              type="text"
              name="account"
              placeholder="Enter your account number"
              value={form.account}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#2a241e] border border-[#3a2f26]
                         focus:outline-none focus:ring-2 focus:ring-[#6b4f3a]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm mb-1 text-[#e7dcca]">
              Complaint Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#2a241e] border border-[#3a2f26]
                         focus:outline-none focus:ring-2 focus:ring-[#6b4f3a]"
            >
              <option value="" disabled hidden> Select category </option>
              <option value="billing">Billing Issue</option>
              <option value="leakage">Water Leakage</option>
              <option value="no-water">No Water Supply</option>
              <option value="quality">Water Quality Issue</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1 text-[#e7dcca]">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your issue in detail..."
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#2a241e] border border-[#3a2f26]
                         focus:outline-none focus:ring-2 focus:ring-[#6b4f3a]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#3a2f26] py-2 rounded-lg
                       hover:bg-[#4a3a2f] transition shadow-md"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}