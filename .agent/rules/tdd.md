# Test-Driven Development (TDD) 규칙

## 원칙
**UI를 제외한 모든 코어 로직은 TDD(Test-Driven Development)로 구현합니다.**

## 적용 범위

### ✅ TDD 적용 대상
- `js/calculator.js` - Calculator 클래스
- `js/scientific.js` - ScientificFunctions 클래스
- `js/memory.js` - Memory 클래스
- `js/utils.js` - 유틸리티 함수

### ❌ TDD 미적용 대상 (자동화 테스트 작성 안 함)
- `js/display.js` - UI 업데이트 로직 (수동 테스트만)
- `js/main.js` - 이벤트 핸들링 및 UI 통합 (수동 테스트만)
- CSS, HTML 파일

> **중요**: UI 관련 코드는 자동화 테스트를 작성하지 않습니다. 브라우저에서 수동으로 테스트합니다.

## TDD 사이클

### 1. 🔴 Red: 실패하는 테스트 작성
### 2. 🟢 Green: 테스트를 통과하는 최소한의 코드 작성
### 3. 🔵 Refactor: 코드 개선 (테스트 통과 유지)

## 테스트 작성 가이드

### 필수 테스트 항목
1. **정상 동작** (Happy Path)
2. **경계값** (Edge Cases)
3. **에러 처리**
4. **상태 관리**

### AAA 패턴 (Arrange-Act-Assert)
모든 테스트는 다음 패턴을 따릅니다:
- **Arrange**: 테스트 데이터 준비
- **Act**: 테스트 대상 실행
- **Assert**: 결과 검증

## 커버리지 목표
- **코어 로직: 90% 이상**
- 모든 public 메서드 테스트 필수
- 에러 처리 100% 커버리지

## 테스트 실행
```bash
npm test              # 모든 테스트 실행
npm test -- --coverage # 커버리지 확인
npm test -- --watch    # Watch 모드
```

## 금지 사항
- ❌ 테스트 없이 코어 로직 구현
- ❌ 테스트를 나중에 작성
- ❌ 통과하지 않는 테스트 커밋
- ❌ UI 코드에 자동화 테스트 작성

## 권장 사항
- ✅ 각 테스트는 하나의 기능만 검증
- ✅ 테스트는 독립적으로 실행 가능
- ✅ 테스트 이름은 명확하고 읽기 쉽게
