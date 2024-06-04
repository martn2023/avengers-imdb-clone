import os
import requests
from urllib.parse import quote_plus
from bs4 import BeautifulSoup

# Function to construct the search URL for an actor
def construct_search_url(actor_name):
    base_url = 'https://www.themoviedb.org/search?query='
    encoded_actor_name = quote_plus(actor_name)
    full_search_url = f"{base_url}{encoded_actor_name}"
    print(f"Constructed search URL: {full_search_url}")
    return full_search_url

# Function to find the actor details page URL
def find_actor_details_page_url(soup):
    actor_link = soup.find('a', {'class': 'result'})
    if actor_link:
        details_page_url = "https://www.themoviedb.org" + actor_link['href']
        print(f"Found actor details page URL: {details_page_url}")
        return details_page_url
    print("Actor details page URL not found in search results")
    return None

# Function to get the high-res image URL from the actor details page
def get_high_res_image_url(details_soup):
    image_tag = details_soup.find('img', {'class': 'profile'})
    if image_tag:
        high_res_image_url = image_tag['src']
        print(f"Found high-res image URL: {high_res_image_url}")
        return high_res_image_url
    print("High-res image URL not found on actor details page")
    return None

# Function to process a single actor entry
def process_actor(actor, downloaded_image_urls):
    actor_id = actor['id']
    actor_name = f"{actor['first_name']} {actor['last_name']}"

    print(f"Processing actor: {actor_name} (ID: {actor_id})")

    # Construct search URL and make a request
    search_url = construct_search_url(actor_name)
    response = requests.get(search_url)
    if response.status_code != 200:
        print(f"Failed to fetch search results for {actor_name}. Status code: {response.status_code}")
        return

    soup = BeautifulSoup(response.text, 'html.parser')
    actor_details_page_url = find_actor_details_page_url(soup)
    if not actor_details_page_url:
        print(f"Actor details page URL not found for {actor_name}")
        return

    # Make request to the actor details page URL
    details_response = requests.get(actor_details_page_url)
    if details_response.status_code != 200:
        print(f"Failed to fetch details page for {actor_name}. Status code: {details_response.status_code}")
        return

    details_soup = BeautifulSoup(details_response.text, 'html.parser')
    high_res_image_url = get_high_res_image_url(details_soup)
    if not high_res_image_url:
        print(f"High-res image URL not found for {actor_name}")
        return

    # Prepare the directory for the actor portrait
    actor_folder_path = os.path.join('C:\\ReactProjects\\avengers-imdb\\frontend-react\\public\\images\\actors', str(actor_id))
    if not os.path.exists(actor_folder_path):
        os.makedirs(actor_folder_path)
        print(f"Created directory: {actor_folder_path}")

    # Download and save the actor portrait
    image_response = requests.get(high_res_image_url)
    if image_response.status_code == 200:
        image_path = os.path.join(actor_folder_path, f"portrait_{actor_id}.jpg")
        with open(image_path, 'wb') as f:
            f.write(image_response.content)
        print(f"Downloaded portrait for {actor_name} at {image_path}")
        downloaded_image_urls.append(high_res_image_url)
    else:
        print(f"Failed to download image for {actor_name}. Status code: {image_response.status_code}")

# Main script execution
if __name__ == "__main__":
    # Fetching actor data from the API endpoint
    response = requests.get('http://localhost:3000/browse-actors/')
    if response.status_code == 200:
        actor_list = response.json()
        print(f"Fetched actor data: {actor_list}")
    else:
        print(f"Failed to fetch actor data from API. Status code: {response.status_code}")
        actor_list = []

    # List to keep track of downloaded image URLs
    downloaded_image_urls = []

    # Loop through each actor and process it
    for actor in actor_list:
        process_actor(actor, downloaded_image_urls)

    # Print the list of downloaded image URLs
    print("Downloaded image URLs:")
    for url in downloaded_image_urls:
        print(url)

    print("Process completed.")
