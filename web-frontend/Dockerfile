FROM node:10.9.0
ENV HOME=/app

COPY package.json $HOME/
WORKDIR $HOME
RUN npm config set loglevel warn
RUN npm install

CMD ["npm", "run", "hmr"]
