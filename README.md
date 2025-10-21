# GitHub Users Explorer

A modern, high-performance React application for exploring GitHub users. Built with TypeScript, TanStack Query, and Tailwind CSS.

## Features

- **Infinite Scroll Pagination** - Seamlessly load more users as you scroll
- **Real-time Search** - Search GitHub users with debounced input for optimal performance
- **Performance Optimized** - Caching, lazy loading, and efficient API calls
- **Modern UI/UX** - Clean interface with smooth transitions

## Tech Stack

- React 18 
- TypeScript
- TanStack Query
- Tailwind CSS
- Vite
- GitHub REST API - Official GitHub API

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production

## Project Structure

```
src/
├── components/          # React components
│   ├── SearchBar.tsx   # Debounced search input
│   ├── UserCard.tsx    # User card component
│   ├── UserList.tsx    # List with infinite scroll
├── hooks/              # Custom React hooks
│   └── useGitHubUsers.ts    # TanStack Query hooks
├── services/           # API services
│   └── github.ts       # GitHub API integration
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Key Features Explained

### Infinite Scroll
Uses Intersection Observer API to detect when users scroll near the bottom, automatically loading the next page of users.

### Search Functionality
Implements GitHub's Search API with debouncing to provide fast, efficient searching without overwhelming the API.

## API Rate Limits

GitHub API allows:
- **Unauthenticated requests**: 60 requests per hour
- **Authenticated requests**: 5,000 requests per hour

This app uses unauthenticated requests. For higher limits, consider adding GitHub authentication.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)

## Acknowledgments

- [GitHub REST API](https://docs.github.com/en/rest) - Official GitHub API
- [TanStack Query](https://tanstack.com/query) - Powerful data fetching
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev) - Beautiful icon library
