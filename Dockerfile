FROM balenalib/raspberry-pi-debian-node:10
RUN [ "cross-build-start" ]

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json

RUN npm install -g node-gyp
RUN apt-get update && apt-get install python3 bluetooth bluez libbluetooth-dev libudev-dev make build-essential
RUN npm install

COPY . .

CMD ["npm", "start"]
RUN [ "cross-build-end" ]