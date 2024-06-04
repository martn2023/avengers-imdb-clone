import os
import requests
from urllib.parse import quote_plus
from bs4 import BeautifulSoup

base_url = 'https://www.themoviedb.org/search?query='

def construct_search_url(movie_name):
    encoded_movie_name = quote_plus(movie_name)
    full_search_url = f"{base_url}{encoded_movie_name}"
    return full_search_url

def find_movie_details_page_url(soup):
    movie_link = soup.find('a', {'class': 'result'})
    if movie_link:
        details_page_url = "https://www.themoviedb.org" + movie_link['href']
        return details_page_url
    return None

def get_high_res_image_url(details_soup):
    image_tag = details_soup.find('img', {'class': 'poster'})
    if image_tag:
        high_res_image_url = image_tag['src']
        return high_res_image_url
    return None

def download_image(image_url, save_path):
    try:
        response = requests.get(image_url)
        response.raise_for_status()  # Check for HTTP request errors
        with open(save_path, 'wb') as f:
            f.write(response.content)
        print(f"Successfully downloaded: {save_path}")
    except Exception as e:
        print(f"Failed to download image from {image_url}: {e}")

def process_movie(movie, downloaded_image_urls):
    movie_id = movie['id']
    movie_title = movie['title']
    print(f"Processing movie: {movie_title}")

    search_url = construct_search_url(movie_title)
    response = requests.get(search_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        movie_details_page_url = find_movie_details_page_url(soup)
        if movie_details_page_url:
            details_response = requests.get(movie_details_page_url)
            if details_response.status_code == 200:
                details_soup = BeautifulSoup(details_response.text, 'html.parser')
                high_res_image_url = get_high_res_image_url(details_soup)
                if high_res_image_url:
                    folder_path = f'../frontend-react/public/images/movies/{movie_id}'
                    if not os.path.exists(folder_path):
                        os.makedirs(folder_path)
                    save_path = f'{folder_path}/movie_poster_{movie_id}.jpg'
                    download_image(high_res_image_url, save_path)
                    downloaded_image_urls.append(high_res_image_url)
                else:
                    print(f"No high-res image found for {movie_title}")
            else:
                print(f"Failed to fetch movie details page for {movie_title}")
        else:
            print(f"No details page URL found for {movie_title}")
    else:
        print(f"Failed to fetch search results for {movie_title}")

# Main script
response = requests.get('http://localhost:3000/browse-movies')
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
