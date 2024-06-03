# AVENGERS (simplified IMDB for Avengers-related movies)

## Author's context:
Before this, I had 2 positive experiences with Django and 3 failures with REACT. 
I rushed through my first REACT/Express project with a To-Do list and didn't fully comprehend how REACT works.
Then I tried to make Hangman with the MERN stack. It worked locally but I couldn't get it to deploy because I didn't understand all the pieces.
Most recently, I tried to make a Trello clone with REACT frontend and Django backend. In hindsight, I tried to learn too many new things at once

For this reason, I started this project with 2 guiding principles in mind A) don't mix frameworks. Keep this full MERN or full PERN. B) Keep the scope simple and make the pages mostly static at first.

## What I built:
Kind of a movie database for Marvel's Avengers (both movies and individual actors).

#### Database (MongoDB):
- 1st collection/table (words):
    
#### Frontend:
- REACT displays 1 underscore for each hidden character in the randomly selected mystery word.
    
#### Backend:
- Express is summoning words from the database

## Live:
A live demo now hosted on <b>Heroku</b> at [https://hangman-mern-bdd4a2d0c0d1.herokuapp.com/](https://hangman-mern-bdd4a2d0c0d1.herokuapp.com/)

Here is a list of users and their passwords:

adam (admin): testaccount 
betsy: testaccount
charlie: testaccount
david: testaccount


## New technical achievements:
>**EXPRESS:**
Up until now, the only backend framework I had used was Django.

>**JSON:**
Express uses SQL pulls to get values out of a database, and then returns it in an intuitive format, but still in a format I had never seen before. I didn't know what "JSON" meant until this project.

>**REACT:**
Understanding the pre-made and comprehensive purpose of leveraging ViewSet vs. singleton, custom views.

>**REACT Router:**
This is a separate package that is basically urls.py in Django.

>**BEAUTIFULSOUP4 & REQUESTS:**
Python library being used for web scraping. REQUESTS library used to pull data for Beautiful Soup.




## Potential improvements:
>**USER MANAGEMENT:**<br>
If people can log in, they can start having user-specific requests like favorites or upvotes.<br>

>**PAGINATION:**<br>
Let's pretend there were 100 MCU movies eventually, and I didn't want them all in one page. I might limit a page to 4 columns, 5 rows, and make each block of 20 cells its own page.<br>



## Learnings:
- A database like Postgres can store images, but you shouldn't do it because it's designed to be fast for structured data, not images. There could be financial cost disparities too. Better to just keep it in a static_media folder
- When you install something, depedencies are automatically added to the package.json file. In Django, you need to add manually.
- You might have to sort data in the SQL pull/API endpoint instead of counting on REACT to do the heavy lifting
- The idea of web-scraping isn't something I considered until the middle of the project. It wasn't so bad to download movie posters, but the idea of putting them in a certain file path tree sounded tedious and annoying, so that pointed me to BeautifulSoup.
- Python already has a "quote_plus" function for encoding strings into search URLs