# 🧠 WikiQuiz AI

> Generate AI-powered quizzes from any Wikipedia article using Gemini 2.5 Flash + FastAPI + React

---

## 🚀 Features

- 🔗 Paste any Wikipedia URL and get a quiz instantly
- 🤖 Gemini 2.5 Flash generates 5–10 MCQ questions
- 🎯 4 options per question with correct answer + explanation
- 📊 Difficulty levels: Easy / Medium / Hard / Mixed
- ⏱️ 30-second timer per question in Take Quiz mode
- 🔄 Regenerate fresh questions for the same article
- 🗄️ PostgreSQL caching — same URL never scraped twice
- 📋 Full quiz history with search + pagination
- 🏆 Leaderboard per quiz
- 🌙 Dark / Light mode toggle
- 📤 Export quiz as JSON
- 👥 Key entity extraction (people, organizations, locations)
- 🔗 Related topics suggestions

---

## 🛠️ Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React (CRA)             |
| Backend   | FastAPI 0.111.0         |
| Database  | PostgreSQL 18           |
| Scraping  | BeautifulSoup4 4.12.3   |
| LLM       | Gemini 2.5 Flash        |
| Framework | LangChain 0.2.0         |
| ORM       | SQLAlchemy 2.0.30       |

---

## 📁 Project Structure

```
wikiquiz-ai/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── scraper.py
│   ├── llm_chain.py
│   ├── requirements.txt
│   ├── prompts/
│   │   ├── quiz_prompt.py
│   │   └── topics_prompt.py
│   └── routers/
│       ├── quiz.py
│       └── history.py
├── frontend/
│   └── src/
│       ├── App.jsx
│       ├── components/
│       │   ├── URLInput.jsx
│       │   ├── QuizCard.jsx
│       │   ├── TakeQuiz.jsx
│       │   ├── Timer.jsx
│       │   ├── ScoreBoard.jsx
│       │   ├── HistoryTable.jsx
│       │   └── DetailsModal.jsx
│       └── hooks/
│           ├── useQuiz.js
│           └── useTimer.js
├── sample_data/
│   ├── urls_tested.txt
│   └── outputs/
│       ├── alan_turing.json
│       └── black_hole.json
├── .env
└── README.md
```

---

## ⚙️ Setup & Run

### 1. Clone & configure

```bash
git clone <repo-url>
cd wikiquiz-ai
```

Create `.env` in root:

```env
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.5-flash-preview-04-17
DB_HOST=localhost
DB_PORT=5433
DB_NAME=wikiquiz
DB_USER=postgres
DB_PASSWORD=your_password
APP_HOST=0.0.0.0
APP_PORT=8000
```

### 2. Setup PostgreSQL

```sql
CREATE DATABASE wikiquiz;
```

### 3. Run Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Backend runs at: `http://localhost:8000`  
Swagger docs at: `http://localhost:8000/docs`

### 4. Run Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Endpoint                      | Description              |
|--------|-------------------------------|--------------------------|
| POST   | `/api/quiz/generate`          | Scrape + generate quiz   |
| GET    | `/api/quiz/preview?url=`      | Preview article title    |
| GET    | `/api/quiz/{id}`              | Get quiz by ID           |
| GET    | `/api/quiz/{id}/versions`     | Get all quiz versions    |
| POST   | `/api/quiz/{id}/regenerate`   | Generate new questions   |
| POST   | `/api/quiz/attempt`           | Submit quiz attempt      |
| GET    | `/api/leaderboard/{id}`       | Get quiz leaderboard     |
| GET    | `/api/history`                | All past quizzes         |
| GET    | `/api/history/{id}`           | Quiz detail + attempts   |
| GET    | `/api/stats`                  | Global stats             |

---

## 📸 Sample Output

See `sample_data/outputs/` for example quiz JSONs:
- `alan_turing.json` — 7 questions about Alan Turing
- `black_hole.json`  — 7 questions about Black holes

---

## 🧪 Tested URLs

```
https://en.wikipedia.org/wiki/Alan_Turing
https://en.wikipedia.org/wiki/Black_hole
https://en.wikipedia.org/wiki/Python_(programming_language)
https://en.wikipedia.org/wiki/World_War_II
https://en.wikipedia.org/wiki/Artificial_intelligence
```

---

## 👨‍💻 Built for

Deep Klarity via Smart Interviews — April 2026
