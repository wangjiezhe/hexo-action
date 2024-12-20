FROM node:20.2.0-buster-slim

LABEL version="1.0.6"
LABEL repository="https://github.com/zjjfly/hexo-action"
LABEL homepage="https://zjjfly.github.io"
LABEL maintainer="zjjfly <zjjfly@gmail.com>"

COPY entrypoint.sh /entrypoint.sh
COPY sync_deploy_history.js /sync_deploy_history.js

RUN apt-get update > /dev/null && \
    apt-get install -y git git-lfs openssh-client > /dev/null &&\
    npm install -g npm@9.6.7 > /dev/null && \
    npm install -g hexo-cli > /dev/null && \
    chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
