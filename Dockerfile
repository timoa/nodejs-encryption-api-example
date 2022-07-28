FROM node:16.16.0-alpine3.15@sha256:aadf41f226e70cd7a691f993cc6ff851c299c4cbc959512643ced5a5e8fb5c51
ARG appPort=3000
# ARG microScannerToken

LABEL maintainer="Damien Laureaux <d.laureaux@timoa.com>" \
      org.label-schema.vendor="Timoa" \
      org.label-schema.name="Node.js encryption API example" \
      org.label-schema.description="Node.js encryption API example" \
      org.label-schema.url="https://timoa.com" \
      org.label-schema.vcs-url="https://github.com/timoa/nodejs-encryption-api-example" \
      org.label-schema.version=latest \
      org.label-schema.schema-version="1.0"

RUN \
      apk --no-cache update && \
      apk --no-cache upgrade && \
      apk add --no-cache ca-certificates && update-ca-certificates && \
      rm -rf /var/cache/apk/* && \
      npm install -g npm@latest && \
      mkdir -p /opt/app && \
      adduser -S app-user

# Aquasec MicroScanner support
# Search vulnerabilities under the source container
# Get an API token (free): https://microscanner.aquasec.com/signup
# Project: https://github.com/aquasecurity/microscanner

# ADD https://get.aquasec.com/microscanner /
# RUN chmod +x /microscanner && \
#   /microscanner ${microScannerToken} && \
#   echo "No vulnerabilities! " && \
#   date

WORKDIR /opt/app/
COPY ./package.json ./
COPY ./src ./src

HEALTHCHECK --interval=15s --timeout=5s --start-period=30s \
      CMD npm run docker:status

RUN \
      npm install --production --unsafe-perm && \
      npm cache clean --force

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait

RUN chmod +x /wait && chown -R app-user /opt/app
USER app-user

EXPOSE ${appPort}
CMD /wait && npm start
