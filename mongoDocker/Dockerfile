FROM mongo:3.6.3
ADD mongodb-setup.sh /tmp/mongodb-setup.sh
ADD schema-validator.js /tmp/schema-validator.js
RUN /tmp/mongodb-setup.sh
CMD ["mongod", "--auth", "--storageEngine", "wiredTiger", "--dbpath", "/var/data/db"]