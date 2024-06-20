FROM php:8.1.5-fpm

# Instalando dependências necessárias
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim unzip git curl \
    nodejs npm

# Instalando extensões PHP necessárias
RUN docker-php-ext-install pdo_mysql exif pcntl bcmath gd

# Instalando Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Setando o diretório de trabalho
WORKDIR /var/www

# Copiando arquivos da aplicação
COPY . .

# Instalando dependências do Composer
RUN composer install

# Instalando dependências do npm
RUN npm install

# Ajustando permissões
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
