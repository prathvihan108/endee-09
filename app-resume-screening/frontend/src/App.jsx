import React, { useState, useEffect } from "react";
import { resumeService } from "./services/api";
import SearchBar from "./components/SearchBar";
import FileUpload from "./components/FileUpload";
import CandidateCard from "./components/CandidateCard";
import DatabaseStats from "./components/DatabaseStats";

function App() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [uploadStatus, setUploadStatus] = useState(0);
	const [loading, setLoading] = useState(false);
	const [dbCount, setDbCount] = useState(0);

	const fetchStats = async () => {
		try {
			const res = await resumeService.getStats();
			setDbCount(res.data.total_documents);
		} catch (err) {
			console.error("Stats fetch failed");
		}
	};
	useEffect(() => {
		fetchStats();
	}, []);

	// Logic for searching
	const handleSearch = async () => {
		if (!query) return;
		setLoading(true);
		try {
			const response = await resumeService.search(query);
			setResults(response.data.results);
		} catch (err) {
			console.error("Search failed:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleUploadSuccess = async (count) => {
		setUploadStatus((prev) => prev + count);

		setTimeout(async () => {
			await fetchStats();
		}, 800);
	};

	return (
		<div className="min-h-screen bg-[#fdfdfd] text-slate-900 font-sans selection:bg-blue-100">
			{/* Nav Bar */}
			<nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
				<div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
							AI
						</div>
						<span className="text-xl font-bold tracking-tight text-slate-800">
							Resume-Screening <span className="text-blue-600">App</span>
						</span>
					</div>
					<div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
						Endee Labs Engine v1.0
					</div>
				</div>
			</nav>

			<main className="max-w-6xl mx-auto px-6 py-12">
				{/* Hero / Input Section */}
				<div className="grid lg:grid-cols-2 gap-12 items-stretch mb-16">
					<div>
						<h1 className="text-5xl font-extrabold text-slate-900 leading-tight mb-8">
							Endee AI Recruiter
						</h1>
						<p className="text-lg text-slate-600 mb-8">
							Semantic search powered by local vector embeddings. All PII is
							redacted before ingestion for 100% compliance.
						</p>

						<SearchBar
							query={query}
							setQuery={setQuery}
							onSearch={handleSearch}
							loading={loading}
						/>
					</div>

					<FileUpload
						onUploadSuccess={handleUploadSuccess}
						loading={loading}
						setLoading={setLoading}
					/>
				</div>

				{/* Stats Bar */}
				<div className="mb-10">
					<DatabaseStats
						count={dbCount}
						onReset={() => {
							setDbCount(0);
							setResults([]);
						}}
					/>
				</div>

				{/* Results Section */}
				<section className="mt-12 space-y-6">
					<div className="flex items-center justify-between border-b border-slate-100 pb-4">
						<h2 className="text-2xl font-bold text-slate-800">
							Screening Results
						</h2>
						<div className="flex items-center gap-2">
							{results.length > 0 && (
								<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
							)}
							<span className="text-sm font-medium text-slate-500">
								{results.length} Candidates Found
							</span>
						</div>
					</div>

					<div className="grid gap-6">
						{results.length > 0 ? (
							results.map((candidate) => (
								<CandidateCard key={candidate.id} candidate={candidate} />
							))
						) : (
							<div className="py-24 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[40px] bg-slate-50/50">
								<div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl mb-4">
									🔍
								</div>
								<h3 className="text-slate-900 font-bold text-lg">
									No Results to Display
								</h3>
								<p className="text-slate-500 max-w-xs text-center mt-2">
									Enter a job description or skill set above to find the best
									matches from your Endee database.
								</p>
							</div>
						)}
					</div>
				</section>
			</main>
		</div>
	);
}

export default App;
