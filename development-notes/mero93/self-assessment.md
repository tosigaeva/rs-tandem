# Self Assessment

**Self-Assessment PR Link:** [PR #149](https://github.com/tosigaeva/rs-tandem/pull/149)

**Personal Features:**

- Complex Components:
  - reusable CustomForm, CustomInput, CustomSelect, CustomInputArray components for handling forms (+25)
    - Admin Panel -> Question, Widget, Topic Lists (+25)
    - Admin Panel -> Question, Widget, Topic Forms (25)

- Rich UI Screen:
  - Authorization Page (+20)
  - Admin Panel (+20)
  - Navigation Bar (authorization, navigation, locale) (+20)

- Back-end Service:
  - set up of database schema, implement zod schemas for type safety, implement row guards on supabase, various views, triggers, functions to extend supabase functionality and overcome shortcomings (+30)
  - role-based access to complete CRUD functionality for Topics, Widgets, Questions (+30)

- BaaS Auth: (+15)
- BaaS CRUD: (+15)
- i18n: created LocaleProvider, state preservation, custom hooks, message storage (+10)
- Unit Tests (Basic): (+10)
- State Manager: (+10)
- Design Patterns: Singleton pattern, Middleware pattern, Skeleton pattern (UX), Strategy pattern (used in UX more promptly) (+10)
- Usage of React: (+5)
- Usage of Meta-Framework: SSR/SSG/ISR NextJs: (+10)

- **Total Score: 280**

---

**My PRs:**

| PR Link                                                 | implemented functionality                                                                                                                                                                                                                                        |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [#33](https://github.com/tosigaeva/rs-tandem/pull/33)   | initial setup of supabase, supabase middleware, supabase browser auhtorization api                                                                                                                                                                               |
| [#38](https://github.com/tosigaeva/rs-tandem/pull/38)   | login page for sign in or registration                                                                                                                                                                                                                           |
| [#56](https://github.com/tosigaeva/rs-tandem/pull/56)   | add client side authorization service (for handling state) and navigation bar                                                                                                                                                                                    |
| [#59](https://github.com/tosigaeva/rs-tandem/pull/59)   | implement initial LocaleService with Zustand store                                                                                                                                                                                                               |
| [#74](https://github.com/tosigaeva/rs-tandem/pull/74)   | small fix for auth form and improve redirection to handle nested routes                                                                                                                                                                                          |
| [#80](https://github.com/tosigaeva/rs-tandem/pull/80)   | create database schemas, relations, initial fields and integrate library (Topics) page with database                                                                                                                                                             |
| [#100](https://github.com/tosigaeva/rs-tandem/pull/100) | add LocaleString schema and type, replace to-be-translated strings with LocaleString, implement translation and start translating, implement custom hooks for translation                                                                                        |
| [#116](https://github.com/tosigaeva/rs-tandem/pull/116) | improve authorization flow, UX                                                                                                                                                                                                                                   |
| [#120](https://github.com/tosigaeva/rs-tandem/pull/120) | add admin panel for CRUD operations, implement forms for Topics, Widgets, Questions, for questions implement dynamic Schema loading, handle states, race conditions                                                                                              |
| [#124](https://github.com/tosigaeva/rs-tandem/pull/124) | add i18n to FlipCard and BigO Components                                                                                                                                                                                                                         |
| [130](https://github.com/tosigaeva/rs-tandem/pull/130)  | implemented AuthStateProvider, LocaleStateProvider and moved initialization to server side, later implement initial state check from middleware by setting cookies                                                                                               |
| [#133](https://github.com/tosigaeva/rs-tandem/pull/133) | implement role-based authorization by adding roles to profiles table, which extends supabase auth table, update routes, permissions, middleware to handle admin role                                                                                             |
| [#138](https://github.com/tosigaeva/rs-tandem/pull/138) | add new functionalities and QoL to admin panel                                                                                                                                                                                                                   |
| [#139](https://github.com/tosigaeva/rs-tandem/pull/139) | implement questions ordering by sorting profile_questions info in a certain way, refactor library/id page, refactor widgets to have single source of truth, implement re-doing of questions, after all questions in widget/topic have been successfully answered |

---

**Me and the project**:

I mostly was concerned with App state, api/server integration, authorization, i18n, CRUD panel. This was my first experience with supabase and NextJs. At first it was challenging to get started, in the middle I realised I could change a lot and improve my code and to the end of the project I managed to improve most of my code.

For example, I moved authorization and locale state control to server, eliminating annoying flicker on page load. With supabase I didn't really like using PostgREST syntax, as I thought it was very limiting at times when dealing with difficult relations, aggregation and filtering. So I decided to implement custom Views in supabase.

Other than working on my components, I also helped around with i18n with elsewhere. I also concerned myself with having one source of truth for our models, since I thought it would help us write cleaner code. Also helped with Library page using custom View, caching and "saving progress" of session (by sorting recently answered questions back to the end of the list)

**Authorization Page**:

This was my first component and I tried to make a reusable, Factory Pattern-like component for handling different kinds of forms. For this purpose I created type registry to handle zod. This was challenging, since we used strict lint rules and zod would complain a lot on specificity of types. I created CustomForm, CustomInput and could reuse this components in almost all other scenarios. Later I would also implement CustomSelector, CustomInputArray, LocaleInput for handling forms.

I changed how we used authentication a lot. In final version, I think it's most efficient and still safe: we are using middleware to upend cookies with user info to our html request. We then can retrieve cookie string, parse it back to user object and initialize our AuthStateProvider

**i18n**:

For initialization, we implemented LocaleString, which is type that contains en, ru, by string fields. We replaced normal string with LocaleString (and save it as jsonb in supabase), also created a global registry for messages in app and implemented custom hooks for translation.

**Admin Panel**:

Challenge with admin panel was with controlling states, displaying and handling different kinds of information in same column (question payload and answer payload), setting up actions to columns in table. For this cases I used Strategy Pattern and Factory Pattern respectively.

Most challenging part was Questions form, since it can dynamically update it's schema. React Hook forms didn't want to comply with this change and it would mess everything up, storing discarded fields, not validating properly. To fix this issue I implemented hard reset for state, re-trigger on demand, protective layer to filter out duplicate/constant triggers.

[**Authorization, Navigation Video**](https://youtu.be/gv08spf2O40)

[**Admin Panel Video**](https://youtu.be/zQUr0CwbSMk)
