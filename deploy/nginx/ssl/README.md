# SSL Certificates Placeholder

This directory should contain:

- `fullchain.pem` - Your SSL certificate chain
- `privkey.pem` - Your private key
- `chain.pem` - Intermediate CA certificate

## How to obtain SSL certificates:

### Option 1: Let's Encrypt (Free, Recommended)

```bash
# SSH into your server
ssh deploy@your-server-ip

# Navigate to app directory
cd /opt/jobplatform

# Stop nginx temporarily
docker-compose stop nginx

# Obtain certificate (replace your-domain.com with your actual domain)
certbot certonly --standalone -d your-domain.com -d www.your-domain.com

# Copy certificates
cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ./nginx/ssl/
cp /etc/letsencrypt/live/your-domain.com/privkey.pem ./nginx/ssl/
cp /etc/letsencrypt/live/your-domain.com/chain.pem ./nginx/ssl/

# Start nginx
docker-compose up -d nginx
```

### Option 2: Buy from SSL Provider

1. Purchase SSL certificate from your provider
2. Download certificate files
3. Upload to `./nginx/ssl/` directory

### Option 3: Cloudflare (Free)

1. Sign up for Cloudflare
2. Add your domain
3. Get free SSL certificate through Cloudflare
4. Use Cloudflare's origin certificate

## Certificate Renewal

Let's Encrypt certificates expire after 90 days. To renew:

```bash
certbot renew
```

Add to crontab:
```
0 3 * * * certbot renew --quiet
```