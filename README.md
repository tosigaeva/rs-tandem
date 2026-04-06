# JS Interview Trainer

**JS Interview Trainer** is an interactive JavaScript training platform with modular widgets.
It provides hands-on exercises, tracks performance in real-time, and helps learners improve efficiently.


## About the Project

Tandem: Widget Trainer is designed to make JavaScript learning interactive and practical.

The platform uses modular widgets to deliver hands-on exercises, manage training sessions, and provide real-time performance analytics.

Its flexible architecture allows for easy addition of new exercises and scalable session management, helping learners improve efficiently.

The application includes multiple training formats to cover different learning scenarios:

- Quiz
- True/False
- Code Completion
- Code Ordering
- Async Sorter
- Big-O Notation
- Flip Card

## What are we proud of?

## Deploy link
[![View Deployed App](https://img.shields.io/badge/View-Deployed%20App-000000?style=flat&logo=vercel&logoColor=white)](https://rs-tandem.vercel.app/)

## Demo Video
[![Watch on YouTube](https://img.shields.io/badge/Watch-YouTube-FF0000?style=flat&logo=youtube&logoColor=white)](https://youtube.com/your-video-link)


## Team

- **Alena Deviatova**  
  [![GitHub](https://img.shields.io/badge/GitHub-deviatovae-181717?style=flat&logo=github)](https://github.com/deviatovae)

- **Anastasiia Barkovskaia**  
  [![GitHub](https://img.shields.io/badge/GitHub-tosigaeva-181717?style=flat&logo=github)](https://github.com/tosigaeva)
  [![Dev Diary](https://img.shields.io/badge/Dev%20Diary-Notes-blue?style=flat&logo=github)](./development-notes/tosigaeva)

- **Merab Kopaleishvili**  
  [![GitHub](https://img.shields.io/badge/GitHub-mero93-181717?style=flat&logo=github)](https://github.com/mero93)
  [![Dev Diary](https://img.shields.io/badge/Dev%20Diary-Notes-blue?style=flat&logo=github)](./development-notes/mero93)

- **Anastasiya Krauchuk**  
  [![GitHub](https://img.shields.io/badge/GitHub-hamsterk-181717?style=flat&logo=github)](https://github.com/hamsterk)
  [![Dev Diary](https://img.shields.io/badge/Dev%20Diary-Notes-blue?style=flat&logo=github)](./development-notes/hamsterK)

## Board

[![GitHub Projects](https://img.shields.io/badge/GitHub-Project-181717?style=flat&logo=github)](https://github.com/users/tosigaeva/projects/1)

![Board](./development-notes/github-project-board.png)

## Top PRs
- [feat: widget engine #42](https://github.com/tosigaeva/rs-tandem/pull/42)
- [feat: learning widget implementation #43](https://github.com/tosigaeva/rs-tandem/pull/43)
- [feat: pagination on library page #77](https://github.com/tosigaeva/rs-tandem/pull/77)
- [feat: add locale string type and implement translation based on locale, clean up topic types, update mock files
  #100](https://github.com/tosigaeva/rs-tandem/pull/100)
- [feat: answer validation #123](https://github.com/tosigaeva/rs-tandem/pull/123)
- [feat: implement question ordering #139](https://github.com/tosigaeva/rs-tandem/pull/139)

## Meeting Notes

- [Note #1](./meeting-notes/meeting-2026-02-13.md)
- [Note #2](./meeting-notes/meeting-2026-02-18.md)
- [Note #3](./meeting-notes/meeting-2026-03-01.md)

## Project Structure

## Tech Stack

### Frontend
- **Framework:** Next.js 16
- **Library:** React 19
- **Styling:** Tailwind CSS 4, clsx, tailwind-merge
- **UI Components:** Shadcn/UI, Radix UI, Lucide Icons
- **Animations:** Framer Motion, Embla Carousel
- **Code Highlighting:** react-syntax-highlighter
- **Utilities:** date-fns, js-cookie, react-use

### State Management & Data
- **State:** Zustand
- **Forms:** react-hook-form, @hookform/resolvers, @hookform/devtools
- **API & Data Fetching:** @tanstack/react-query
- **Validation:** Zod

### Backend & Auth
- **Database/Auth:** Supabase (@supabase/supabase-js, @supabase/auth-helpers-nextjs, @supabase/ssr)
- **Authentication:** NextAuth.js

### Testing
- **Unit & Integration Testing:** Jest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event
- **Mocks:** jest-canvas-mock

### Tooling & Dev
- **TypeScript & Node:** TypeScript 5, ts-node, @types/* packages
- **Linting:** ESLint, eslint-config-next, eslint-config-prettier, eslint-plugin-*
- **Formatting:** Prettier
- **Hooks:** Husky, lint-staged

### Other
- **Notifications:** Sonner
- **Text Highlighting:** react-highlight-words
- **Animations/Effects:** react-confetti


## Setup

```bash
# 1. Clone the repository
git clone https://github.com/tosigaeva/rs-tandem.git
cd rs-tandem

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```