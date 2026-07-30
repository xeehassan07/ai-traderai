# ============================================================
# Dockerfile — DigitalOcean App Platform / Droplet
# Static HTML/CSS/JS served via Nginx
# ============================================================
FROM nginx:alpine

# Copy all static files
COPY . /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
