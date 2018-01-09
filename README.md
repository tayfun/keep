# What is it?

Note taking app written in Django (for the backend/API) and ReactJS for the front-end.

# How to run it?

Make sure to set `PROJECT_NAME` environment variable as it is needed to find settings module and the directory wsgi.py should be searched.

    export PROJECT_NAME=keep

You can also add this to your virtualenv postactivate script so that you don't forget doing this:

    $ more ~/.virtualenvs/keep/bin/postactivate
    #!/bin/bash
    # This hook is sourced after this virtualenv is activated.
    export DJANGO_SETTINGS_MODULE=keep.settings_dev
    export PROJECT_NAME=keep

Django settings module import path is set in case you'd like to run the servers locally and not through docker.

## Local Way

Project was written and tested using Python 3.6. Best way to install this is using [pyenv](https://github.com/pyenv/pyenv). After installing Python 3.6, create a virtualenv and install requirements in there:

    pip install -r requirements.txt

After this, you can run Django server using:

    python manage.py runserver

This will serve your API. For the front-end, during development, it is best to use [create-react-app](https://github.com/facebookincubator/create-react-app) dev server which will take care of reloading your scripts and tell you when something's wrong. To run it, go inside `/keep/notes/templates/notes` directory which has static files for the web app and run:

    npm start

This will proxy API calls to Django's own server running on 8000, and you can reach SPA on the default port 3000. When you run `npm start`, it should automatically open your browser and show login page on [http://localhost:3000/](localhost).

## Docker Way

Running on Docker is extremely simple. Be sure that you have built the necessary javascript files with `npm run build` like in the [Local Way](#local-way) above. Make sure `PROJECT_NAME` is in environment (this is used in docker-compose files) and run:

    docker-compose up

You should see docker image being built using `Dockerfile` the first time you run this. Base image used for building is a slim alpine image (unfortunately `node_modules` takes up ~200 MB so the whole image ends up at ~260 MB).

You'll see uwsgi and nginx both start and you can reach the website at http://127.0.0.1/notes

# Tech Stack

This is using Django, sqlite, django-rest-framework for the backend and ReactJS with various npm packages for the frontend.

For application server, uwsgi is utilized and for the web server, nginx. The web server handles the static content whereas API requests are dispatched to uwsgi. A single docker container runs both servers.

# Deployment

Usual deployment setup is using the popular AWS ECS offering. `ecs-cli` tool greatly simplifies deployment to ECS. You just need a `docker-compose` file, push your images to a repository (I use Amazon ECR here) and it will run your containers for you.

To deploy we need to create a cluster (change variables to suit your needs). First, configure it:

    ecs-cli configure --region eu-west-1 --cluster keepapp

Now you should have configs in `~/.aws`. You can create the cluster now:

    ecs-cli up --keypair tayfun-aws --capability-iam --instance-type t2.micro --force

After this, we can deploy to this cluster:

    ecs-cli compose -f docker-compose-ecs.yml up


Trade-offs
==========

There's an endless number of options even for a project of small size. Here are the few choices I have made during development:

* Use react-bootstrap and corresponding React components or just use plain old bootstrap and HTML elements to use bootstrap styling? I've gone with the plain old HTML elements (inside JSX but not React components). I don't have any strong convictions on this and it was good to see the pros and cons of both approach.

* Tried to use latest ES6 language features such as scrollTo. For most of the features I assume babel will translate to compatible versions for older browsers.

* I had used browser alerts in the beginning to communicate with the user outcomes of various actions, but it wasn't user friendly. I thought about rolling my own alerts or using bootstrap's own or alternatively using a React compatible alert. In the end after evaluating a few strategies, I ended up using `react-alert` (which of course itself added about 1000 dependencies!).

* Used sqlite as a database which is itself actually pretty good for small projects. If the project grows and you need scalability or if you need extra functionality such GIS or JSON support, you should think about a proper database server such as PostgreSQL. As it is now though, sqlite which is bundled with Python, does the job extremely well.

* For scalability and modularity, it is better to split application and web server into separate docker images and run them separately. For this project though I have used a single alpine image for simplicity.

To-do
=====

These are some stuff I could have done rather easily:

* Add `node-modules` to `.dockerignore` file so for production, image sizes are much much smaller.

* There's no user registration page (I've used Django admin to create test users)

* The error messages definitely could be more user friendly. At the moment, I am simply showing Javascript error messages directly to the user without interpreting what they mean (eg. Status 400 instead of wrong username/password combination).
