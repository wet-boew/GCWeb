# Base on: Starefossen/docker-github-pages

FROM starefossen/ruby-node:2-6-alpine

ENV GITHUB_GEM_VERSION 227
ENV JSON_GEM_VERSION 2.6.2

RUN apk --update add --virtual build_deps \
    build-base ruby-dev libc-dev linux-headers \
  && gem update --system \
  && gem install --verbose --no-document \
    json:${JSON_GEM_VERSION} \
    github-pages \
    jekyll-github-metadata \
    minitest \
  && gem install rake html-proofer \
  && apk del build_deps \
  && apk add git \
  && mkdir -p /usr/src/app \
  && rm -rf /usr/lib/ruby/gems/*/cache/*.gem

#     github-pages:${GITHUB_GEM_VERSION} \

WORKDIR /usr/src/app

EXPOSE 4000 80
CMD rm -f /usr/src/app/Gemfile.lock /usr/src/app/.jekyll-metadata && cp -rf /usr/src/app/_includes/* /usr/src/app/~jekyll-dist/_includes/ &&  cp -rf /usr/src/app/_layouts/* /usr/src/app/~jekyll-dist/_layouts/ && jekyll serve -d /_site --watch --force_polling -H 0.0.0.0 -P 4000 --config _config.yml,_localJekyll.yml
