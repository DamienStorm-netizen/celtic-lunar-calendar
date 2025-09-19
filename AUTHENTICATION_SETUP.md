# Authentication Setup Guide

This guide will help you set up user authentication for the Lunar Almanac using Cloudflare D1 database and Workers.

## Prerequisites

- Cloudflare account with Workers and D1 enabled
- Node.js and npm installed
- Access to your Cloudflare account

**Note:** We'll use `npx` to run Wrangler commands, so no global installation is required!

## Step 1: Create D1 Database

1. **Navigate to your project directory:**
   ```bash
   cd "/Users/damienstorm/My Art/The Lunar Almanac/celtic_calendar"
   ```

2. **Create the database:**
   ```bash
   npx wrangler d1 create lunar-almanac-db
   ```

3. **Note the database ID** from the output and update `wrangler.toml`:
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "lunar-almanac-db"
   database_id = "your-actual-database-id-here"
   ```

## Step 2: Initialize Database Schema

1. **Apply the schema:**
   ```bash
   npx wrangler d1 execute lunar-almanac-db --file=./database/schema.sql
   ```

2. **Verify the tables were created:**
   ```bash
   npx wrangler d1 execute lunar-almanac-db --command="SELECT name FROM sqlite_master WHERE type='table';"
   ```

## Step 3: Set Environment Variables

1. **Generate a secure JWT secret:**
   ```bash
   openssl rand -base64 32
   ```

2. **Update `wrangler.toml` with your actual values:**
   ```toml
   [vars]
   JWT_SECRET = "your-secure-jwt-secret-here"
   BCRYPT_ROUNDS = "12"
   SESSION_DURATION_HOURS = "24"
   ```

## Step 4: Install Dependencies

1. **Clean up any failed installation attempts:**
   ```bash
   rm -rf node_modules package-lock.json
   ```

2. **Create a proper package.json for worker dependencies:**
   ```bash
   cat > package.json << 'EOF'
   {
     "name": "lunar-almanac-auth-worker",
     "version": "1.0.0",
     "dependencies": {
       "@tsndr/cloudflare-worker-jwt": "^2.4.0"
     },
     "devDependencies": {
       "wrangler": "^3.0.0"
     }
   }
   EOF
   ```

3. **Install the JWT library for Cloudflare Workers:**
   ```bash
   npm install @tsndr/cloudflare-worker-jwt
   ```

## Step 5: Deploy the Worker

1. **Deploy to Cloudflare:**
   ```bash
   npx wrangler deploy
   ```

2. **Note your Worker URL** (e.g., `https://lunar-almanac-auth.your-domain.workers.dev`)

## Step 6: Update Frontend Configuration

1. **Update the AUTH_BASE_URL** in these files:
   - `src/utils/authClient.js` (line 7)
   - `src/components/eventsAPI.js` (lines 43, 98, 133, 172)

   Replace `https://lunar-almanac-auth.your-domain.workers.dev` with your actual Worker URL.

## Step 7: Include Auth CSS

Add the authentication CSS to your main stylesheet or HTML:

```html
<link rel="stylesheet" href="src/styles/auth.css">
```

## Step 8: Initialize Authentication in Your App

Make sure to initialize the authentication system when your app loads:

```javascript
import { initAuth } from './src/components/auth.js';

// Initialize authentication on app startup
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  // ... rest of your app initialization
});
```

## Step 9: Migrate Existing Custom Events (Optional)

If you have existing custom events in the JSON file, you can migrate them:

1. **Create a migration user account** through the registration flow
2. **Manually import existing events** to that user's account
3. **Update the migration script** in `database/migrate_custom_events.sql`

## Testing

1. **Test Registration:**
   - Open your app in a browser
   - Go to Settings
   - Click "Login" and then "Register"
   - Create a test account

2. **Test Login:**
   - Log out and log back in
   - Verify the user info appears correctly

3. **Test Custom Events:**
   - Create a custom event while logged in
   - Verify it saves to the database
   - Log out and log back in to verify persistence

## Features

### User Authentication
- ✅ User registration with email and username
- ✅ Secure password hashing using PBKDF2
- ✅ JWT-based session management
- ✅ Password change functionality
- ✅ Session expiration and cleanup

### Custom Events
- ✅ Per-user event storage in D1 database
- ✅ Backward compatibility with existing JSON storage
- ✅ Seamless fallback to Python backend for non-authenticated users
- ✅ Real-time synchronization across devices

### Security
- ✅ Input validation and sanitization
- ✅ XSS protection
- ✅ Rate limiting ready (implement with KV or Durable Objects)
- ✅ Secure password requirements
- ✅ Session management with automatic cleanup

## Architecture

```
Frontend (PWA)
    ↓
Cloudflare Worker (Authentication & Events API)
    ↓
Cloudflare D1 Database
    ↓
[Fallback to Python Backend for legacy support]
```

## Troubleshooting

### Common Issues

1. **"Database not found" error:**
   - Verify the database ID in `wrangler.toml` matches the actual D1 database ID
   - Ensure you've deployed the Worker after updating the configuration

2. **JWT verification errors:**
   - Check that `JWT_SECRET` is set correctly in `wrangler.toml`
   - Ensure the secret is the same across deployments

3. **CORS errors:**
   - The Worker includes CORS headers, but verify your domain is correctly configured
   - Check that the AUTH_BASE_URL matches your deployed Worker URL

4. **Authentication not working:**
   - Verify the frontend URLs point to your deployed Worker
   - Check browser developer tools for network errors
   - Ensure the database schema was applied correctly

### Debug Commands

```bash
# Check D1 database tables
npx wrangler d1 execute lunar-almanac-db --command="SELECT name FROM sqlite_master WHERE type='table';"

# View users table
npx wrangler d1 execute lunar-almanac-db --command="SELECT id, username, email, created_at FROM users;"

# View custom events
npx wrangler d1 execute lunar-almanac-db --command="SELECT id, user_id, title, date FROM custom_events;"

# Check Worker logs
npx wrangler tail
```

## Next Steps

1. **Set up proper domain**: Configure a custom domain for your Worker
2. **Add email verification**: Implement email verification for new accounts
3. **Add password reset**: Implement password reset via email
4. **Add social login**: Consider adding OAuth providers
5. **Add rate limiting**: Implement rate limiting using Cloudflare KV or Durable Objects
6. **Add admin features**: Create admin interface for user management

## Security Considerations

1. **JWT Secret**: Keep your JWT secret secure and rotate it periodically
2. **Database Access**: D1 databases are secure by default, but monitor access patterns
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **Input Validation**: All inputs are validated, but review regularly
5. **Session Management**: Sessions expire automatically, but consider shorter durations for sensitive applications

## Support

If you encounter issues during setup, check:

1. [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
2. [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
3. [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

## License

This authentication system is part of the Lunar Almanac project and follows the same license terms.