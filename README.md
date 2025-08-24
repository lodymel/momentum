# 🌟 Momentum App

A melodious dashboard app that helps you grow and glow each day. Features include a real-time clock, personalized greetings, to-do list, and location-based weather widget.

## ✨ Key Features ✨

- **🕐 Real-time Clock**: Highly readable font display with clean design
- **👋 Personalized Greetings**: Custom greetings based on username
- **📝 Todo List**: Add, edit, delete, complete check, and filtering features
- **🌤️ Weather Widget**: Location-based weather using OpenWeather API
- **🎨 lody Style Design**: Inspired by https://www.behance.net/gallery/145880445/Personal-Identity-Brand-Design

## 🚀 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/momentum.git
cd momentum
```

### 2. Run Locally
```bash
# Simple HTTP server (Python 3)
python3 -m http.server 8000

# Or use Node.js http-server
npx http-server

# Or use Live Server extension (VS Code)
```

### 3. Access in Browser
```
http://localhost:8000
```

## 🔐 OpenWeather API Setup

### For GitHub Pages Deployment (Recommended)

1. **Get OpenWeather API Key**
   - Visit [OpenWeather](https://openweathermap.org)
   - Sign up for free account
   - Copy API key from "My API keys"

2. **Set GitHub Secrets**
   - Go to your repository → **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `WEATHER_API_KEY`
   - Value: `your_openweather_api_key`
   - Click **Add secret**

3. **Automatic Deployment**
   - Push to `main` branch triggers GitHub Actions automatically
   - API key is safely injected during build and deployment

### For Local Development

Create `.env` file (not committed to Git):
```bash
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

**⚠️ Important**: Never commit API keys to public repositories!

## 🎨 Design Features

- **Monochrome Colors**: Sophisticated combination of white, black, and gray
- **Glassmorphism**: Semi-transparent backgrounds with blur effects
- **Apple Style**: SF Pro fonts with minimal UI
- **Responsive Design**: Optimized experience across all devices
- **Dynamic Layout**: Automatic layout adjustment based on todo count

## 📱 Responsive Support

- Desktop, tablet, and mobile optimization
- Touch-friendly interface
- Automatic screen size adjustment

## 🔧 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Build Tool**: GitHub Actions (for GitHub Pages deployment)
- **Deployment**: GitHub Pages
- **Weather API**: OpenWeather API
- **Fonts**: Apple System Fonts (SF Pro Display, SF Pro Text)
- **Storage**: localStorage

## 📁 Project Structure

```
momentum/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Stylesheet
├── js/
│   ├── background.js  # Background image management
│   ├── clock.js       # Clock functionality
│   ├── greetings.js   # Greetings functionality
│   ├── quotes.js      # Quote display
│   ├── todo.js        # Todo list functionality
│   └── weather.js     # Weather widget
├── img/               # Background images
└── .github/
    └── workflows/     # GitHub Actions configuration
```

## 📄 License

MIT License

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

If you have any questions or suggestions about the project, please create an issue. Thank you!
