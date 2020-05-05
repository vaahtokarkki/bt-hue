FROM balenalib/raspberry-pi-debian-node:10

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json

RUN apt-get update && apt-get install python3 bluetooth bluez libbluetooth-dev libudev-dev

RUN npm install

COPY . .

CMD ["npm", "start"]
