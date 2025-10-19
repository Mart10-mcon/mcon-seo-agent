# N8N SEO Workflow Dashboard

A modern, professional dashboard for managing and triggering n8n SEO workflows. Built with React, Tailwind CSS, and designed to integrate seamlessly with n8n automation workflows.

## Features

- **Split View Layout**: Dashboard tools on the left, interactive chat window on the right
- **10 SEO Research Tools**: Keyword research, competitor analysis, and more
- **N8N Integration**: Trigger workflows directly from the chat interface
- **Modern UI**: Clean, professional design matching industry standards
- **Real-time Chat**: Interactive chat window for workflow commands and status updates
- **Responsive Design**: Works seamlessly across different screen sizes

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure N8N Webhook

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your n8n webhook URL:

```env
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/seo-workflow
```

### 3. Run the Development Server

```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Left navigation sidebar
│   │   ├── Header.jsx            # Top header with branding
│   │   ├── Layout.jsx            # Main content layout with tool cards
│   │   ├── ToolCard.jsx          # Reusable tool card component
│   │   └── ChatWindow.jsx        # Chat interface for n8n workflows
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # App entry point
│   └── index.css                 # Global styles with Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── .env.example
```

## Available SEO Tools

### Keyword Research
- **Related Keywords**: Discover keywords related to your main terms
- **Keyword Suggestions**: Get intelligent keyword suggestions
- **Keyword Ideas**: Generate fresh keyword ideas for your content
- **Keyword Difficulty**: Analyze the competition for your target keywords
- **Keyword Overview**: Complete analysis of keyword metrics and trends

### Competitor Research (Coming Soon)
- Ranked Keywords
- Domain Rank Overview
- Keyword Gap Analysis
- Bulk Traffic Estimation
- Competitors Domain

## N8N Workflow Integration

The chat window can trigger n8n workflows via webhook. When you send a message:

1. The message is sent to your configured n8n webhook URL
2. N8N processes the request and executes the workflow
3. The response is displayed in the chat window

### Demo Mode

If no webhook URL is configured, the dashboard runs in demo mode with simulated responses.

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Technologies Used

- **React 18**: Modern UI library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Axios**: HTTP client for API requests

## Customization

### Adding New Tools

Edit `src/components/Layout.jsx` and add new tool objects to the `tools` array:

```javascript
{
  id: 'your-tool-id',
  name: 'Tool Name',
  description: 'Tool description',
  icon: YourIcon,
  iconBgColor: 'bg-color-50',
  iconColor: 'text-color-600',
}
```

### Styling

The color scheme can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#5B7FFF',
    dark: '#4A6DE5',
    light: '#7B9BFF'
  }
}
```

## License

MIT

## Support

For issues or questions, please contact martien@mconbv.nl
