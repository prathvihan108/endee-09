import React from "react";
import { resumeService } from "../services/api";

const FileUpload = ({ onUploadSuccess, loading, setLoading }) => {
	const handleFileChange = async (e) => {
		const files = e.target.files;
		if (!files.length) return;

		setLoading(true);
		try {
			const response = await resumeService.uploadBatch(files);
			onUploadSuccess(response.data.total_processed);
			// alert(`Successfully processed ${response.data.total_processed} files.`);
		} catch (err) {
			console.error("Upload failed:", err);
			alert("Upload failed. Ensure backend is running.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden h-full">
			<div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -mr-16 -mt-16"></div>

			<h3 className="text-xl font-bold mb-2">Ingest Resumes</h3>
			<p className="text-slate-400 text-sm mb-6">
				PDFs are sanitized via PII scanner before ingestion.
			</p>

			<label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl p-10 hover:border-blue-500 hover:bg-slate-800 transition-all cursor-pointer group">
				<div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
					{loading ? "⏳" : "📂"}
				</div>
				<span className="font-semibold text-slate-300">
					{loading ? "Vectorizing..." : "Select Batch PDFs"}
				</span>
				<input
					type="file"
					multiple
					accept=".pdf"
					hidden
					onChange={handleFileChange}
					disabled={loading}
				/>
			</label>
		</div>
	);
};

export default FileUpload;
