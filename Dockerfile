FROM node:23.6-bookworm-slim

LABEL version="1.0.6.1"
LABEL repository="https://github.com/zjjfly/hexo-action"
LABEL homepage="https://zjjfly.github.io"
LABEL maintainer="zjjfly <zjjfly@gmail.com>"

COPY entrypoint.sh /entrypoint.sh
COPY sync_deploy_history.js /sync_deploy_history.js

RUN apt-get update > /dev/null && \
    DEBIAN_FRONTEND=noninteractiv apt-get install -y --no-install-recommends apt-utils > /dev/null && \
    apt-get install -y git git-lfs openssh-client > /dev/null &&\
    npm install -g npm@11.0.0 > /dev/null && \
    npm install -g hexo-cli > /dev/null && \
    chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
