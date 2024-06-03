import requests
from urllib.parse import quote_plus

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

    # Encode the movie name for URL
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

# optional code I might toss after some dev work
print("Response content length:", len(response.text))
print(response.text[:1000])  # Print only the first 1000 characters for brevity
