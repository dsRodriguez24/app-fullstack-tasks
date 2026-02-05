FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    zlib1g-dev \
    libonig-dev \
    curl \
    zip \
    supervisor \
  && docker-php-ext-install pdo pdo_pgsql mbstring zip exif pcntl

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy composer files first for better layer caching
COPY composer.json composer.lock* /var/www/html/
RUN composer install --no-dev --optimize-autoloader --no-interaction || true

# Copy application
COPY . /var/www/html

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache || true

EXPOSE 9000

CMD ["php-fpm"]
