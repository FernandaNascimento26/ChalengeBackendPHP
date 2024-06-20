#Imagem oficial do PHP como imagem base
FROM php:8.1.5-fpm

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl

# Instala extensões PHP necessárias
RUN docker-php-ext-install pdo_mysql exif pcntl bcmath gd

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define o diretório de trabalho
WORKDIR /var/www

# Copia os arquivos da aplicação para o diretório de trabalho
COPY . .

# Instala as dependências da aplicação
RUN composer install
RUN npm install

# Define as permissões corretas
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage

# Expõe a porta 9000 e define o comando de inicialização
EXPOSE 9000
CMD ["php-fpm"]
