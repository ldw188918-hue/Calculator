# SOLID 원칙

## 원칙
**모든 코어 로직 구현은 SOLID 원칙을 따릅니다.**

## SOLID 5대 원칙

### 1. 📌 Single Responsibility Principle (단일 책임 원칙)
**하나의 클래스는 하나의 책임만 가져야 합니다.**

#### ✅ Good Example
```javascript
// Calculator 클래스는 계산 로직만 담당
class Calculator {
  calculate(operator, a, b) { /* ... */ }
}

// Display 클래스는 UI 업데이트만 담당
class Display {
  update(state) { /* ... */ }
}
```

#### ❌ Bad Example
```javascript
// 계산과 UI 업데이트를 모두 담당 (X)
class Calculator {
  calculate(operator, a, b) { /* ... */ }
  updateDisplay() { /* ... */ }
}
```

---

### 2. 🔓 Open/Closed Principle (개방-폐쇄 원칙)
**확장에는 열려 있고, 수정에는 닫혀 있어야 합니다.**

#### ✅ Good Example
```javascript
// 새로운 함수 추가 시 기존 코드 수정 없이 확장 가능
class ScientificFunctions {
  sin(x) { return Math.sin(x); }
  cos(x) { return Math.cos(x); }
  // 새로운 함수 추가 시 기존 메서드는 수정하지 않음
}
```

---

### 3. 🔄 Liskov Substitution Principle (리스코프 치환 원칙)
**하위 타입은 상위 타입을 대체할 수 있어야 합니다.**

부모 클래스의 인스턴스를 자식 클래스의 인스턴스로 대체해도 프로그램의 동작이 변하지 않아야 합니다.

---

### 4. 🎯 Interface Segregation Principle (인터페이스 분리 원칙)
**클라이언트는 자신이 사용하지 않는 메서드에 의존하지 않아야 합니다.**

#### ✅ Good Example
```javascript
// 메모리 기능만 필요한 곳에서는 Memory 클래스만 사용
class Memory {
  clear() { /* ... */ }
  recall() { /* ... */ }
  add(value) { /* ... */ }
}
```

---

### 5. 🔌 Dependency Inversion Principle (의존성 역전 원칙)
**구체적인 것이 아닌 추상적인 것에 의존해야 합니다.**

#### ✅ Good Example
```javascript
// 추상화된 인터페이스에 의존
class CalculatorApp {
  constructor(calculator, display, memory) {
    this.calculator = calculator;  // 구체적인 구현이 아닌 인터페이스에 의존
    this.display = display;
    this.memory = memory;
  }
}
```

---

## 적용 가이드

### 클래스 설계 체크리스트
- [ ] 클래스가 하나의 책임만 가지는가?
- [ ] 새로운 기능 추가 시 기존 코드를 수정하지 않아도 되는가?
- [ ] 클래스 간 의존성이 최소화되어 있는가?
- [ ] 각 메서드가 명확한 단일 기능을 수행하는가?

### 리팩토링 신호
- ⚠️ 클래스가 여러 이유로 변경되는 경우
- ⚠️ 메서드 이름에 'and', '또는' 가 들어가는 경우
- ⚠️ 클래스가 다른 클래스의 구체적인 구현에 의존하는 경우

---

## 프로젝트 적용 예시

### Calculator 클래스
- **책임**: 계산 상태 관리 및 기본 연산
- **원칙**: SRP - 계산 로직만 담당

### ScientificFunctions 클래스
- **책임**: 과학 함수 제공
- **원칙**: SRP, OCP - 새 함수 추가 시 확장 가능

### Memory 클래스
- **책임**: 메모리 저장/불러오기
- **원칙**: SRP, ISP - 메모리 기능만 제공

### Display 클래스
- **책임**: UI 업데이트
- **원칙**: SRP - 화면 표시만 담당

### Utils (PrecisionHandler, ErrorHandler)
- **책임**: 유틸리티 기능 제공
- **원칙**: SRP, ISP - 각각 독립적인 기능

---

## 금지 사항
- ❌ 하나의 클래스에 여러 책임 부여
- ❌ 구체적인 구현에 직접 의존
- ❌ 불필요한 메서드를 포함한 인터페이스

## 권장 사항
- ✅ 작은 클래스, 작은 메서드
- ✅ 명확한 책임 분리
- ✅ 의존성 주입 패턴 사용
