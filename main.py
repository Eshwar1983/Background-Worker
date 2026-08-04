import os
import sys
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, OperationFailure

def fetch_mongodb_data():
    # 1. Safely retrieve the connection URI from Render's environment
    mongo_uri = os.environ.get("mongodb+srv://eshwargowda19_db_user:DG6Pq4EMcwylcZK6@cluster0.8vevz6x.mongodb.net/?appName=Cluster0")
    
    if not mongo_uri:
        print("Error: MONGO_URI environment variable is not set.", file=sys.stderr)
        return

    try:
        # 2. Initialize the MongoDB Client
        client = MongoClient(mongo_uri)
        
        # 3. Access your database and collection (Replace with your actual names)
        db = client["school_db"]
        collection = db["students"]
        
        # 4. Fetch data
        print("Fetching data from MongoDB...")
        
        # Example A: Fetch just ONE document
        single_doc = collection.find_one()
        print("\n--- Single Document Result ---")
        print(single_doc)
        
        # Example B: Fetch ALL documents (with a limit to prevent memory overload)
        all_docs = collection.find().limit(10)
        print("\n--- Multiple Documents Result ---")
        for doc in all_docs:
            print(doc)
            
    except ConnectionFailure:
        print("Error: Failed to connect to the MongoDB server.", file=sys.stderr)
    except OperationFailure as e:
        print(f"Database operation failed: {e}", file=sys.stderr)
    except Exception as e:
        print(f"An unexpected error occurred: {e}", file=sys.stderr)
    finally:
        # 5. Clean up connection
        client.close()

if __name__ == "__main__":
    fetch_mongodb_data()
