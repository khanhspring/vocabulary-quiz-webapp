This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Requirements
- Nodejs version 22.0.0 or above
- Npm version 10.0.0 or above

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project structure
_The project follow [Atomic structure](https://ijlalwindhi.medium.com/implementing-atomic-design-in-next-js-projects-9d7e5bbcece4), and use [Shadcn/ui](https://ui.shadcn.com/) to create re-usable components (Button, Input, Calendar,...)_

```textmate
src
--- app
--- components
--- --- atoms // contains basic components that are base components to build up complex components
--- --- molecules // combinations of atoms forming larger components
--- --- organisms // collections of molecules that form more complex UI sections with specific functions
--- --- templates // page structures showing how components are arranged to form different layouts
--- --- pages // concrete implementations of templates with actual content
--- --- ui // contains Shadcn/ui components
```

_Updating..._

## Coding conventions
- This project follow Airbnb coding styles, but you don't need to care much about it, because rules are already setup, when any rule is violated, it will show up on your editor/IDE, you need to fix it, if no, you can not to commit the code
