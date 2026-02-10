import React from "react";
import { resumeService } from "../services/api";

const DatabaseStats = ({ onReset }) => {
	const handleReset = async () => {
		if (
			window.confirm(
				"Are you sure? This will permanently delete all indexed resumes from the Endee Engine. This action cannot be undone."
			)
		) {
			try {
				await resumeService.deleteAll();
				onReset(); // Clears results and UI state in App.jsx
				alert("Database successfully wiped and re-initialized.");
			} catch (err) {
				console.error("Reset failed:", err);
				alert(
					"Failed to clear database. Check if the Endee Engine is running."
				);
			}
		}
	};

	return (
		<div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between shadow-sm">
			<div className="flex items-center gap-4">
				<div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl">
					⚙️
				</div>
				<div>
					<h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">
						Index Management
					</h4>
					<p className="text-xs text-slate-500">
						Wipe the current vector batch to start fresh.
					</p>
				</div>
			</div>

			<button
				onClick={handleReset}
				className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all active:scale-95 group shadow-sm"
			>
				<span className="group-hover:rotate-12 transition-transform">🗑️</span>
				Clear All resumes
			</button>
		</div>
	);
};

export default DatabaseStats;
