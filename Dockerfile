
ARG RUBY_VERSION=2.7.3
FROM ruby:$RUBY_VERSION

RUN apt-get update \
  && apt-get install -y \
    git \
    locales \
    make \
    nodejs \
  && gem update --system \
  && gem install --verbose --no-document \
    json \
    github-pages \
    jekyll-github-metadata \
    minitest \
  && gem install rake html-proofer \
  && mkdir -p /usr/src/app \
  && rm -rf /usr/lib/ruby/gems/*/cache/*.gem

WORKDIR /usr/src/app

EXPOSE 4000 80
CMD rm -f /usr/src/app/Gemfile.lock /usr/src/app/.jekyll-metadata && cp -rf /usr/src/app/_includes/* /usr/src/app/~jekyll-dist/_includes/ &&  cp -rf /usr/src/app/_layouts/* /usr/src/app/~jekyll-dist/_layouts/ && jekyll serve -d /_site --watch --force_polling -H 0.0.0.0 -P 4000 --config _config.yml,_localJekyll.yml
