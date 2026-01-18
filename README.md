# JobPulse 🚀

> 여러 취업 채널의 지원 현황을 통합 관리하고, 기업/공고 정보를 근거 기반으로 요약하며, 이력서를 AI로 진단하는 취업 지원 플랫폼

## 🎯 주요 기능

### 📋 지원현황 통합 관리
- 칸반 보드 기반 파이프라인 (관심 → 지원 → 서류 → 면접 → 오퍼)
- 드래그 앤 드롭으로 상태 변경
- 면접 일정 관리 및 알림
- Gmail/캘린더 연동으로 자동 업데이트

### 🏢 기업/공고 리서치
- RAG 기반 기업 정보 요약
- 출처 기반 신뢰성 있는 정보 제공
- 공고 JD 분석 및 키워드 추출

### 📄 이력서 AI 진단
- ATS 친화도 분석
- 임팩트/성과 표현 개선 제안
- 타겟 공고와의 키워드 매칭
- 버전별 점수 추적

## 🛠 기술 스택

### Frontend
- **Next.js 16** - React 기반 풀스택 프레임워크
- **React 19** - UI 라이브러리
- **TypeScript 5** - 타입 안정성
- **Tailwind CSS 4** - 유틸리티 CSS
- **TanStack Query** - 서버 상태 관리
- **Vitest** - 테스트 프레임워크

### Backend
- **FastAPI** - Python 고성능 API 프레임워크
- **PostgreSQL 16** - 관계형 데이터베이스
- **SQLAlchemy 2.0** - Async ORM
- **Alembic** - 데이터베이스 마이그레이션
- **Pytest** - 테스트 프레임워크

### AI/ML
- **OpenAI API** - LLM 기반 분석
- **LangChain** - RAG 파이프라인

### Infra
- **Docker Compose** - 컨테이너 오케스트레이션
- **GitHub Actions** - CI/CD

## 📁 프로젝트 구조

```
JobPulse/
├── apps/
│   ├── api/                    # FastAPI Backend
│   │   ├── app/
│   │   │   ├── auth/          # 인증 (Google OAuth)
│   │   │   ├── users/         # 사용자 관리
│   │   │   ├── applications/  # 지원 현황
│   │   │   ├── companies/     # 기업 정보
│   │   │   ├── jobs/          # 채용 공고
│   │   │   ├── resumes/       # 이력서 분석
│   │   │   ├── crawlers/      # 채용 크롤러
│   │   │   ├── core/          # 설정, 보안
│   │   │   └── db/            # 데이터베이스
│   │   ├── alembic/           # DB 마이그레이션
│   │   ├── tests/             # 테스트
│   │   └── requirements.txt
│   │
│   └── web/                    # Next.js Frontend
│       ├── src/
│       │   ├── app/           # 페이지 (App Router)
│       │   ├── components/    # UI 컴포넌트
│       │   ├── hooks/         # 커스텀 훅
│       │   └── lib/           # API 클라이언트, 유틸
│       ├── package.json
│       └── vitest.config.ts
│
├── .github/workflows/          # CI/CD
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🚀 시작하기

### 사전 요구사항
- Node.js 20+
- Python 3.11+
- PostgreSQL 16+
- Docker & Docker Compose (선택)

---

### 방법 1: 로컬 환경 세팅 (DB만 Docker)

#### 1. 환경 변수 설정

```bash
# 루트 디렉토리에서
cp .env.example .env
# .env 파일을 열어서 실제 값으로 수정
```

#### 2. PostgreSQL 실행 (Docker)

```bash
# 루트 디렉토리에서 DB만 실행(터미널에 직접 로그가 띄워짐)
docker-compose up db

# 또는 백그라운드 실행
docker-compose up -d db
```

> PostgreSQL을 로컬에 직접 설치한 경우 이 단계를 건너뛰세요.

#### 3. 백엔드 가상환경 세팅 (Python)

> 새 터미널을 열고 진행하세요.

**Windows (PowerShell)**
```powershell
cd apps/api

# 가상환경 생성
python -m venv venv

# 가상환경 활성화
.\venv\Scripts\Activate.ps1

# 의존성 설치
pip install -r requirements.txt

# 데이터베이스 마이그레이션
alembic upgrade head

# 서버 실행
uvicorn app.main:app --reload
```

**Windows (CMD)**
```cmd
cd apps/api

# 가상환경 생성
python -m venv venv

# 가상환경 활성화
venv\Scripts\activate.bat

# 의존성 설치
pip install -r requirements.txt

# 데이터베이스 마이그레이션
alembic upgrade head

# 서버 실행
uvicorn app.main:app --reload
```

**macOS / Linux**
```bash
cd apps/api

# 가상환경 생성
python3 -m venv venv

# 가상환경 활성화
source venv/bin/activate

# 의존성 설치
pip install -r requirements.txt

# 데이터베이스 마이그레이션
alembic upgrade head

# 서버 실행
uvicorn app.main:app --reload
```

**가상환경 비활성화**
```bash
deactivate
```

#### 4. 프론트엔드 세팅 (Node.js)

> 새 터미널을 열고 진행하세요.

```bash
cd apps/web

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

#### 5. 테스트 실행

**백엔드 테스트**
```bash
cd apps/api
# 가상환경 활성화 후
pytest
pytest --cov=app  # 커버리지 포함
```

**프론트엔드 테스트**
```bash
cd apps/web
npm test
npm run test:coverage  # 커버리지 포함
```

---

### 방법 2: Docker Compose (권장)

```bash
# 루트 디렉토리에서
cp .env.example .env
# .env 파일 수정 후

# 모든 서비스 실행
docker-compose up

# 백그라운드 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 서비스 중지
docker-compose down
```

**서비스 URL**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/api/docs

## 📝 환경 변수

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/jobpulse
SECRET_KEY=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
OPENAI_API_KEY=your-openai-api-key
```

## 📄 라이센스

MIT License

---

## 🌐 GitHub Pages 배포

### 자동 배포 (GitHub Actions)

1. **GitHub 리포지토리 설정**
   - Settings → Pages → Source를 "GitHub Actions"로 선택

2. **코드 푸시**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **자동 배포 완료**
   - `.github/workflows/deploy-pages.yml` 워크플로우가 자동 실행
   - 배포 URL: `https://<username>.github.io/jobpulse/`

### 수동 빌드 (로컬)

```bash
cd apps/web
npm run build
# 빌드 결과물: out/ 폴더
```

### 주의사항

- GitHub Pages는 **정적 호스팅**만 지원합니다
- 백엔드(API)는 별도 서버가 필요합니다 (Railway, Vercel, AWS 등)
- 프론트엔드는 Mock 데이터로 데모 가능합니다
