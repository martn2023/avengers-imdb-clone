# AVENGERS (simplified IMDB for Avengers-related movies)

## Author's context:
So far, I have 3 django and 1 MERN project under my built. The challenge is to combine 2 frameworks: Django for backend and REACT for frontend.

## What I built:
A simplified version of JIRA (more like Trello really).

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
>**ViewSet:**
Understanding the pre-made and comprehensive purpose of leveraging ViewSet vs. singleton, custom views.

> 



## Potential improvements:
>**DRAG AND DROP:**<br>
A more user-friendly front-end experience where you can move tasks between stages with your mouse.<br>

>**MULTI-TENANCY:**<br>
This assumes one user organization - could not sell this product beyond first customer<br>



## Learnings:
- When you see "DYNO", that's specific to Heroku
- In the MERN project, we made API endpoints for the Express backend to feed info to the REACT frontend. Here, we are using Django REST framework to help Postgres feed into Django and then feed into REACT.
- You need serializer code to convert Django objects into JSON format for REACT consumption
- Said serializer code is often placed in a separate file lateral to the models.py, NOT inside the models.py
- Serializer code has no return/output code. It ways for an HTTP request to feed into a views.py, then the views.py leverages seralizers.py to convert Django model to JSON
- In Django, ViewSet is a beefier version of View because it has full CRUD functions woven in, whereas in a View, you would have to manually code out a "get" and "post". This works if the CRUD is predictable and SRP is not paramount.
- Even though all modules are lateral to each other, Django will know which module is "project-level" because of settings.py and because manage.py calls it out
- Need CORS to facilitate link from REACT to Django