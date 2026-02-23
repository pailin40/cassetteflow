# CassetteFy
A retro-inspired music streaming web app with a cassette player UI, built with React and Tailwind CSS.
Has a modern music streaming interface wrapped in a nostalgic cassette tape aesthetic. Browse songs, manage playlists, and favorite tracks.

[Click](https://pailin40.github.io/cassetteflow) to view live demo.

<img width="2879" height="1510" alt="music_streamer_1" src="https://github.com/user-attachments/assets/6bd77b62-12a8-4edc-abb8-4b8ac7a4d6be" />

<img width="2879" height="1527" alt="music_streamer_4" src="https://github.com/user-attachments/assets/12451359-700b-4aa8-af62-10349b04724b" />


## Features

- **Cassette player interface** 
- **Home** - Browse songs and artists
- **Library** - View and manage music collection
- **Playlists** - Create custom playlist
- **Favorites** - Like songs and access them from a Favorites page
- **Search** - Search across songs, artists, and playlists
- **Persistent State** - Favorites and library are saved to `localStorage`
- **Toast Notifications** - User-friendly feedback via `react-hot-toast`


## Tech Stack

| Category           | Technology                  |
|--------------------|-----------------------------|
| Framework          | React 19.1.0                |
| Styling            | Tailwind CSS 3              |
| Routing            | React Router DOM 7          |
| State Management   | React Context API + Hooks   |
| Icons              | Lucide React                |
| Notifications      | React Hot Toast             |
| Unique IDs         | UUID                        |
| Build Tool         | Create React App            |
| Deployment         | GitHub Pages                |

---

## Project Structure

```
src/
├── components/
│ ├── Layout/ 
│ ├── Navigation/ 
│ ├── Pages/ 
│ ├── Player/ # Cassette
│ └── UI/ # Reusable element
├── context/ 
├── data/ # Static mock data 
├── hooks/ 
└── utils/ 
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (bundled with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pailin40/cassetteflow.git
   cd cassetteflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

