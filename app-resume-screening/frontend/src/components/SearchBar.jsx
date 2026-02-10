import React from "react";

const SearchBar = ({ query, setQuery, onSearch, loading }) => {
	return (
		<div className="flex p-1 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 transition-focus-within ring-blue-500/20 focus-within:ring-4">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && onSearch()}
				placeholder="Search by skills, location, or experience..."
				className="flex-1 px-6 py-4 outline-none text-slate-700 bg-transparent placeholder:text-slate-400"
			/>
			<button
				onClick={onSearch}
				disabled={loading || !query}
				className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{loading ? (
					<span className="flex items-center gap-2">
						<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
						Searching
					</span>
				) : (
					"Find Candidates"
				)}
			</button>
		</div>
	);
};

export default SearchBar;
