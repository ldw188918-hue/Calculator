# Calculator Web App

공학용 전자 계산기 웹 애플리케이션

## Features

- ✨ 기본 산술 연산 (+, -, ×, ÷, %)
- 🔬 과학 함수 (sin, cos, tan, ln, log, √, x², x³, xʸ, eˣ, 10ˣ, !)
- 💾 메모리 기능 (MC, MR, M+, M-)
- 🎨 현대적인 글래스모피즘 디자인
- 📱 완전한 반응형 (데스크톱, 태블릿, 모바일)
- ⌨️ 키보드 입력 지원
- 🌐 GitHub Pages 자동 배포

## Tech Stack

- HTML5
- CSS3 (Vanilla CSS with Custom Properties)
- JavaScript (ES6+ Modules)
- Vite (Build Tool)
- GitHub Actions (CI/CD)

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

### Basic Operations
- Click number buttons or use keyboard (0-9)
- Click operators (+, -, ×, ÷) or use keyboard (+, -, *, /)
- Press = or Enter to calculate

### Scientific Functions
- Click function buttons (sin, cos, tan, etc.)
- Input is in degrees for trigonometric functions

### Memory
- M+: Add current value to memory
- M-: Subtract current value from memory
- MR: Recall memory value
- MC: Clear memory

### Keyboard Shortcuts
- `0-9`: Number input
- `+, -, *, /`: Operators
- `Enter` or `=`: Calculate
- `Escape`: Clear all
- `Backspace`: Delete last digit

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

1. Push to `main` branch
2. GitHub Actions will automatically build and deploy
3. Access at: `https://<username>.github.io/Calculator/`

## License

MIT
