---
{
	"title": "Developing for GCWeb",
	"language": "fr",
	"description": "Instructions sur comment développer pour le thème de Canada.ca.",
	"altLangPage": "developing-en.html",
	"dateModified": "2021-12-03"
}
---

__[Needs translation]__

Install NodeJS

## Building GCweb

* Build a local development version: `grunt` or `grunt debug`
* Run code quality check: `grunt test`
* Build production files: `grunt dist`
* Compile and assemble méli-mélo:
	* Run local: `grunt méli-mélo`
	* Run from compiled dist: `grunt méli-mélo-runLocal`
	* Run from wet-boew sites : `grunt méli-mélo-remote`
* Regenerate site web content: `grunt site-contents`
	* `_data/components.json`
	* `_data/sites.json`
	* `_data/templates.json`
	* `_wetboew-demos/**`

## Run GCWeb wetsite locally

Ensure that you have builded GCWeb first

After your are running docking container or the docker composer you will be able to access your local website at: `http://localhost:4000`

Build Dockerfile locally

```
docker build -t jekyll-with-env-options .
```

Run your image
```
grunt debug

docker run -it --rm -v "$PWD":/usr/src/app -p "4000:4000" --env JEKYLL_OPTIONS='--config _config.yml,_localJekyll.yml' jekyll-with-env-options
```

### alternative with docker-compose

This version leverage the remote theme wet-beoew/gcweb-jekyll. This equivalent if you run with gh-pages through your own GCWeb repository.

```
grunt debug
docker-compose up
```

First time run: `docker-compose up --build`

## Run the continous integration and deployment script locally

Install ACT - [https://github.com/nektos/act](https://github.com/nektos/act)

Github fork needed:

* [wet-boew/gcweb](https://github.com/wet-boew/gcweb)
* [wet-boew/gcweb-jekyll](https://github.com/wet-boew/gcweb-jekyll)
* [wet-boew/gcweb-compiled-demos](https://github.com/wet-boew/gcweb-compiled-demos)
* [wet-boew/themes-dist](https://github.com/wet-boew/themes-dist)
* [wet-boew/themes-cdn](https://github.com/wet-boew/themes-cdn)

Run the continuous deployment script

```
act -f deploy-gcweb -s my_token=<XXXXXXXXXXXXXX> -s my_username="<GITHUB USERNAME>" - my_email="<GITHUB HANDLE>@users.noreply.github.com" -a <GITHUB HANDLE>
```

Where:
* `<GITHUB USERNAME>`: Your name, like "John Doe"
* `<GITHUB HANDLE>`: Your github id
* `<XXXXXXXXXXXXXX>`: Your personal access token with access to public repository

### Run additional CI test locally

Pre-requites

```
grunt debug
docker-compose up

```

HTML link checker


```
docker exec -i gcweb_jekyll rake
```

Bootlint test

```
grunt bootlint
```

HTML lint

```
grunt htmllint:all
```

## Build demo files

Run the following command to generate files for a demo on https://github.com/ServiceCanada/wet-boew-demos where `[branchName]` refers to the branch name where your demo is hosted.

`grunt demo --branch=[branchName]`

## Refresh your github pages with the latest theme changes

You can make a commit to your site and it will get regenerated with the latest version of the jekyll theme. Alternatively, the following curl command will told github to regenerate your site.

```
curl -u <GITHUB HANDLE>:<XXXXXXXXXXXXXX> -X POST https://api.github.com/repos/<GITHUB HANDLE>/<GITHUB REPOSITORY>/pages/builds
```

Where:
* `<GITHUB HANDLE>`: Your github id
* `<XXXXXXXXXXXXXX>`: Your personal access token with access to public repository
* `<GITHUB REPOSITORY>`: Your web site github repository, like "jekyll-website"

Note: A manual update is required if you have specified a version for your jekyll remote theme in your `config.yml` file.

## Contribuer à GCWeb

Lorsque vous effectuez des correctifs ou améliorations à GCWeb, tels que la correction d'un bogue ou l'ajout d'une fonctionnalité, il pourrait être intéressant pour toutes et tous de contribuer au projet afin que tous les implémentations de GCWeb puissent en bénéficier. Pour ce faire, veuillez consulter les [lignes directrices de contribution de GCWeb](https://github.com/wet-boew/GCWeb/blob/master/CONTRIBUTING.md#comment-contribuer).
