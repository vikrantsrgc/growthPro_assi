import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [form, setForm] = useState({ name: "", location: "" });
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Submitting business details...");

    try {
      const response = await fetch("https://growth-pro-assi-vikrants-projects-c38f5f6c.vercel.app/business-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      setBusinessData(result);
      setForm({ name: "", location: "" });
      toast.dismiss();
      toast.success("Business info submitted successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  // Regenerate SEO headline
  const regenerateHeadline = async () => {
    toast.loading("Regenerating headline...");

    try {
      const response = await fetch(
        `https://growth-pro-assi-vikrants-projects-c38f5f6c.vercel.app/regenerate-headline?name=${form.name || "Business"}&location=${form.location || "City"}`
      );
      const result = await response.json();

      setBusinessData((prev) => ({
        ...prev,
        headline: result.headline,
      }));

      toast.dismiss();
      toast.success("New headline generated!");
    } catch (error) {
      toast.dismiss();
      toast.error("Unable to generate a new headline.");
    }
  };

  // Dynamic Tailwind classes
  const pageStyle = darkMode ? "bg-black text-white" : "bg-white text-black";
  const cardStyle = darkMode ? "bg-zinc-900" : "bg-red-900";
  const inputStyle = darkMode
    ? "bg-zinc-800 border-gray-700"
    : "bg-white border-gray-300";
  const resultBoxStyle = darkMode
    ? "bg-blue-950 border-blue-800"
    : "bg-blue-50 border-blue-200";

  return (
    <div className={`min-h-screen ${pageStyle} flex items-center justify-center p-4 transition-colors duration-500`}>
      {/* Toast container */}
      <Toaster position="top-center" />

      <div className={`w-full max-w-2xl ${cardStyle} border border-black-700 shadow-lg rounded-3xl p-8 space-y-6 transition-all duration-500`}>
        {/* Header with toggle */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">📊 Business Dashboard</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm px-3 py-1 bg-gray-300 rounded-xl dark:bg-gray-700"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Business Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Business Name"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputStyle}`}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputStyle}`}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Display Card */}
        {businessData && (
          <div className={`p-6 rounded-2xl shadow-inner space-y-3 transition-all duration-500 ${resultBoxStyle}`}>
            <p className="text-xl font-medium">
              ⭐ Google Rating: <span className="font-bold">{businessData.rating}</span>
            </p>
            <p>📝 Total Reviews: {businessData.reviews}</p>
            <p className="text-green-400 font-semibold">💡 SEO Headline: {businessData.headline}</p>
            <button
              onClick={regenerateHeadline}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
            >
              🔄 Regenerate SEO Headline
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
