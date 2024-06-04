import requests
from urllib.parse import quote_plus
from bs4 import BeautifulSoup

# Example movie name
movie_name = "Thor 2: The Dark World"
print("Original movie name:", movie_name)

base_url = 'https://www.themoviedb.org/search?query='
print("Base URL:", base_url)


def construct_search_url(movie_name):
    print("ATTEMPTING TO RUN: construct_search_url")
    print("Original movie name in function:", movie_name)

    encoded_movie_name = quote_plus(movie_name)
    print("Encoded movie name:", encoded_movie_name)

    full_url = f"{base_url}{encoded_movie_name}"
    print("construct_search_url RETURNING:", full_url)
    return full_url


#print("Calling construct_search_url with movie name:", movie_name)
search_url = construct_search_url(movie_name)
#print(f"Search URL: {search_url}")

print("Making request to the constructed URL")
response = requests.get(search_url)
print("HTTP Status Code:", response.status_code)

print(response.text)

print("Parsing HTML content with BeautifulSoup")
soup = BeautifulSoup(response.text, 'html.parser')
print("here comes the soup!")
print(soup)


def find_movie_details_page_url(soup):
    print("ATTEMPTING TO RUN: find_movie_details_page_url")

    # Adjusting the selector to find the first movie result's details page URL
    movie_link = soup.find('a', {'class': 'result'})

    if movie_link:
        details_page_url = "https://www.themoviedb.org" + movie_link['href']
        print("Movie details page URL FOUND:", details_page_url)
        return details_page_url
    else:
        print("Movie details page URL NOT FOUND")
        return None


print("Calling find_movie_details_page_url with the soup")
movie_details_page_url = find_movie_details_page_url(soup)
print(f"Movie details page URL: {movie_details_page_url}")


# code to teach ChatGPT what this movie details page looks like, so we can figure out how to leverage BeautifulSoup better
if movie_details_page_url:
    # Make request to the movie details page URL
    details_response = requests.get(movie_details_page_url)
    print("HTTP Status Code (details page):", details_response.status_code)

    # Print the HTML content of the movie details page for inspection
    print(details_response.text)
else:
    print("Movie details page URL is None. Cannot proceed.")