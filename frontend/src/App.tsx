import { useState, useEffect} from "react";
import type {ChangeEvent } from "react";

interface SalesSummary {
  id: string;
  timestamp: string;
  totalRecords: number;
  totalQuantity: number;
  totalRevenue: number;
}

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [summaries, setSummaries] = useState<SalesSummary[]>([]);
  const [selected, setSelected] = useState<SalesSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSummaries = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/sales-summaries");
      const data = await res.json();
      setSummaries(data);
    } catch (err) {
      console.error("Failed to load summaries:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  const handleUpload = async () => {
    if (!file) return setStatus("Select a CSV file");

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    setStatus("Uploading...");

    try {
      const res = await fetch("http://localhost:8080/upload-sales-data", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("Upload successful");
        await fetchSummaries();
      } else {
        const data = await res.json();
        setStatus(`Upload failed: ${data.message}`);
      }
    } catch (err: any) {
      setStatus(`Upload error: ${err.message}`);
    } finally {
      setFile(null);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          CSV Sales Summary Dashboard
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            type="file"
            accept=".csv"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFile(e.target.files?.[0] ?? null)
            }
            className="border border-gray-800 rounded px-3 py-2 w-full sm:w-auto"
          />
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className={`px-6 py-2 rounded text-white transition ${
              loading || !file
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Uploading..." : "Upload CSV"}
          </button>
        </div>

        {status && (
          <div
            className={`text-sm mb-6`}
          >
            {status}
          </div>
        )}

        <h2 className="text-xl font-semibold mb-3">Uploaded Files</h2>
        {summaries.length === 0 ? (
          <p className="text-gray-600 italic">No uploads yet.</p>
        ) : (
          <table className="w-full border text-sm mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Upload ID</th>
                <th className="border p-2">Timestamp</th>
                <th className="border p-2">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {summaries.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelected(s)}
                >
                  <td className="border p-2">{s.id}</td>
                  <td className="border p-2">{s.timestamp}</td>
                  <td className="border p-2">${s.totalRevenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selected && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded shadow">
            <h3 className="text-lg font-bold text-blue-700 mb-2">
              Upload Details
            </h3>
            <p><strong>ID:</strong> {selected.id}</p>
            <p><strong>Timestamp:</strong> {selected.timestamp}</p>
            <p><strong>Total Records:</strong> {selected.totalRecords}</p>
            <p><strong>Total Quantity:</strong> {selected.totalQuantity}</p>
            <p><strong>Total Revenue:</strong> ${selected.totalRevenue.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}