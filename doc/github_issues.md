# GitHub Issues - Calculator Web App

이 문서는 GitHub 저장소에 등록할 이슈들입니다. 각 이슈를 복사하여 GitHub Issues에 등록하세요.

---

## Issue #1: 테스트 프레임워크 설정

**Label**: `setup`, `testing`  
**Milestone**: Phase 4 - TDD 환경 설정

### 작업 배경
TDD 개발 방법론을 적용하기 위해 Jest 테스트 프레임워크를 설정해야 합니다. 현재 프로젝트에는 테스트 환경이 구축되어 있지 않습니다.

### 작업 내용
1. Jest 및 관련 의존성 설치
   ```bash
   npm install --save-dev jest @types/jest
   ```

2. `jest.config.js` 파일 생성
   - ES6 모듈 지원 설정
   - 테스트 파일 경로 패턴 설정
   - 커버리지 설정

3. `package.json`에 테스트 스크립트 추가
   ```json
   "scripts": {
     "test": "jest",
     "test:watch": "jest --watch",
     "test:coverage": "jest --coverage"
   }
   ```

4. `tests/` 디렉토리 구조 생성
   ```
   tests/
   ├── calculator.test.js
   ├── scientific.test.js
   ├── memory.test.js
   └── utils.test.js
   ```

5. 샘플 테스트 작성 및 실행 확인

### 인수 조건
- [ ] `npm test` 명령어가 정상 실행됨
- [ ] 샘플 테스트가 통과함
- [ ] `npm test:coverage` 실행 시 커버리지 리포트 생성됨
- [ ] Jest 설정이 ES6 모듈을 지원함

---

## Issue #2: Calculator - 기본 산술 연산 테스트

**Label**: `testing`, `core-logic`  
**Milestone**: Phase 5 - Calculator 클래스 TDD

### 작업 배경
Calculator 클래스의 기본 산술 연산 (+, -, ×, ÷, %)이 올바르게 동작하는지 검증하기 위한 테스트가 필요합니다. 현재는 테스트 없이 구현된 상태입니다.

### 작업 내용
`tests/calculator.test.js` 파일에 다음 테스트 작성:

1. **덧셈 테스트**
   - `2 + 3 = 5`
   - `0 + 0 = 0`
   - 음수 덧셈: `-5 + 3 = -2`
   - 소수점: `0.1 + 0.2 ≈ 0.3`

2. **뺄셈 테스트**
   - `5 - 3 = 2`
   - `3 - 5 = -2`
   - `0 - 5 = -5`

3. **곱셈 테스트**
   - `2 × 3 = 6`
   - `5 × 0 = 0`
   - `-2 × 3 = -6`

4. **나눗셈 테스트**
   - `6 ÷ 2 = 3`
   - `5 ÷ 2 = 2.5`
   - `0 ÷ 5 = 0`
   - 에러: `5 ÷ 0` → "Division by zero" 에러 발생

5. **퍼센트 테스트**
   - `10 % 3 = 1`
   - `5.5 % 2 = 1.5`

### 인수 조건
- [ ] 모든 기본 연산 테스트 통과
- [ ] 0으로 나누기 에러 처리 검증
- [ ] 소수점 연산 정밀도 검증 (`toBeCloseTo` 사용)
- [ ] 테스트 커버리지 90% 이상

---

## Issue #3: Calculator - 상태 관리 테스트

**Label**: `testing`, `core-logic`  
**Milestone**: Phase 5 - Calculator 클래스 TDD

### 작업 배경
Calculator 클래스가 내부 상태(currentValue, previousValue, operator, waitingForOperand)를 올바르게 관리하는지 검증해야 합니다.

### 작업 내용
1. **초기 상태 테스트**
   - currentValue는 '0'
   - previousValue는 null
   - operator는 null

2. **숫자 입력 테스트**
   - `inputNumber('5')` → currentValue = '5'
   - 연속 입력: `inputNumber('5')`, `inputNumber('3')` → '53'
   - 0 다음 입력: `inputNumber('0')`, `inputNumber('5')` → '5'

3. **소수점 입력 테스트**
   - `inputDecimal()` → currentValue = '0.'
   - `inputNumber('5')`, `inputDecimal()` → '5.'
   - 중복 소수점 방지

4. **연속 연산 테스트**
   - `2 + 3 + 4 = 9`
   - `10 - 3 - 2 = 5`

5. **AC/DEL 테스트**
   - `clear()` → 모든 상태 초기화
   - `delete()` → 마지막 문자 삭제
   - `delete()` on '5' → '0'

### 인수 조건
- [ ] 모든 상태 전환 시나리오 테스트 통과
- [ ] 연속 연산 테스트 통과
- [ ] AC/DEL 동작 검증
- [ ] 테스트 커버리지 95% 이상

---

## Issue #4: ScientificFunctions - 삼각 함수 테스트

**Label**: `testing`, `core-logic`, `scientific`  
**Milestone**: Phase 6 - Scientific Functions TDD

### 작업 배경
삼각 함수 (sin, cos, tan)의 정확도를 검증하고, 각도 입력이 올바르게 라디안으로 변환되는지 확인해야 합니다.

### 작업 내용
`tests/scientific.test.js` 파일에 다음 테스트 작성:

1. **sin 함수 테스트**
   - `sin(0) = 0`
   - `sin(30) ≈ 0.5`
   - `sin(45) ≈ 0.707`
   - `sin(90) = 1`

2. **cos 함수 테스트**
   - `cos(0) = 1`
   - `cos(60) ≈ 0.5`
   - `cos(90) ≈ 0`

3. **tan 함수 테스트**
   - `tan(0) = 0`
   - `tan(45) ≈ 1`

### 인수 조건
- [ ] 모든 삼각 함수 테스트 통과
- [ ] 부동소수점 비교 시 `toBeCloseTo()` 사용
- [ ] 각도 → 라디안 변환 검증
- [ ] 테스트 커버리지 100%

---

## Issue #5: ScientificFunctions - 로그 및 지수 함수 테스트

**Label**: `testing`, `core-logic`, `scientific`  
**Milestone**: Phase 6 - Scientific Functions TDD

### 작업 배경
로그 함수와 지수 함수의 정확도 및 에러 처리를 검증해야 합니다.

### 작업 내용
1. **ln (자연로그) 테스트**
   - `ln(1) = 0`
   - `ln(e) ≈ 1`
   - `ln(10) ≈ 2.303`
   - 에러: `ln(0)`, `ln(-5)` → "Math domain error"

2. **log (상용로그) 테스트**
   - `log(1) = 0`
   - `log(10) = 1`
   - `log(100) = 2`
   - 에러: `log(0)`, `log(-1)` → "Math domain error"

3. **지수 함수 테스트**
   - `exp(0) = 1`
   - `exp(1) ≈ 2.718`
   - `pow10(0) = 1`
   - `pow10(2) = 100`
   - 에러: `exp(1000)` → "Number too large"

4. **제곱/제곱근 테스트**
   - `sqrt(0) = 0`
   - `sqrt(4) = 2`
   - `sqrt(16) = 4`
   - 에러: `sqrt(-1)` → "Math domain error"
   - `square(2) = 4`
   - `cube(3) = 27`

### 인수 조건
- [ ] 모든 로그/지수 함수 테스트 통과
- [ ] 에러 케이스 검증 (음수, 0, 너무 큰 수)
- [ ] 테스트 커버리지 100%

---

## Issue #6: ScientificFunctions - 팩토리얼 함수 테스트

**Label**: `testing`, `core-logic`, `scientific`  
**Milestone**: Phase 6 - Scientific Functions TDD

### 작업 배경
팩토리얼 함수는 정수만 입력받고, 음수나 너무 큰 수에 대해 에러를 발생시켜야 합니다. 모든 엣지 케이스를 검증해야 합니다.

### 작업 내용
1. **기본 동작 테스트**
   - `factorial(0) = 1`
   - `factorial(1) = 1`
   - `factorial(5) = 120`
   - `factorial(10) = 3628800`

2. **에러 처리 테스트**
   - `factorial(-1)` → 에러
   - `factorial(3.5)` → 에러 (정수 아님)
   - `factorial(171)` → "Number too large"

### 인수 조건
- [ ] 모든 정상 케이스 테스트 통과
- [ ] 모든 에러 케이스 검증
- [ ] 테스트 커버리지 100%

---

## Issue #7: Memory 클래스 테스트

**Label**: `testing`, `core-logic`, `memory`  
**Milestone**: Phase 7 - Memory 클래스 TDD

### 작업 배경
Memory 클래스의 메모리 관리 기능(MC, MR, M+, M-)을 검증해야 합니다.

### 작업 내용
`tests/memory.test.js` 파일에 다음 테스트 작성:

1. **기본 동작 테스트**
   - 초기값: `recall() = 0`
   - `add(10)` → `recall() = 10`
   - `add(5)` → `recall() = 15` (누적)
   - `subtract(3)` → `recall() = 12`
   - `clear()` → `recall() = 0`
   - `hasValue()` → true/false

2. **복합 동작 테스트**
   - 연속 add
   - add + subtract 조합
   - 음수 메모리 값 처리

### 인수 조건
- [ ] 모든 메모리 기능 테스트 통과
- [ ] 상태 관리 검증
- [ ] 테스트 커버리지 100%

---

## Issue #8: Utils (PrecisionHandler) 테스트

**Label**: `testing`, `core-logic`, `utils`  
**Milestone**: Phase 8 - Utils TDD

### 작업 배경
PrecisionHandler의 숫자 포맷팅 및 정밀도 관리 기능을 검증해야 합니다.

### 작업 내용
`tests/utils.test.js` 파일에 다음 테스트 작성:

1. **round() 테스트**
   - 소수점 반올림
   - 기본값: 10자리

2. **formatDisplay() 테스트**
   - 긴 숫자 포맷팅
   - 과학적 표기법 변환

3. **상수 테스트**
   - `CONSTANTS.PI` 값 확인
   - `CONSTANTS.E` 값 확인

### 인수 조건
- [ ] 모든 유틸리티 함수 테스트 통과
- [ ] 테스트 커버리지 100%

---

## Issue #9: SOLID 원칙 리팩토링 - SRP 검토

**Label**: `refactoring`, `solid`, `architecture`  
**Milestone**: Phase 9 - SOLID 리팩토링

### 작업 배경
현재 코드가 단일 책임 원칙(SRP)을 준수하는지 검토하고, 클래스가 여러 책임을 가지고 있다면 분리해야 합니다.

### 작업 내용
1. **Calculator 클래스 검토**
   - 현재 책임: 계산 상태 관리 + 연산 수행
   - 분리 필요성 검토

2. **ScientificFunctions 클래스 검토**
   - 현재 책임: 모든 과학 함수 제공
   - 삼각함수/로그함수/지수함수 클래스 분리 검토

3. **리팩토링 실행**
   - 필요 시 클래스 분리
   - 모든 테스트 통과 유지

### 인수 조건
- [ ] 각 클래스가 하나의 책임만 가짐
- [ ] 모든 기존 테스트 통과
- [ ] 새로운 구조에 대한 문서화

---

## Issue #10: CI/CD에 테스트 통합

**Label**: `ci-cd`, `testing`, `automation`  
**Milestone**: Phase 11 - 통합 및 배포

### 작업 배경
GitHub Actions 워크플로우에 테스트 실행 단계를 추가하여, 테스트가 실패하면 배포가 중단되도록 해야 합니다.

### 작업 내용
`.github/workflows/deploy.yml` 파일 수정:

1. **테스트 Job 추가**
   ```yaml
   test:
     runs-on: ubuntu-latest
     steps:
       - uses: actions/checkout@v4
       - uses: actions/setup-node@v4
       - run: npm ci
       - run: npm test
       - run: npm test -- --coverage
   ```

2. **빌드 Job이 테스트에 의존하도록 설정**
   ```yaml
   build:
     needs: test
   ```

3. **커버리지 리포트 업로드** (선택사항)

### 인수 조건
- [ ] 테스트 실패 시 배포 중단됨
- [ ] 테스트 성공 시에만 빌드 진행
- [ ] GitHub Actions에서 테스트 결과 확인 가능

---

## 이슈 등록 방법

1. GitHub 저장소 → **Issues** → **New issue**
2. 위 템플릿 복사하여 붙여넣기
3. Label과 Milestone 설정
4. **Create issue** 클릭

## 우선순위

1. 🔴 **High Priority**: #1 → #2 → #3 → #7 (테스트 환경 + 핵심 기능)
2. 🟡 **Medium Priority**: #4 → #5 → #6 → #8 (과학 함수 + Utils)
3. 🟢 **Low Priority**: #9 → #10 (리팩토링 + CI/CD)
