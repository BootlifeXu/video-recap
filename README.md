# VideoRecap

A web application that transforms video content into digestible text summaries by leveraging advanced transcription and AI-powered summarization technologies.

## Features

- **Video Upload**: Upload video files directly to the platform
- **Audio Extraction**: Automatically extract audio from uploaded videos
- **Transcription**: Convert speech to text with high accuracy
- **AI Summarization**: Generate concise summaries of video content
- **History View**: Access previously processed videos and their summaries
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React.js with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Media Processing**: FFmpeg for video/audio processing
- **AI Services**: OpenAI API for transcription and summarization
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- OpenAI API key

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/video-recap-app.git
   cd video-recap-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and add your environment variables:
   ```
   DATABASE_URL=your_database_connection_string
   OPENAI_API_KEY=your_openai_api_key
   SESSION_SECRET=your_session_secret
   ```

4. Set up the database:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and go to http://localhost:5000

## Deployment

This application is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

## License

MIT