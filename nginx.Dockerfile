FROM duluca/minimal-nginx-web-server

COPY dist/lemon-mart/browser /var/www

CMD 'nginx'
