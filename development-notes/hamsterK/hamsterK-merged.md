# Date – 2026-02-18

## Done
1. After our previous team meeting, we have a list of possible 'games' that can be implemented as widgets. I proposed 6 ideas and shared the list in the Discord chat.  
2. I am in the progress of learning reactive programming and Next.js. This is a challenge for me because I don't have experience with React, as well as with Next.js. Finished basic Next.js course.

## Problems
- No one knows what to do and how to start actually doing something...

## Solutions
1. During our last meeting, we discussed what basic pages we might need to implement. I believe some notes were taken, so later this can be transferred to the Kanban board.  
2. I am learning about reactive programming so I can keep up with the rest of the team once we start taking tasks from the board.

## Plans
1. Learn more about concepts of reactive programming by reading articles / watching YouTube videos related to Next.js / React topics.
2. During our next meeting, we need to define which tasks need to be added to the board if missing.

## Time Spent
- ~7 hours for basic Next.js course  
- 1 hour meeting  
- 1 hour to think about ideas for widgets

***
### List of ideas for widgets that I shared with team members:
***
#### - Learning mode:
card status: 'learn', counter = 0,
if counter >= 3 => status is changed to 'finished'

Flow:
show card with question 
buttons: I know this / I don't know this

If I don't know this selected:
reveal question

If I know this selected:
reveal question
show buttons: 'PASS' (on click - card counter +=1) and 'FAIL'

=>
Show next card, if no more cards - show congrats message and 'reset' button.

***
### - Rocket Game (Canvas + Game Loop + Audio API + Physics?)

Rocket flies in space.
Fuel counter displayed on top.
Question appears on screen (short text), then short answers are present on screen as moving asteroids?

Controls - arrows (left and right)
Rocket touches correct answers = fuel++
Rocket touches wrong answers = explosion + fuel decrease
Explosion gives knockback force (physics?)

End game if fuel === 0 OR 10 questions finished.
Show 'Try again' and 'Return to main screen' buttons

***
### - Drag & Drop:
Put lines of code in correct order to form a function.
 ***
 ### - Quiz:
question and 4 options of answers
+ timer with auto skip

***
### - Stack sorting:

3 options:
Call stack
Microtask queue
Macrotask queue

Function appears - select option

***
### - Big O notation:

Function displayed => Select a dot/line on Big O notation graph (line highlighted on hover).
Correct selection - bright green highlight,
Wrong selection - red highlight


***

# Date – 2026-02-21

## Done
1. After our previous team meeting yesterday, we decided on brand color and general idea what to do the following week.
2. I started implementing landing page - basic page is done.

## Problems
- Tailwind is a challenge for me as I haven't worked with it before. As well as the idea of reactive programming - still new to me. Also I find it difficult to find cool ideas for landing page because we have no widgets yet and it's not clear for now what widget we'll manage to do.
- I had an idea with canvas animation for background for the landing page (bubbles on the background). But when I implemented it - I realized it looks stupid and removed it.

## Solutions
1. Reading tailwind documentation during development process. Experimenting a lot with class names to see how each class changes the layout.
2. I have an idea of 3d animation for user interaction, but we'll see if I manage to implement it next week.

## Plans
1. Learn about 3d and try to implement some 3d feature that user can interact with (some 3d model that starts animation on user interaction) - for landing page.

## Time Spent
- 1 hour meeting  
- Being confused, reading / watching about react and next.js - 4-5 hours?
- 3 hours for basic landing page while fighting tailwind
- 1 hour - searching for 3d model that can be implemented on landing page for interactivity

***

# Date – 2026-02-24

## Done
1. Basic landing page implemented
2. During the implementation, I experimented with next.js, tailwind, animations (framer-motion), 3d effects (played around with basic three.js)
2. I started learning react from scratch to not miss any fundamental knowledge required for future development

## Problems
1. I don't have experience with React / Next.js, so I need to go through some course to catch up on basics.
2. We need to think of data contracts for our widgets

## Solutions
1. I will follow React course on Udemy for now to catch up on basics before continuing. 
2. During our meeting today, we agreed to think what widgets we want to implement and what data format is needed for that. Deadline - thursday, and then we can discuss it during the meeting on friday.

## Plans
1. React course on Udemy.
2. Plan work on widgets (which ones I want to implement + decide on contracts)
3. Probably I'll also do a 404 page.

## Time Spent
- 0.5 hour meeting  
- React course yesterday+today - 3-4 hours?
- 1-2 hours for experiments with 3d effects/animations

***

# Date – 2026-02-26

## Done
1. Did some progress on react learning: components, jsx, props, state, general info about redux
2. Implemented 404 page
3. Implemented animated-counter component that I also used on 404 page for animation effect
4. Reviewed shadcn components, thinking which one of ready components can be useful for widgets implementation
5. Planned work on widgets that I want to implement
6. Did PR review, left a couple of comments (naming and dynamic display of the component)

## Problems
1. Still a lot to learn and understand. But this is not a problem, but rather just the way of life...

## Solutions
1. I will continue following react course on udemy to better understand the concepts.

## Plans
1. Keep learning (Udemy).
2. Start implementing the first widget - 'Learning mode'.

## Time Spent
- 4-5 hours - react learning
- 1 hour - 404 page implementation (+ experiments with animations)
- 1 hour - thinking about my plan on implementation of the first widget.

#

### Widget planning:
1. Learning mode
- Use carousel from shadcn to switch between cards?
- Use react-card-flip for flip animation?
- Also need button component - Yes/No buttons
- I might want to re-use animated-counter component to show that the time is running out (limit - 10 seconds per answer?) + auto wrong answer
- data for questions requests?: questionType?
- data needed for questions (responses): id?, question, answer OR status-finished, correct-counter, wrong-counter.

##### ! Another component that I need,  and probably which will be common: Finish pop-up (retry button / exit button + result). Trigger if on request for next question - 'finish' response?

#

2. Big O notation
- no idea for now, how I will draw the graph. Probably with canvas?
- id?, question, answer, allAnswers

#

3. Game with rocket?
- might be the hardest for me, but I want to try and see if I can do something more interactive and more of a gaming approach
- should it be 2d or 3d? probably will try 3d (three.js) so I can gain new experience
- id?, question, answer, allAnswers? The problem is, that only short questions with short answers can be used for this game (because I want to display answers as text inside of asteroids? so can be max 1 short word as an answer)

***

# Date – 2026-03-01

## Done
1. Did some progress on react learning on Udemy platform.
2. Started implementing 'Learning' widget component - with 2-side cards and carousel.
3. Added new colors for answer selection states to globals.css

## Problems
1. While implementing 2-side card for 'Learning' widget - I was hoping to use react-card-flip for flip animation. But it appeared to be it's incompatible with React 9+.

## Solutions
1. I created custom flip animation with css instead of using react-card-flip.

## Plans
1. Keep learning (Udemy).
2. Working on the widget: Redo logic of 'Next' button on 'Learning' widget. Probably update ui for 'Learning' widget?
3. Think of the logic on how to return the result of the question to the widget engine?

## Time Spent
- 2-3 hours - react learning
- 6 hours - working on 'Learning' widget component

***

# Date – 2026-03-04

## Done
1. Continue learning about the basics of React.
2. Reviewed the PR containing +/- our future widget engine.
3. Team meeting discussing widget engine.

## Problems
1. Lack of time due to busy days at work...

## Solutions
1. Once we have a finalized idea about how our widget engine should look like - it will be easier to work on new widgets and I could be more productive. In the mean time, I progress slowly AND thoughtfully at the same time.

## Plans
1. Keep learning + applying what I learned within the project.
2. Working on learning widget: think of how the result will be passed to the engine?
3. Think of the base for the next widget (what do I need to build the UI I want?).

## Time Spent
- 2-3 hours - react learning
- 1.5 hours - team meeting
- 1 hour - code review

***

# Date – 2026-03-08

## Done
1. Still is learning (next.js / react.js). Life is the endless process of learning.
2. Reviewed some PRs that allowed me to learn from my more experienced colleagues.
3. Team meetings where we discussed in what direction we are going.
4. Started working on Big O notation component (for widget) that will use canvas for drawing the notation. Base was created with the help of AI, but a lot of customization has been made after to fit my needs.
5. Made a video about my progress. Had to split it into 2 videos due to time constrains of the loom app (7 minutes total). Links:
- https://www.loom.com/share/9e386c20fe054b478781b31d4204bf17
- https://www.loom.com/share/92d23e945d1a4424b086bbad55cf6a73

## Problems
1. With the Big O notation that I am working on, the canvas part of my component isn't loaded nice and smoothly. I tried approach with skeleton and Suspension, but the final result was not good. I need to look more into it.
2. Cannot set our custom color inside the canvas due to server-side rendering? Decided to keep neutral black and red colors inside the canvas for now.
3. Pixelization of canvas element. Resolved by creating separate setupCanvas function where I define canvas size based on devicePixelRation.

## Solutions
1. Learn more about Suspension or other options to load the canvas element smoothly, about canvas in general, about react and next.js.

## Plans
1. Continue working on Big O notation component.
2. Adapt existing 'Learning' component if needed after integration of widget engine component (developed by another team member). 

## Time Spent
- 2 hours - couple of team meetings
- 2 hour - code reviews
- 5-6 hours - Big O notation component

***

# Date – 2026-03-10

## Done
1. Team meeting where we discussed what can be enhanced in the current app.
2. Worked on Big O notation for canvas api - integrated it into existing variant of widget runner.

## Problems
1. Started exploring options on how to add a tooltip for big o notation widget. If I decide to implement it - better to see the options on how to refactor existing code (maybe need to create some helper function for code re-usage to avoid repetition). Code that might need to be re-used - x-y position calculation.

## Solutions
1. Learn more about tooltip component from shadcn.

## Plans
1. Continue working on Big O notation component - look into tooltip implementation options.

## Time Spent
- 4 hours - Big O notation - integration into existing widget runner + refactoring.

***

# Date – 2026-03-13

## Done
1. Team meeting where we discussed the plans for the next few days and defined our priorities.
2. Finalized Big O notation widget. Even though there's a 'Tooltip' component in shadcn library - I decided to fo with 'Hover card' component as it doesn't require integration into the core of the app.
3. Did a couple of big code reviews.

## Problems
1. Need to implement unit tests till the end of the weekend.

## Solutions
1. During the meeting, we already defined the structure for our tests. Test files will be placed next to the files that need to be tested. And I plan to use jest for that purpose.

## Plans
1. Polish up landing page - maybe add some animation and to show off the widgets that we already have.
2. Implement unit tests for some of my components. Ideas: content of big-o-widget folder, content of flip-card folder, maybe as extra: animated counter.

## Time Spent
- 1 h - code reviews.
- 0.5 h - team meeting.
- 4h - polishing Big O notation widget
- 1h - exploring unit testing options

## Code Review
While working on the project, I had a chance to review the code iof my colleagues and to learn from them. But also I believe they can learn from me - that's why I leave comments and below are some examples.
In general - I always run the code to test it in action, but also look through the code itself and compare it with what has been deleted.

- [PR #77: feat: pagination on library page](https://github.com/tosigaeva/rs-tandem/pull/77) — 5 comments (pagination component behavior, file naming, possible type issue)
- [PR #38: Feat/21 login page](https://github.com/tosigaeva/rs-tandem/pull/38) — 1 comment (element positioning on the page + spent some time to review zod integration)
- [PR #42: Feat/widget engine](https://github.com/tosigaeva/rs-tandem/pull/42) — 3 comments (questions about implementation / structure - my teammate explained well the intentions of this PR and it's good we were able to clarify everything)

I will continue reviewing new PRs to gain even more experience.

***

# Date – 2026-03-15

## Done
1. Implemented unit tests for Big O notation widget component and helper functions. Used jest for this purpose as it seemed to be the most popular option for unit tests on js/next. Added needed config files, as well updated scripts list. So now the unit tests written by all the team members can be run with 'npm test'. Gained general idea on what can be tested within component in general.

## Problems
1. Needed to learn about jest in order to write some tests. Also I couldn't think of the scenarios for component testing first, because it's not just a simple function that has obvious return statement.

## Solutions
1. Before writing the tests - I asked AI for some examples, as well as for ideas for tests. Some of them I implemented, while others - decided to ignore to not over-complicate the testing scenarios.

## Plans
1. Look into UI effects that I can implement on the updated landing page. And update the mentioned page, obviously.
2. Dedicate some time to interview preparation. As now working with Next and being relaxed a bit after months of this difficult course, I am kind of forgetting some things about js/typescript.

## Time Spent
- 4 h learn about jest + write some tests.

## Tests written
- To make it clear, the tests I've written are 20 tests in total, BigOWidget.test.tsx and canvas.helpers.test.ts to be precise. Tests include positive checks for all the main functionality, using describe, it, render, expect to perform the checks. Pull request where it was implemented is:
[Feat: implement unit tests for big o component](https://github.com/tosigaeva/rs-tandem/pull/79)

***

# Date – 2026-03-18

## Done
1. Update landing page to make it more likeable, hehe. In order to achieve that, updated some styles and integrated Tab component from shadcn. As usual, it is a battle between me and tailwind in the meanwhile. Now the tabs switch between showcasing of 3 widgets: quiz, flip card, big o notation. I used map to generate elements, so if needed to add more of them - it's easy to do.

## Problems
1. Lack of time and also the need of time to kind of prepare for an interview. But I am able to help with at least minor enhancements for the project - polishing the components that I've developed previously.
2. I noticed that after integration of flip-card widget into newly developed question-runner - styles got broken, as well as behavior of the widget now is different from what is has been before. I will need to look into it and to adapt the widget to the new runner.

## Solutions
1. Dedicate time to refactoring, not a rocket science.

## Plans
1. Refactor previously developed widgets to work with introduced question-runner. I'll start with flip-card component, and we'll see how it goes.

## Time Spent
- 3 h for tab component / refactoring / exploring current state of previously developed widgets after question-runner integration.

***

# Date – 2026-03-21

## Done
1. Did some updates on flip-card widget to fix ui after widget runner integration.
2. Spent time preparing for interview.

## Problems
1. Flip-card still requires some work as current behavior doesn't match the initial one. But it gets postponed due to the oncoming interview.

## Plans
1. I will continue working on flip-card, but later after the interview.

## Time Spent
- 1 hour for basic ui updates. And countless hours for interview preparation - no idea how much as I've already forgot what I learnt for previous interview. So need to prepare again.

***

# Date – 2026-03-24

## Done
1. Passed the final interview and finally feel a bit of relaxation!
2. Updated flip-card implementation (ui and logic were broken after integration of our common widget runner).
3. Updated Big O widget - made it more consistent and added ui response on answer submit.
4. Started fixing some general issues, aka polishing.


## Problems
1. When working with flip-card, I had no problem of fixing the ui. I spent some time to fix the logic though. Because seems like it was significantly broken during previous commits in the scope of widget runner integration. Luckily, I easily re-created the behavior I initially planned it to have.
2. Within flip-card component, I used hoverCard component to show the hint message. But during testing, I noticed that on mobile version of the app we have issues with responsiveness of the hint functionality. That's why after some investigation I replaced hoverCard with custom Hint component based on Popover from shadcn.
3. To make it consistent, I also had to update hint in big o with ths custom Hint component. I kept the hoverCard inside the canvas though as it depends on mouse over position in my case and I wanted to keep it this way.
4. I need to do some more tasks to make sure I can get an adequate score. Maybe autotests and also work on localization on scope of my components. Just an idea for the future.

## Plans
1. Finish minor fixes on different screens (landing, account drop-down, login screen).
2. Integrate localization into my components.
3. Think of the tests (e2e).

## Time Spent
- 0.5 h team meeting
- 4-5h - components updates/fixes.

***

# Date – 2026-03-29

## Done
1. Polished up some components a bit - fixed minor issues on ui: landing (general improvements), account drop-down (fixed issue with persistent drop-down caused by dropdown component and its state management flow), improved login screen.


## Problems
1. I started looking into e2e tests implementation with playwright. But I guess I will work with it later on a personal project, as it doesn't make sense to automate tests that are not stable (and the app is still getting updated by my teammates). So decided not to implement e2e tests after all.
2. While fixing issues within other components - I really felt the pain of fixing bugs in someone else's code. As even if the fixes are small - it takes time and effort to look through all the related files, understand where the issue comes from and fix the problem without breaking something else. And I'm proud of it!

## Plans
1. Actually, I have a lot going on right now so I think this is the last diary entry. I still need to prepare for the end of the course during the next week: prepare summary of what has been done, prepare for the interviews (looks through my components and think of what I can tell about them after such a long time after the initial implementation). We are almost done, and after that - I will continue my learning journey, again...

## Time Spent
- 3-4h - components updates/fixes.