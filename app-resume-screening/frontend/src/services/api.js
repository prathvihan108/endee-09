import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:8000",
});

export const resumeService = {
	// 1. Upload multiple files
	uploadBatch: async (files) => {
		const formData = new FormData();
		Array.from(files).forEach((file) => formData.append("files", file));

		try {
			const response = await API.post("/upload-batch", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			return response;
		} catch (error) {
			console.error("Axios Error Object:", error.response || error);
			throw error;
		}
	},

	// 2. Semantic Search
	search: (query, topK = 5) => {
		return API.get("/search", { params: { query, top_k: topK } });
	},

	getStats: () => API.get("/stats"),

	deleteAll: () => API.delete("/reset"),
};
