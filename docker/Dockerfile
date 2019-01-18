FROM kinkeepers/rails-base

WORKDIR /usr/src/app

RUN mkdir log storage tmp

ADD . /usr/src/app

VOLUME /usr/src/app/storage

RUN gem install bundler
RUN bundle install --deployment --without development test
RUN bundle exec rake assets:precompile RAILS_ENV=production

CMD [ "/bin/bash", "docker/bootstrap.sh" ]




