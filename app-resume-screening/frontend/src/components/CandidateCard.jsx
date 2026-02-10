import React from "react";

const CandidateCard = ({ candidate }) => {
	// Convert score (0.0 - 1.0) to percentage
	const matchScore = Math.round((candidate.score || 0) * 100);
	const metadata = candidate.metadata || {};

	return (
		<div className="group bg-white border border-slate-200 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
			<div className="flex-1">
				{/* Header & Status */}
				<div className="flex items-center gap-3 mb-3">
					<h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
						{metadata.filename || "Anonymous Candidate"}
					</h3>
					<span className="bg-green-50 text-green-700 text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-wider">
						Ready to Hire
					</span>
				</div>

				{/* Location & Experience */}
				<div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-slate-500 mb-4">
					<span className="flex items-center gap-1.5 font-medium">
						<span className="text-slate-400">📍</span>{" "}
						{metadata.detected_location || "Not Specified"}
					</span>
					<span className="flex items-center gap-1.5 font-medium">
						<span className="text-slate-400">💼</span>{" "}
						{metadata.years_of_experience || "Exp. Hidden"}
					</span>
				</div>

				{/* Skills Tags */}
				<div className="flex flex-wrap gap-2">
					{metadata.skills ? (
						metadata.skills
							.split(",")
							.slice(0, 6)
							.map((skill, index) => (
								<span
									key={index}
									className="bg-slate-50 text-slate-600 border border-slate-100 text-xs px-3 py-1 rounded-lg font-semibold"
								>
									{skill.trim()}
								</span>
							))
					) : (
						<span className="text-xs text-slate-400 italic">
							No skills extracted
						</span>
					)}
				</div>
			</div>

			{/* Score Visualization */}
			<div className="flex flex-col items-center md:items-end gap-2 w-full md:w-32 bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-xl">
				<div className="text-4xl font-black text-slate-900">
					{matchScore}
					<span className="text-lg text-blue-600">%</span>
				</div>
				<div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
					<div
						className="h-full bg-blue-600 transition-all duration-1000"
						style={{ width: `${matchScore}%` }}
					></div>
				</div>
				<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
					Similarity
				</span>
			</div>
		</div>
	);
};

export default CandidateCard;
