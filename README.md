# VUNA Calculator

A web-based scientific calculator built by the Set 2025/26 Software Engineering class.

## Features

- Basic arithmetic (+, -, ×, ÷)
- Scientific functions (sin, cos, tan, asin, acos, atan)
- Constants (π, e)
- Memory (ans)
- Percentage calculations
- Dark/light theme
- Age/date calculator
- History panel
- OCR camera solver (Tesseract.js)
- Multi-language support

## Usage

### Browser
Open `index.html` in any modern browser.

### Docker
```bash
docker build -t vuna-calc .
docker run -d -p 8080:80 vuna-calc
```

### Development
```bash
npm install
npm test
```

## CI/CD

- **Tests** run on every push/PR via GitHub Actions
- **Deployment** to GitHub Pages on push to `main`
