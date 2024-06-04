import os
import requests
from urllib.parse import quote_plus
from bs4 import BeautifulSoup

# Function to construct the search URL for a movie
def construct_search_url(movie_name):
    base_url = 'https://www.themoviedb.org/search?query='
    encoded_movie_name = quote_plus(movie_name)
    full_search_url = f"{base_url}{encoded_movie_name}"
    return full_search_url

# Function to find the movie details page URL
def find_movie_details_page_url(soup):
    movie_link = soup.find('a', {'class': 'result'})
    if movie_link:
        details_page_url = "https://www.themoviedb.org" + movie_link['href']
        return details_page_url
    return None

# Function to get the high-res image URL from the movie details page
def get_high_res_image_url(details_soup):
    image_tag = details_soup.find('img', {'class': 'poster'})
    if image_tag:
        high_res_image_url = image_tag['src']
        return high_res_image_url
    return None

# Function to process a single movie entry
def process_movie(movie, downloaded_image_urls):
    movie_id = movie['id']
    movie_name = movie['title']

    print(f"Processing movie: {movie_name} (ID: {movie_id})")

    # Construct search URL and make a request
    search_url = construct_search_url(movie_name)
    response = requests.get(search_url)
    if response.status_code != 200:
        print(f"Failed to fetch search results for {movie_name}. Status code: {response.status_code}")
        return

    soup = BeautifulSoup(response.text, 'html.parser')
    movie_details_page_url = find_movie_details_page_url(soup)
    if not movie_details_page_url:
        print(f"Movie details page URL not found for {movie_name}")
        return

    # Make request to the movie details page URL
    details_response = requests.get(movie_details_page_url)
    if details_response.status_code != 200:
        print(f"Failed to fetch details page for {movie_name}. Status code: {details_response.status_code}")
        return

    details_soup = BeautifulSoup(details_response.text, 'html.parser')
    high_res_image_url = get_high_res_image_url(details_soup)
    if not high_res_image_url:
        print(f"High-res image URL not found for {movie_name}")
        return

    # Prepare the directory for the movie poster
    movie_folder_path = os.path.join('C:\\ReactProjects\\avengers-imdb\\frontend-react\\public\\images\\movies', str(movie_id))
    if not os.path.exists(movie_folder_path):
        os.makedirs(movie_folder_path)

    # Download and save the movie poster
    image_response = requests.get(high_res_image_url)
    if image_response.status_code == 200:
        image_path = os.path.join(movie_folder_path, f"movie_poster_{movie_id}.jpg")
        with open(image_path, 'wb') as f:
            f.write(image_response.content)
        print(f"Downloaded poster for {movie_name} at {image_path}")
        downloaded_image_urls.append(high_res_image_url)
    else:
        print(f"Failed to download image for {movie_name}. Status code: {image_response.status_code}")

# Main script execution
if __name__ == "__main__":
    # Fetching movie data from the API endpoint
    response = requests.get('http://localhost:3000/browse-movies/')
    if response.status_code == 200:
        movie_list = response.json()
    else:
        print(f"Failed to fetch movie data from API. Status code: {response.status_code}")
        movie_list = []

    # List to keep track of downloaded image URLs
    downloaded_image_urls = []

    # Loop through each movie and process it
    for movie in movie_list:
        process_movie(movie, downloaded_image_urls)

    # Print the list of downloaded image URLs
    print("Downloaded image URLs:")
    for url in downloaded_image_urls:
        print(url)

    print("Process completed.")