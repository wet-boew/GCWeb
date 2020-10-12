FROM ruby:2.7

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get update -qq && apt-get install -qq --no-install-recommends nodejs && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y openjdk-11-jre-headless && apt-get clean;

WORKDIR /gcweb

COPY . /gcweb/

RUN npm install -g grunt-cli bower && npm install

# Next 3 lines fix a bug in node-sass in the WET-BOEW dependency will be fix
WORKDIR /gcweb/node_modules/wet-boew
RUN npm install && grunt dist
WORKDIR /gcweb

RUN gem install rake html-proofer

RUN grunt dist && grunt server
