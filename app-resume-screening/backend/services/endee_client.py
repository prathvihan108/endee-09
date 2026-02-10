import uuid
import requests
from endee import Endee, Precision

class EndeeClient:
    def __init__(self):
        self.client = Endee()
        self.index_name = "resumes" 
        self.base_url = "http://localhost:8080" 
        self.index = None
        self.initialize_collection()

    def initialize_collection(self):
        try:
            self.index = self.client.get_index(name=self.index_name)
        except Exception:
        
            self.client.create_index(
                name=self.index_name,
                dimension=384,
                space_type="cosine",
                precision="int8d"
            )
            self.index = self.client.get_index(name=self.index_name)

    def insert_resume(self, filename, vector, metadata):
        try:
            # Always use the already initialized self.index
            data_to_upsert = [{
                "id": str(uuid.uuid4()),  
                "vector": vector,         
                "meta": {                 
                    "filename": filename,
                    **metadata            
                }
            }]
            self.index.upsert(data_to_upsert)
            print(f"--- Success: {filename} uploaded to Endee Production! ---")
            return True
        except Exception as e:
            print(f"--- SDK Upsert Error for {filename}: {e} ---")
            return False

    def search_resumes(self, query_vector, top_k=5):
        try:
            # Passing ef=128 for better accuracy
            return self.index.query(
                vector=query_vector,
                top_k=top_k,
                ef=128,
                include_vectors=True
            )
        except Exception as e:
            print(f"--- Search Error: {e} ---")
            return []

    def check_health(self):
        try:
            response = requests.get(f"{self.base_url}/health", timeout=5)
            return response.status_code == 200
        except:
            return False