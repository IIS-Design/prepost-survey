FROM nginx:alpine

RUN mkdir -p /usr/share/nginx/html/prepost-survey

COPY index.html /usr/share/nginx/html/prepost-survey/
COPY assets/ /usr/share/nginx/html/prepost-survey/assets/
COPY screens/ /usr/share/nginx/html/prepost-survey/screens/
COPY _health /usr/share/nginx/html/prepost-survey/_health
