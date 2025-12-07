# Newsletter Integration Guide

## Overview
The newsletter subscription feature is implemented and ready to use. By default, it stores subscriptions in localStorage for demo purposes. You can easily integrate with popular email services.

## Current Setup (LocalStorage)
- Subscriptions are stored in browser localStorage
- Use `exportSubscribers()` in console to download CSV
- Good for testing and small-scale use

## Integration Options

### Option 1: Mailchimp (Recommended)
1. Create a Mailchimp account
2. Get your audience ID and API key
3. Update `js/newsletter.js`:
   ```javascript
   const MAILCHIMP_URL = 'https://YOUR_DC.api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members';
   ```
4. Uncomment the Mailchimp method in `handleSubmit()`

### Option 2: ConvertKit
1. Sign up at convertkit.com
2. Create a form
3. Get your form ID
4. Use their API endpoint:
   ```javascript
   fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
       method: 'POST',
       body: JSON.stringify({ email, api_key: 'YOUR_API_KEY' })
   })
   ```

### Option 3: Netlify Forms (Serverless)
1. Create `netlify/functions/subscribe.js`:
   ```javascript
   exports.handler = async (event) => {
       const { email } = JSON.parse(event.body);
       // Add to your email service
       return { statusCode: 200, body: JSON.stringify({ success: true }) };
   };
   ```
2. Uncomment serverless method in `handleSubmit()`

### Option 4: Formspree
1. Sign up at formspree.io
2. Create a form
3. Update form action:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option 5: EmailOctopus
1. Create account at emailoctopus.com
2. Get API key and list ID
3. Use their API endpoint

## Export Subscribers
To export current subscribers (localStorage):
1. Open browser console
2. Type: `exportSubscribers()`
3. Download CSV file

## Privacy Compliance
- Add privacy policy page
- Include unsubscribe link in emails
- Comply with GDPR/CAN-SPAM
- Store consent timestamp

## Customization
Edit `css/newsletter.css` to match your brand:
- Colors
- Fonts
- Layout
- Animations

## Testing
1. Enter email and click Subscribe
2. Check success message
3. Verify storage (localStorage or your service)
4. Test validation (invalid emails)

## Analytics
Newsletter subscriptions are tracked in Google Analytics as:
- Event: `newsletter_subscribe`
- Category: `Newsletter`
- Label: `Subscribe`
