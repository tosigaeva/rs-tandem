| Feature | PR links | Score |
|----------|----------|----------|
| Landing Page | [PR #25](https://github.com/tosigaeva/rs-tandem/pull/25)<br>[PR #99](https://github.com/tosigaeva/rs-tandem/pull/99) | 5 points - responsive |
| 404 Page | [PR #34](https://github.com/tosigaeva/rs-tandem/pull/34) | animation (no extra points)|
| Flip Card widget (learning mode) | [PR #43](https://github.com/tosigaeva/rs-tandem/pull/43)<br>[PR #105](https://github.com/tosigaeva/rs-tandem/pull/105) | 25 points — complex component<br>10 points - advanced animations (card turning) |
| Big O widget | [PR #72](https://github.com/tosigaeva/rs-tandem/pull/72)<br>[PR #75](https://github.com/tosigaeva/rs-tandem/pull/75)<br>[PR #112](https://github.com/tosigaeva/rs-tandem/pull/112) | 25 points — complex component<br>20 points - canvas 2d |
| Unit tests | [PR #79](https://github.com/tosigaeva/rs-tandem/pull/79) | 20 points — around 50% of code covered by tests (Big O widget is the biggest component done by me |
| Frameworks - React / Next.js | - | 5 points - react<br>10 points - next.js |
| **Total** | => | **120 points** |


***

**Me and the project**

I contributed into development of predefined components and have been part of the team processes. At the same time, I needed to learn new technologies (react and Next.js) in order to be able to build the desired components.
Some of the things that I have done are:
- Built some common components (landing page, 404 page)
- Designed and implemented interactive widgets - flip-card and big o notation
- Participated in discussion of the project development
- Conducted code reviews
- Participated in bug fixing of components developed by others

As part of this project, I worked with react and next.js as the technologies defined within the team. But also I used more 'classic' technologies to implement my widget ideas: js+typescript+css.

The biggest challenge was to work in a team: I had to resolve conflicts when interacting with other team members components and even fix my own components after they have been updated as part of the integration into common widget runner (initially I created mine in integration with a temporary more simple widget runner). It was also a challenge to decide - what to do and in what order (and some ideas remained ideas for now due to 'teamwork challenges'). But at the same time - I am happy I could work at my own pace with my personal components where I practiced more 'classic' js.

***

**Flip Card Component**

The FlipCard component presents a term on the front side and its definition on the back side. The user interacts with the card in the following way:
- Initially, the term is displayed.
- When the user selects whether they know or do not know the answer, the card flips to reveal the definition.
- The user can then proceed to the next item while their response is recorded.

I built this component using React with TypeScript, focusing on clean state management and reusable structure.

Technical implementation:
- isFlipped controls the card rotation.
- selected stores the user’s answer ("know" / "don’t know").
- Clicking an answer triggers both selection and card flipping.
- Event propagation is controlled using event.stopPropagation() to prevent unintended flips.
- The handleNext function ensures that the answer is processed (onCheck) before moving forward (onNext).

The flip effect is implemented using CSS 3D transforms:
- perspective creates a 3D space.
- transform-style: preserve-3d maintains depth for child elements.
- rotateY(180deg) is used to flip the card.
- backface-visibility: hidden ensures only one side is visible at a time.
This approach keeps animation smooth and performant without relying on external libraries.

The component is designed to be modular and reusable:
- It receives data via a questionPayload.
- Logic for checking answers and navigating is passed through props (onCheck, onNext).
- It integrates with shared UI components such as Card, Button, and Hint.

This separation of concerns allows the component to remain flexible and easy to integrate into different learning flows.

The component uses a translation hook to support multiple languages:
- translate() is used for dynamic content (term/definition).
- t() is used for UI labels.

The FlipCard component helped me practice implementation of an interactive, user-focused feature from scratch. I practiced work with CSS animations, React, asynchronous user interactions.

***

**BigO Component**

The main goal of this component is to teach users how to recognize time complexity (Big O notation) by combining code analysis with graphical intuition.

The interaction flow is as follows:
- The user is presented with a programming problem and a code example.
- A graph displays multiple time complexity curves (e.g., O(1), O(log n), O(n), etc.).
- The user selects the curve they believe matches the algorithm’s complexity.
After submission:
- The selected curve is highlighted.
- The result is visually validated (correct or incorrect).
- The user can then proceed to the next question.


Technical implementation:

I implemented this component using React with TypeScript, with a focus on canvas rendering =>
- selectedComplexity tracks the user’s chosen answer.
- isSubmitted controls whether the answer has been checked.
- isCorrect stores the evaluation result.
- Additional internal state tracks hovered and selected graph lines.
- A container component (DefaultComponent) handling state and business logic.
- A presentational component (BigOCanvas) responsible for rendering and interaction.
- Mouse movement dynamically detects the closest curve using geometric calculations.
- Clicking selects the nearest complexity curve.
- Hovering displays a tooltip with the complexity name.

Core features:
- Custom Graph Rendering
- Axes are drawn using a dedicated drawAxes function.
- Complexity curves are generated dynamically from mathematical functions.
- Each complexity is defined as a function (e.g., n, log n, n²).
- The getClosestComplexity function calculates the shortest distance between the mouse position and all curves.
- The canvas is scaled using devicePixelRatio to ensure quality rendering on high-DPI screens.
- The component integrates with shared UI elements such as Card, PrimaryButton, Hint, and HoverCard.

Visual feedback:
- Selected curve is highlighted before submission.
- A tooltip appears on hover, improving discoverability.
- Colors are dynamically retrieved from CSS variables, ensuring consistency with the application theme.

After submission:
- Correct answer is shown in a success color.
- Incorrect answer is shown in an error color.
- The UI prevents interaction after submission to maintain consistency.

The component fully supports internationalization:
Questions and UI text are translated using the translation hook.

While building this component, I significantly improved my skills in:
- Working with the HTML Canvas API
- Translating abstract concepts (Big O) into interactive UI
- Handling complex user interactions (hover, click, proximity detection)
- Optimizing rendering for performance and visual clarity
