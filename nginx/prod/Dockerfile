FROM nginx


RUN rm /etc/nginx/conf.d/*

# WORKDIR /usr/src/sveltekit-app/nginx/dev

## TODO: Creates .conf file from template with ENV variables and replace
# ERR: ./default.conf.template not such file
# RUN envsubst < ./default.conf.template > /etc/nginx/conf.d/default.conf


# NGINX config file
COPY ./default.conf /etc/nginx/conf.d/


# Expose the listening port
EXPOSE 80


## Launch NGINX
# Be sure to include '-g daemon off;' in order for nginx to stay in the foreground,
# so that Docker can track the process properly
# (otherwise your container will stop immediately after starting)!

CMD [ "nginx", "-g", "daemon off;" ]
