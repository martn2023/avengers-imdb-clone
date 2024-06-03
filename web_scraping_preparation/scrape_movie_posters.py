# python scrape_movie_posters.py

import requests
from urllib.parse import quote_plus
from bs4 import BeautifulSoup

# Example movie name
movie_name = "Thor 2: The Dark World"
print("Original movie name:", movie_name)

base_url = 'https://www.themoviedb.org/search?query='
print("Base URL:", base_url)

'''
Function to construct the full URL

SAMPLE_INPUT: Thor: The Dark World
DESIRED_OUTPUT: https://www.themoviedb.org/search?query=Thor+2%3A+The+Dark+World
'''


def construct_search_url(movie_name):
    print("ATTEMPTING TO RUN: construct_search_url")
    print("Original movie name in function:", movie_name)

    # quote_plus is the python's built-in command that is doing the magic of adding the + signs and %3A to replace colons
    encoded_movie_name = quote_plus(movie_name)
    print("Encoded movie name:", encoded_movie_name)

    # Construct the full URL
    full_url = f"{base_url}{encoded_movie_name}"
    print("construct_search_url RETURNING:", full_url)
    return full_url


print("Calling construct_search_url with movie name:", movie_name)
search_url = construct_search_url(movie_name)
print(f"Search URL: {search_url}")

# Optional: You can also make a request to check if the URL is correct and get the page content
print("Making request to the constructed URL")
response = requests.get(search_url)
print("HTTP Status Code:", response.status_code)

# optional code I might toss after some dev work\
print(response.text)  # removed the limiter of 1000 characters because we need to understand the code

# Parse the HTML content with BeautifulSoup's specific parser: html.parser
print("Parsing HTML content with BeautifulSoup")
soup = BeautifulSoup(response.text, 'html.parser')
print("here comes the soup!")
print(soup)


def get_movie_thumbnail_url(soup):
    print("ATTEMPTING TO RUN: get_movie_thumbnail_url")

    # The specific HTML structure and class names might need to be adjusted based on the actual HTML content of the page
    # Here we're assuming the image is within an 'img' tag inside a class 'poster'
    thumbnail = soup.find('img', {'class': 'poster'})

    if thumbnail:
        thumbnail_url = thumbnail['src']
        print("Thumbnail URL FOUND:", thumbnail_url)
        return thumbnail_url
    else:
        print("Thumbnail URL NOT FOUND")
        return None

print("Calling get_movie_thumbnail_url with the soup")
thumbnail_url = get_movie_thumbnail_url(soup)
print(f"Thumbnail URL: {thumbnail_url}")