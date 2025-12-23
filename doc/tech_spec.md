# Technical Specification Document
# 공학용 전자 계산기 웹앱

## 1. 개요

### 1.1 문서 목적
본 문서는 공학용 전자 계산기 웹앱의 기술적 구현 세부사항을 정의합니다. PRD에서 정의한 요구사항을 바탕으로 실제 구현에 필요한 아키텍처, 데이터 구조, 알고리즘, API 설계 등을 상세히 기술합니다.

### 1.2 참조 문서
- [PRD - 공학용 전자 계산기 웹앱](file:///C:/Users/WIN/workspace/Calculator/doc/prd.md)

---

## 2. 시스템 아키텍처

### 2.1 전체 구조
```
calculator-webapp/
├── index.html              # 메인 HTML 파일
├── css/
│   ├── reset.css          # CSS 리셋
│   ├── variables.css      # CSS 커스텀 프로퍼티
│   ├── layout.css         # 레이아웃 스타일
│   └── components.css     # 컴포넌트 스타일
├── js/
│   ├── main.js            # 애플리케이션 진입점
│   ├── calculator.js      # 계산기 핵심 로직
│   ├── display.js         # 디스플레이 관리
│   ├── memory.js          # 메모리 기능
│   ├── scientific.js      # 과학 함수
│   └── utils.js           # 유틸리티 함수
└── assets/
    └── fonts/             # 웹 폰트 (선택사항)
```

### 2.2 아키텍처 패턴
- **MVC (Model-View-Controller) 변형**
  - **Model**: `calculator.js` - 계산 상태 및 로직
  - **View**: `display.js` - UI 업데이트
  - **Controller**: `main.js` - 이벤트 핸들링

### 2.3 모듈 구조
```javascript
// ES6 모듈 패턴 사용
export class Calculator { ... }
export class Display { ... }
export class Memory { ... }
export class ScientificFunctions { ... }
```

---

## 3. 데이터 구조

### 3.1 계산기 상태 (State)
```javascript
const calculatorState = {
  currentValue: '0',           // 현재 디스플레이 값
  previousValue: null,         // 이전 값
  operator: null,              // 현재 연산자 (+, -, *, /, etc.)
  waitingForOperand: false,    // 새 숫자 입력 대기 중
  memory: 0,                   // 메모리 저장 값
  expression: '',              // 전체 수식 (디스플레이용)
  history: [],                 // 계산 히스토리 (Phase 2)
  angleMode: 'DEG'             // 각도 모드: DEG 또는 RAD (Phase 2)
};
```

### 3.2 버튼 매핑
```javascript
const buttonConfig = {
  numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'],
  operators: ['+', '-', '×', '÷', '%'],
  functions: ['sin', 'cos', 'tan', 'ln', 'log', '√', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '!'],
  constants: ['π', 'e'],
  memory: ['MC', 'MR', 'M+', 'M-'],
  control: ['AC', 'DEL', '=', '(', ')']
};
```

---

## 4. 핵심 알고리즘

### 4.1 계산 엔진

#### 4.1.1 기본 연산 처리
```javascript
class Calculator {
  calculate(operator, operand1, operand2) {
    const a = parseFloat(operand1);
    const b = parseFloat(operand2);
    
    switch(operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': 
        if (b === 0) throw new Error('Division by zero');
        return a / b;
      case '%': return a % b;
      case 'xʸ': return Math.pow(a, b);
      default: throw new Error('Unknown operator');
    }
  }
}
```

#### 4.1.2 과학 함수 처리
```javascript
class ScientificFunctions {
  // 삼각 함수 (라디안 기준)
  sin(x) { return Math.sin(x); }
  cos(x) { return Math.cos(x); }
  tan(x) { return Math.tan(x); }
  
  // 로그 함수
  ln(x) {
    if (x <= 0) throw new Error('Math domain error');
    return Math.log(x);
  }
  
  log(x) {
    if (x <= 0) throw new Error('Math domain error');
    return Math.log10(x);
  }
  
  // 제곱근
  sqrt(x) {
    if (x < 0) throw new Error('Math domain error');
    return Math.sqrt(x);
  }
  
  // 지수 함수
  exp(x) { return Math.exp(x); }
  pow10(x) { return Math.pow(10, x); }
  
  // 팩토리얼
  factorial(n) {
    if (n < 0 || !Number.isInteger(n)) {
      throw new Error('Factorial requires non-negative integer');
    }
    if (n > 170) throw new Error('Number too large');
    if (n === 0 || n === 1) return 1;
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
}
```

#### 4.1.3 수식 파싱 (괄호 처리)
```javascript
class ExpressionParser {
  // Shunting Yard 알고리즘 사용
  parse(expression) {
    const outputQueue = [];
    const operatorStack = [];
    const precedence = {
      '+': 1, '-': 1,
      '×': 2, '÷': 2,
      'xʸ': 3
    };
    
    // 토큰화 및 후위 표기법 변환
    // ...구현 세부사항
    
    return this.evaluatePostfix(outputQueue);
  }
  
  evaluatePostfix(tokens) {
    // 후위 표기법 평가
    // ...구현 세부사항
  }
}
```

### 4.2 정밀도 관리

#### 4.2.1 부동소수점 오차 처리
```javascript
class PrecisionHandler {
  // 부동소수점 오차 보정
  round(value, decimals = 10) {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
  
  // 과학적 표기법 변환
  toScientific(value) {
    if (Math.abs(value) > 1e10 || (Math.abs(value) < 1e-6 && value !== 0)) {
      return value.toExponential(6);
    }
    return this.round(value).toString();
  }
  
  // 유효 숫자 제한
  formatDisplay(value, maxDigits = 12) {
    const str = this.toScientific(value);
    return str.length > maxDigits ? str.substring(0, maxDigits) : str;
  }
}
```

### 4.3 메모리 관리
```javascript
class Memory {
  constructor() {
    this.value = 0;
  }
  
  clear() {
    this.value = 0;
  }
  
  recall() {
    return this.value;
  }
  
  add(value) {
    this.value += parseFloat(value);
  }
  
  subtract(value) {
    this.value -= parseFloat(value);
  }
  
  hasValue() {
    return this.value !== 0;
  }
}
```

---

## 5. UI 컴포넌트 설계

### 5.1 HTML 구조
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>공학용 계산기</title>
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/components.css">
</head>
<body>
  <div class="calculator-container">
    <div class="calculator">
      <!-- 디스플레이 -->
      <div class="display">
        <div class="expression" id="expression"></div>
        <div class="result" id="result">0</div>
      </div>
      
      <!-- 버튼 그리드 -->
      <div class="buttons">
        <!-- Row 1: Memory & Clear -->
        <button class="btn btn-memory" data-action="MC">MC</button>
        <button class="btn btn-memory" data-action="MR">MR</button>
        <button class="btn btn-memory" data-action="M+">M+</button>
        <button class="btn btn-memory" data-action="M-">M-</button>
        <button class="btn btn-clear" data-action="AC">AC</button>
        
        <!-- Row 2: Scientific Functions -->
        <button class="btn btn-function" data-action="sin">sin</button>
        <button class="btn btn-function" data-action="cos">cos</button>
        <button class="btn btn-function" data-action="tan">tan</button>
        <button class="btn btn-function" data-action="ln">ln</button>
        <button class="btn btn-function" data-action="log">log</button>
        
        <!-- Row 3: Power Functions -->
        <button class="btn btn-function" data-action="√">√</button>
        <button class="btn btn-function" data-action="x²">x²</button>
        <button class="btn btn-function" data-action="x³">x³</button>
        <button class="btn btn-function" data-action="xʸ">xʸ</button>
        <button class="btn btn-delete" data-action="DEL">DEL</button>
        
        <!-- Row 4: Exponential Functions -->
        <button class="btn btn-function" data-action="eˣ">eˣ</button>
        <button class="btn btn-function" data-action="10ˣ">10ˣ</button>
        <button class="btn btn-function" data-action="!"">!</button>
        <button class="btn btn-operator" data-action="(">(</button>
        <button class="btn btn-operator" data-action=")">)</button>
        
        <!-- Row 5-7: Numbers & Operators -->
        <button class="btn btn-number" data-value="7">7</button>
        <button class="btn btn-number" data-value="8">8</button>
        <button class="btn btn-number" data-value="9">9</button>
        <button class="btn btn-operator" data-action="÷">÷</button>
        <button class="btn btn-constant" data-value="π">π</button>
        
        <button class="btn btn-number" data-value="4">4</button>
        <button class="btn btn-number" data-value="5">5</button>
        <button class="btn btn-number" data-value="6">6</button>
        <button class="btn btn-operator" data-action="×">×</button>
        <button class="btn btn-constant" data-value="e">e</button>
        
        <button class="btn btn-number" data-value="1">1</button>
        <button class="btn btn-number" data-value="2">2</button>
        <button class="btn btn-number" data-value="3">3</button>
        <button class="btn btn-operator" data-action="-">-</button>
        <button class="btn btn-operator" data-action="%">%</button>
        
        <button class="btn btn-number" data-value="0">0</button>
        <button class="btn btn-number" data-value=".">.</button>
        <button class="btn btn-equals" data-action="=">=</button>
        <button class="btn btn-operator" data-action="+">+</button>
      </div>
    </div>
  </div>
  
  <script type="module" src="js/main.js"></script>
</body>
</html>
```

### 5.2 CSS 변수 시스템
```css
/* variables.css */
:root {
  /* Colors */
  --color-bg-primary: #1a0b2e;
  --color-bg-secondary: #2d1b4e;
  --color-display-bg: rgba(0, 0, 0, 0.3);
  --color-btn-number: #2a2a3e;
  --color-btn-operator: #6c5ce7;
  --color-btn-operator-hover: #a29bfe;
  --color-btn-function: #3a3a4e;
  --color-btn-clear: #ff6b6b;
  --color-btn-equals: #51cf66;
  --color-text: #ffffff;
  --color-text-secondary: rgba(255, 255, 255, 0.7);
  --color-error: #ff6b6b;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  
  /* Typography */
  --font-family: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-display-result: 48px;
  --font-size-display-expression: 24px;
  --font-size-button: 18px;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  
  /* Shadows */
  --shadow-container: 0 20px 60px rgba(0, 0, 0, 0.3);
  --shadow-button: 0 4px 12px rgba(0, 0, 0, 0.2);
  --shadow-display: inset 0 2px 8px rgba(0, 0, 0, 0.3);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
  
  /* Layout */
  --calculator-max-width: 400px;
  --button-gap: 8px;
}
```

### 5.3 반응형 디자인
```css
/* Breakpoints */
@media (max-width: 768px) {
  :root {
    --font-size-display-result: 36px;
    --font-size-display-expression: 18px;
    --font-size-button: 16px;
    --calculator-max-width: 100%;
    --spacing-lg: 16px;
  }
  
  .calculator {
    border-radius: 0;
  }
}

@media (max-width: 480px) {
  :root {
    --font-size-display-result: 32px;
    --font-size-button: 14px;
    --button-gap: 6px;
  }
}
```

---

## 6. 이벤트 핸들링

### 6.1 이벤트 위임 패턴
```javascript
class EventHandler {
  constructor(calculator, display) {
    this.calculator = calculator;
    this.display = display;
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // 버튼 클릭 이벤트 위임
    document.querySelector('.buttons').addEventListener('click', (e) => {
      const button = e.target.closest('.btn');
      if (!button) return;
      
      this.handleButtonClick(button);
    });
    
    // 키보드 입력
    document.addEventListener('keydown', (e) => {
      this.handleKeyPress(e);
    });
  }
  
  handleButtonClick(button) {
    const action = button.dataset.action;
    const value = button.dataset.value;
    
    // 버튼 애니메이션
    this.animateButton(button);
    
    if (value) {
      this.calculator.inputNumber(value);
    } else if (action) {
      this.calculator.performAction(action);
    }
    
    this.display.update(this.calculator.getState());
  }
  
  handleKeyPress(e) {
    const keyMap = {
      '0-9': 'number',
      '.': 'decimal',
      '+': 'add',
      '-': 'subtract',
      '*': 'multiply',
      '/': 'divide',
      'Enter': 'equals',
      'Escape': 'clear',
      'Backspace': 'delete'
    };
    
    // 키 매핑 처리
    // ...구현 세부사항
  }
  
  animateButton(button) {
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 150);
  }
}
```

### 6.2 키보드 단축키
| 키 | 동작 |
|---|---|
| `0-9` | 숫자 입력 |
| `.` | 소수점 |
| `+` `-` `*` `/` | 연산자 |
| `Enter` | 계산 (=) |
| `Escape` | 전체 삭제 (AC) |
| `Backspace` | 마지막 문자 삭제 (DEL) |
| `(` `)` | 괄호 |

---

## 7. 에러 처리 전략

### 7.1 에러 타입 정의
```javascript
class CalculatorError extends Error {
  constructor(type, message) {
    super(message);
    this.type = type;
    this.name = 'CalculatorError';
  }
}

const ErrorTypes = {
  DIVISION_BY_ZERO: 'DIVISION_BY_ZERO',
  MATH_DOMAIN: 'MATH_DOMAIN',
  INVALID_EXPRESSION: 'INVALID_EXPRESSION',
  NUMBER_TOO_LARGE: 'NUMBER_TOO_LARGE',
  SYNTAX_ERROR: 'SYNTAX_ERROR'
};
```

### 7.2 에러 핸들러
```javascript
class ErrorHandler {
  handle(error) {
    let message;
    
    switch(error.type) {
      case ErrorTypes.DIVISION_BY_ZERO:
        message = 'Error: Division by zero';
        break;
      case ErrorTypes.MATH_DOMAIN:
        message = 'Error: Math domain error';
        break;
      case ErrorTypes.INVALID_EXPRESSION:
        message = 'Error: Invalid expression';
        break;
      case ErrorTypes.NUMBER_TOO_LARGE:
        message = 'Error: Number too large';
        break;
      default:
        message = 'Error: Unknown error';
    }
    
    this.displayError(message);
    this.vibrate(); // 모바일 햅틱 피드백
  }
  
  displayError(message) {
    const display = document.getElementById('result');
    display.textContent = message;
    display.classList.add('error');
    
    setTimeout(() => {
      display.classList.remove('error');
    }, 2000);
  }
  
  vibrate() {
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  }
}
```

---

## 8. 성능 최적화

### 8.1 렌더링 최적화
```javascript
class Display {
  constructor() {
    this.resultElement = document.getElementById('result');
    this.expressionElement = document.getElementById('expression');
    this.updateScheduled = false;
  }
  
  // requestAnimationFrame을 사용한 배칭
  update(state) {
    if (this.updateScheduled) return;
    
    this.updateScheduled = true;
    requestAnimationFrame(() => {
      this.resultElement.textContent = state.currentValue;
      this.expressionElement.textContent = state.expression;
      this.updateScheduled = false;
    });
  }
}
```

### 8.2 메모이제이션
```javascript
class MemoizedFunctions {
  constructor() {
    this.cache = new Map();
  }
  
  factorial(n) {
    if (this.cache.has(`factorial_${n}`)) {
      return this.cache.get(`factorial_${n}`);
    }
    
    const result = this.calculateFactorial(n);
    this.cache.set(`factorial_${n}`, result);
    return result;
  }
  
  clearCache() {
    this.cache.clear();
  }
}
```

### 8.3 디바운싱 (키보드 입력)
```javascript
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 사용 예
const debouncedUpdate = debounce((value) => {
  display.update(value);
}, 50);
```

---

## 9. 테스트 전략

### 9.1 단위 테스트
```javascript
// calculator.test.js (Jest 사용 예시)
describe('Calculator', () => {
  let calculator;
  
  beforeEach(() => {
    calculator = new Calculator();
  });
  
  test('basic addition', () => {
    expect(calculator.calculate('+', 2, 3)).toBe(5);
  });
  
  test('division by zero throws error', () => {
    expect(() => calculator.calculate('÷', 5, 0))
      .toThrow('Division by zero');
  });
  
  test('factorial of 5', () => {
    expect(calculator.factorial(5)).toBe(120);
  });
});
```

### 9.2 통합 테스트
```javascript
describe('Calculator Integration', () => {
  test('complex expression: (5² + √16) × π', () => {
    calculator.inputNumber('5');
    calculator.performAction('x²');
    calculator.performAction('+');
    calculator.performAction('√');
    calculator.inputNumber('16');
    calculator.performAction('×');
    calculator.performAction('π');
    calculator.performAction('=');
    
    expect(calculator.getResult()).toBeCloseTo(90.8495, 4);
  });
});
```

### 9.3 E2E 테스트 (브라우저 자동화)
```javascript
// Playwright 사용 예시
test('user can perform basic calculation', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  await page.click('[data-value="2"]');
  await page.click('[data-action="+"]');
  await page.click('[data-value="3"]');
  await page.click('[data-action="="]');
  
  const result = await page.textContent('#result');
  expect(result).toBe('5');
});
```

---

## 10. 배포 및 빌드

### 10.1 개발 환경 설정
```json
// package.json
{
  "name": "calculator-webapp",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "jest",
    "lint": "eslint js/**/*.js"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "jest": "^29.0.0",
    "@playwright/test": "^1.40.0",
    "eslint": "^8.0.0"
  }
}
```

### 10.2 Vite 설정
```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Calculator/', // GitHub Pages 저장소 이름에 맞게 수정
  root: './',
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
```

### 10.3 GitHub Actions 워크플로우
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 10.4 GitHub Pages 설정
1. **저장소 설정**:
   - GitHub 저장소 → Settings → Pages
   - Source: "GitHub Actions" 선택

2. **브랜치 전략**:
   - `main` 브랜치에 푸시 시 자동 배포
   - Pull Request 시 빌드 검증 (선택사항)

3. **커스텀 도메인** (선택사항):
   - `CNAME` 파일을 `public/` 폴더에 추가
   - GitHub Pages 설정에서 커스텀 도메인 입력

### 10.5 배포 체크리스트
- [ ] `vite.config.js`에서 `base` 경로 설정
- [ ] `.github/workflows/deploy.yml` 파일 생성
- [ ] `package.json`에 빌드 스크립트 확인
- [ ] GitHub Pages 활성화
- [ ] CSS/JS 압축 및 번들링 (Vite 자동 처리)
- [ ] 이미지 최적화
- [ ] HTTPS 적용 (GitHub Pages 자동 제공)
- [ ] SEO 메타 태그 추가
- [ ] PWA manifest 생성 (Phase 2)
- [ ] 성능 테스트 (Lighthouse 90+ 목표)
- [ ] 첫 배포 후 URL 확인: `https://<username>.github.io/Calculator/`

---

## 11. 보안 고려사항

### 11.1 XSS 방지
```javascript
// 사용자 입력 sanitization
function sanitizeInput(input) {
  const allowedChars = /^[0-9+\-×÷%.()πe\s]+$/;
  return allowedChars.test(input) ? input : '';
}
```

### 11.2 CSP (Content Security Policy)
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self'; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src 'self' https://fonts.gstatic.com;">
```

---

## 12. 모니터링 및 로깅

### 12.1 에러 로깅
```javascript
class Logger {
  static logError(error, context) {
    console.error('[Calculator Error]', {
      message: error.message,
      type: error.type,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
    
    // 프로덕션: 에러 트래킹 서비스로 전송 (예: Sentry)
    // if (process.env.NODE_ENV === 'production') {
    //   Sentry.captureException(error);
    // }
  }
  
  static logPerformance(metric, value) {
    console.log(`[Performance] ${metric}: ${value}ms`);
  }
}
```

### 12.2 성능 측정
```javascript
class PerformanceMonitor {
  measureCalculation(operation, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    Logger.logPerformance(`${operation} calculation`, end - start);
    return result;
  }
}
```

---

## 13. 브라우저 호환성

### 13.1 필수 기능 지원
| 기능 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| ES6 Modules | ✅ 61+ | ✅ 60+ | ✅ 11+ | ✅ 16+ |
| CSS Grid | ✅ 57+ | ✅ 52+ | ✅ 10.1+ | ✅ 16+ |
| CSS Custom Properties | ✅ 49+ | ✅ 31+ | ✅ 9.1+ | ✅ 15+ |
| Math Object | ✅ All | ✅ All | ✅ All | ✅ All |

### 13.2 Polyfill (필요시)
```javascript
// 구형 브라우저 지원 (선택사항)
if (!Math.log10) {
  Math.log10 = function(x) {
    return Math.log(x) / Math.LN10;
  };
}
```

---

## 14. 향후 기술 개선 (Phase 2)

### 14.1 PWA 전환
- Service Worker 등록
- 오프라인 캐싱
- App Manifest 생성
- 홈 화면 추가 지원

### 14.2 고급 기능
- Web Workers로 복잡한 계산 오프로드
- IndexedDB로 계산 히스토리 저장
- WebAssembly로 성능 크리티컬 연산 최적화

### 14.3 접근성 향상
- ARIA live regions로 스크린 리더 지원 강화
- 키보드 단축키 커스터마이징
- 고대비 모드 지원

---

## 15. 부록

### 15.1 수학 상수 정의
```javascript
const CONSTANTS = {
  PI: Math.PI,              // 3.141592653589793
  E: Math.E,                // 2.718281828459045
  LN2: Math.LN2,            // 0.6931471805599453
  LN10: Math.LN10,          // 2.302585092994046
  LOG2E: Math.LOG2E,        // 1.4426950408889634
  LOG10E: Math.LOG10E,      // 0.4342944819032518
  SQRT2: Math.SQRT2,        // 1.4142135623730951
  SQRT1_2: Math.SQRT1_2     // 0.7071067811865476
};
```

### 15.2 연산자 우선순위
```javascript
const PRECEDENCE = {
  '+': 1,
  '-': 1,
  '×': 2,
  '÷': 2,
  '%': 2,
  'xʸ': 3,
  '!': 4
};
```

### 15.3 참고 자료
- [MDN - Math Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
- [IEEE 754 Floating Point](https://en.wikipedia.org/wiki/IEEE_754)
- [Shunting Yard Algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm)
- [Web Performance Best Practices](https://web.dev/performance/)

---

**문서 버전**: 1.0  
**최종 수정일**: 2025-12-23  
**작성자**: Antigravity AI  
**검토자**: [이름]
