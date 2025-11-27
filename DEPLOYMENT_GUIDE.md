# CareerBridge - Deployment Guide

Complete instructions for deploying CareerBridge to production.

## 🚀 Pre-Deployment Checklist

### Local Verification
- [ ] Run `npm run build` successfully locally
- [ ] No TypeScript errors: `npm run lint`
- [ ] Test all user flows in development
- [ ] Verify database migrations are up-to-date
- [ ] All environment variables configured in `.env.local`

### Code Quality
- [ ] No console.error/console.log left in production code
- [ ] All API endpoints have proper error handling
- [ ] No hardcoded credentials or secrets
- [ ] HTTPS enforced for all external links

### Database
- [ ] Production PostgreSQL database created and accessible
- [ ] Database backups configured
- [ ] Connection pooling enabled for production

## 📦 Deployment Platforms

### Option 1: Vercel (Recommended - Easiest)

Vercel is optimized for Next.js and requires minimal configuration.

#### Step 1: Prepare Repository
```bash
# Push code to GitHub
git add .
git commit -m "Ready for production deployment"
git push origin main
```

#### Step 2: Deploy to Vercel
```bash
# Install Vercel CLI (optional, can use web dashboard)
npm i -g vercel

# Deploy
vercel --prod
```

Or use the Vercel web dashboard:
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure environment variables (see below)
5. Deploy

#### Step 3: Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

```
DATABASE_URL = postgresql://user:password@host:5432/careerbridge_prod
NEXTAUTH_URL = https://yourdomain.com
NEXTAUTH_SECRET = (generate new: openssl rand -base64 32)
NODE_ENV = production
```

#### Step 4: Push Database Migrations
```bash
# After deployment, run migrations on production database
DATABASE_URL="postgresql://user:password@prod-host:5432/careerbridge_prod" npx drizzle-kit push
```

#### Step 5: (Optional) Seed Production Data
```bash
DATABASE_URL="your_production_connection_string" npm run seed
```

### Option 2: AWS (EC2 + RDS)

For more control and scalability.

#### Prerequisites
- AWS Account with EC2 and RDS access
- Domain name (Route 53 or external)

#### Step 1: Create RDS PostgreSQL Database
```
1. Go to AWS RDS Console
2. Create DB Instance → PostgreSQL
3. Set:
   - DB instance identifier: careerbridge-prod
   - Master username: postgres
   - Master password: (strong password)
   - DB instance class: db.t3.micro (free tier) or higher
   - Storage: 20 GB
   - Publicly accessible: Yes (or use VPC)
4. Create security group allowing port 5432 from your IP
5. Note the endpoint (e.g., careerbridge.c9akciq32.us-east-1.rds.amazonaws.com)
```

#### Step 2: Create EC2 Instance
```
1. Go to AWS EC2 Console
2. Launch Instance → Ubuntu 22.04 LTS
3. Instance type: t3.micro (free tier) or t3.small
4. Configure security group:
   - Allow SSH (port 22) from your IP
   - Allow HTTP (port 80) from anywhere
   - Allow HTTPS (port 443) from anywhere
5. Create/select key pair and download
```

#### Step 3: Connect and Setup
```bash
# SSH into EC2 instance
ssh -i /path/to/key.pem ubuntu@your-instance-public-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx (reverse proxy)
sudo apt install -y nginx

# Clone your repository
git clone https://github.com/your-username/career-bridge.git
cd career-bridge

# Install dependencies
npm install

# Build Next.js
npm run build
```

#### Step 4: Configure Environment Variables
```bash
# Create .env.production.local
nano .env.production.local

# Add:
DATABASE_URL="postgresql://postgres:your_password@careerbridge.c9akciq32.us-east-1.rds.amazonaws.com:5432/careerbridge"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-generated-secret"
NODE_ENV="production"
```

#### Step 5: Run Database Migrations
```bash
npx drizzle-kit push
```

#### Step 6: Start Application with PM2
```bash
# Start Next.js with PM2
pm2 start npm --name "careerbridge" -- start

# Auto-restart on reboot
pm2 startup
pm2 save
```

#### Step 7: Setup Nginx Reverse Proxy
```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/default

# Replace with:
upstream nextjs_app {
  server localhost:3000;
}

server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name _;

  location / {
    proxy_pass http://nextjs_app;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

#### Step 8: Setup HTTPS with Let's Encrypt
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renew
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### Option 3: DigitalOcean App Platform

Simpler than AWS, similar to Heroku.

#### Step 1: Prepare GitHub Repository
```bash
git push origin main
```

#### Step 2: Deploy on DigitalOcean
1. Go to https://cloud.digitalocean.com
2. Apps → Create App
3. Connect GitHub repository
4. Select branch: `main`
5. Configure:
   - Build Command: `npm run build`
   - Run Command: `npm start`
6. Add environment variables:
   - DATABASE_URL
   - NEXTAUTH_URL
   - NEXTAUTH_SECRET
7. Create PostgreSQL database:
   - In DigitalOcean dashboard: Databases → Create DB
   - Database engine: PostgreSQL 14+
8. Deploy

#### Step 3: Database Setup
DigitalOcean will provide a connection string. Use it for:
```bash
DATABASE_URL="your_provided_connection_string" npx drizzle-kit push
```

## 🔒 Production Security Configuration

### Environment Variables (.env.production)
```bash
# Required
DATABASE_URL="postgresql://user:password@host:5432/db"
NEXTAUTH_URL="https://yourdomain.com"  # IMPORTANT: https:// required, no trailing slash
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# Recommended
NODE_ENV="production"
NEXT_PUBLIC_API_URL="https://yourdomain.com"
```

### Generate Secure NEXTAUTH_SECRET
```bash
# macOS/Linux
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

### Database Configuration
```sql
-- Login to production database
-- Create strong password for user
ALTER USER postgres PASSWORD 'your_very_strong_password_here';

-- Create dedicated app user (optional but recommended)
CREATE USER app_user WITH ENCRYPTED PASSWORD 'app_user_strong_password';
CREATE DATABASE careerbridge OWNER app_user;
GRANT ALL PRIVILEGES ON DATABASE careerbridge TO app_user;
```

## 🗄️ Database Backup & Maintenance

### Manual Backups
```bash
# Backup production database
pg_dump -h hostname -U username -d careerbridge > backup_$(date +%Y%m%d).sql

# Restore from backup
psql -h hostname -U username -d careerbridge < backup_20240101.sql
```

### Automated Backups
- **Vercel**: Vercel handles backups automatically
- **AWS RDS**: Enable automatic backups in RDS console (7-35 day retention)
- **DigitalOcean**: Enable backups in database settings

### Connection Pooling (For High Traffic)
Using PgBouncer or similar:
```bash
# Connection string with pooling
postgresql://user:password@pooler-host:6432/careerbridge?sslmode=require
```

## 📊 Monitoring & Logging

### Application Logs
- **Vercel**: Dashboard → Logs tab
- **AWS EC2**: `/var/log/pm2/` or `pm2 logs`
- **DigitalOcean**: App Platform → Logs tab

### Database Monitoring
```bash
# Check active connections
SELECT datname, count(*) FROM pg_stat_activity GROUP BY datname;

# Kill idle connections if needed
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE datname = 'careerbridge' AND state = 'idle';
```

### Performance Optimization
```bash
# Analyze query performance
EXPLAIN ANALYZE SELECT * FROM jobs WHERE is_active = true;

# Create indexes for frequently queried columns
CREATE INDEX idx_jobs_active ON jobs(is_active);
CREATE INDEX idx_jobs_created ON jobs(created_at DESC);
CREATE INDEX idx_applications_student ON applications(student_id);
CREATE INDEX idx_applications_job ON applications(job_id);
CREATE INDEX idx_saved_jobs_student ON saved_jobs(student_id);
```

## 🔄 CI/CD Pipeline (GitHub Actions - Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 🚨 Troubleshooting Deployment

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build

# Check for TypeScript errors
npm run lint
```

### Database Connection Fails
```bash
# Test connection
psql -h $DATABASE_HOST -U $DATABASE_USER -d $DATABASE_NAME

# Verify environment variables are set correctly
echo $DATABASE_URL
```

### NextAuth Issues
- Verify NEXTAUTH_URL matches deployed domain (https required)
- Regenerate NEXTAUTH_SECRET for production
- Clear browser cookies if session persists
- Check cookies are set to Secure + SameSite

### Slow Performance
- Enable database query logging
- Create indexes on frequently filtered columns
- Increase server resources (compute/memory)
- Implement caching (Redis)

## ✅ Post-Deployment

1. **Test All Flows**
   - Student signup → Browse → Apply → Save
   - Employer signup → Post → View Applicants
   - Profile updates persist

2. **Monitor First 24 Hours**
   - Check error logs regularly
   - Monitor database performance
   - Verify email notifications work (if implemented)

3. **Setup Alerts**
   - Database connection failures
   - High CPU/Memory usage
   - Error rate spikes

4. **Document**
   - Database credentials (secure storage)
   - Deployment steps for team
   - Incident response procedures

---

**Deployment Status**: Ready for production

**Recommended Deployment**: Vercel (easiest, free tier available)

**Time to Deploy**: 15-30 minutes for Vercel, 1-2 hours for AWS/DO
