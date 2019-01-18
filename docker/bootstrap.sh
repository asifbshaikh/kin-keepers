#!/bin/bash

cd /usr/src/app
export RAILS_ENV="production"
bundle exec rake db:migrate && bundle exec passenger start
