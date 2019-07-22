# lb-sdkでng5用サービスを生成
FROM node:10.9.0 as lbsdk
WORKDIR /app
COPY web-backend .
RUN rm -rf /app/node_modules
RUN npm config set loglevel warn
RUN npm install --devlopment
RUN npm run lbsdk

# ng5でフロントエンドをビルド
FROM node:10.9.0 as ng5
WORKDIR /app
COPY web-frontend .
RUN rm -rf /app/node_modules
RUN npm config set loglevel warn
RUN npm install
COPY --from=lbsdk /app/front/lb-sdk /app/lb-sdk
RUN ./node_modules/.bin/ng build --prod --source-map=false --build-optimizer false --aot false

# lbを余計なライブラリを入れずにインストール、これまでの成果物を用意
FROM node:10.9.0 as loopback
WORKDIR /app
COPY web-backend .
RUN rm -rf /app/node_modules
RUN npm config set loglevel warn
RUN npm install --production
COPY --from=ng5 /app/dist/client /app/client

CMD ["npm", "start"]