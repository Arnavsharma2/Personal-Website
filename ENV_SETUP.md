# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Google Gemini AI API Key (Required for chat functionality)
# Get your API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Admin password for dashboard access
ADMIN_PASSWORD=your_admin_password_here

# Geolocation API token (optional, for visitor location tracking)
# Get from: https://ipinfo.io/
GEOLOCATION_API_TOKEN=your_geolocation_token_here

# Resume content (optional, fallback if PDF processing fails)
RESUME_CONTENT=your_resume_text_here
```

## How to Get API Keys

### 1. Google Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Add it to your `.env.local` file

### 2. Geolocation API Token (Optional)
1. Go to [ipinfo.io](https://ipinfo.io/)
2. Sign up for a free account
3. Get your API token from the dashboard
4. Add it to your `.env.local` file

## File Structure

Your `.env.local` file should be in the root directory:

```
Personal-Website/
├── .env.local          # Your environment variables
├── app/
├── components/
├── utils/
└── ...
```

## Testing Your Setup

1. Create your `.env.local` file with the required variables
2. Restart your development server: `npm run dev`
3. Visit `/test-rag` to test the RAG system
4. Check the environment variables are loaded correctly

## Security Notes

- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- Keep your API keys secure and don't share them
- Use different keys for development and production

## Troubleshooting

### "API Key Missing" Error
- Check that `.env.local` exists in the project root
- Verify the variable name is exactly `GEMINI_API_KEY`
- Restart the development server after adding the file
- Check the `/test-rag` page for detailed error information

### "403 Forbidden" Error
- Verify your Gemini API key is valid
- Check that you have enabled the Gemini API in Google Cloud Console
- Ensure you have sufficient quota/credits

### Environment Variables Not Loading
- Make sure the file is named `.env.local` (not `.env`)
- Restart the development server
- Check the file is in the correct location (project root)
