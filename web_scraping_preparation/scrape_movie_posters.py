import os
import requests
from urllib.parse import quote_plus
from bs4 import BeautifulSoup

# Define the main directory for all movie posters
main_dir = 'frontend-react/public/images/movies'

# Create the main directory if it doesn't exist
if not os.path.exists(main_dir):
    os.makedirs(main_dir)


def construct_search_url(movie_name):
    encoded_movie_name = quote_plus(movie_name)
    full_search_url = f"https://www.themoviedb.org/search?query={encoded_movie_name}"
    return full_search_url


def find_movie_details_page_url(soup):
    movie_link = soup.find('a', {'class': 'result'})
    if movie_link:
        details_page_url = "https://www.themoviedb.org" + movie_link['href']
        return details_page_url
    else:
        return None


def get_high_res_image_url(details_soup):
    image_tag = details_soup.find('img', {'class': 'poster'})
    if image_tag:
        high_res_image_url = image_tag['src']
        return high_res_image_url
    else:
        return None


def download_image(url, save_path):
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(save_path, 'wb') as file:
            for chunk in response:
                file.write(chunk)
    else:
        print(f"Failed to download image from {url}")


def process_movie(movie):
    movie_id = movie['id']
    movie_title = movie['title']

    # Create a subdirectory for each movie using the movie ID
    movie_dir = os.path.join(main_dir, str(movie_id))
    if not os.path.exists(movie_dir):
        os.makedirs(movie_dir)
    else:
        # If the directory already exists, skip to the next movie
        print(f"Directory for movie {movie_title} already exists. Skipping.")
        return None

    # Move to the movie directory
    os.chdir(movie_dir)

    # Find the image URL
    search_url = construct_search_url(movie_title)
    response = requests.get(search_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    movie_details_page_url = find_movie_details_page_url(soup)

    if movie_details_page_url:
        details_response = requests.get(movie_details_page_url)
        details_soup = BeautifulSoup(details_response.text, 'html.parser')
        high_res_image_url = get_high_res_image_url(details_soup)
        if high_res_image_url:
            # Print the image URL
            print(f"High-res image URL for {movie_title}: {high_res_image_url}")

            # Download the image
            image_save_path = f"movie_poster_{movie_id}.jpg"
            download_image(high_res_image_url, image_save_path)
            return high_res_image_url
        else:
            print(f"High-res image URL not found for movie: {movie_title}")
            return None
    else:
        print(f"Movie details page URL not found for movie: {movie_title}")
        return None

    # Change back to the main directory
    os.chdir(main_dir)


# Fetch the movie data from the provided API endpoint
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
    image_url = process_movie(movie)
    if image_url:
        downloaded_image_urls.append(image_url)

# Print the list of downloaded image URLs
print("Downloaded image URLs:")
for url in downloaded_image_urls:
    print(url)

print("Process completed.")
