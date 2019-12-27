FROM php:7.4.1-fpm-buster

RUN apt-get update && apt-get install -y \
            libxml2-dev \
            nano \
            bash \
            libpq-dev \
            ssh \
            apt-transport-https \
            ca-certificates \
            curl \
            gnupg2 \
            software-properties-common \
            && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -

RUN add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"

RUN apt-get update && \
    apt-get install -y \
    docker-ce \
    docker-ce-cli \
    containerd.io && \
    rm -rf /var/lib/apt/lists/*

# Extension PHP
RUN docker-php-ext-install -j$(nproc) \
    opcache \
    sockets \
    bcmath

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /home/www/dockertron

COPY api /home/www/dockertron/api
COPY .docker/php/config/php.ini /usr/local/etc/php/conf.d/php.ini
COPY .docker/php/config/php-fpm.conf  /usr/local/etc/php-fpm.conf
