FROM public.ecr.aws/docker/library/node:18.16-alpine3.18
RUN mkdir /app
WORKDIR /app
ADD package.json /app
ADD . /app
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]