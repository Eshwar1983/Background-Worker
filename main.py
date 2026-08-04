import os
import requests
import logging

# Set up logging to view outputs in Render logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fetch_crypto_data():
    url = "https://coingecko.com"
    
    try:
        logger.info("Fetching data from API...")
        response = requests.get(url, timeout=10)
        response.raise_for_status() # Raise error for bad status codes
        
        data = response.json()
        btc_price = data["bitcoin"]["usd"]
        
        logger.info(f"Successfully fetched data! Current BTC Price: ${btc_price} USD")
        
        # Optional: Save to a database or external cloud storage here
        
    except requests.exceptions.RequestException as e:
        logger.error(f"An error occurred: {e}")

if __name__ == "__main__":
    fetch_crypto_data()
