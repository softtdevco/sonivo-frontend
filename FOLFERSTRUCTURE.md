## Project Structure
root/
│── public/                  # Static files (images, fonts, icons, etc.)
│── app/
|   ├── global.css                   # Next.js App Router
|  ├── layout.tsx           # Root layout for the app
│   ├── page.tsx             # Home page
│   ├── loading.tsx          # Global loading state
│   ├── error.tsx            # Global error boundary
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   ├── register/
│   │   |   ├── page.tsx
│   ├── dashboard/           # Protected dashboard routes
│   │   ├── layout.tsx       # Dashboard layout
│   │   ├── page.tsx         # Dashboard homepage
│   ├── api/                 # Next.js Server Actions & API routes
│   │   ├── auth/
│   │   │   ├── route.ts     # Auth API (e.g., login, register)
│   │   ├── users/
│   │   |    ├── route.ts     # User-related API routes
│── assets/                  # Static assets (images, fonts, etc.)
│   ├── images/
│   ├── icons/
│   ├── styles/
│── components/              # Reusable components
│   ├── ui/                  # UI Components (buttons, modals, inputs, etc.)
│   ├── layout/              # Layout components (Navbar, Sidebar, Footer)
│   ├── forms/               # Form components
│   ├── providers/           # Context and provider components
│── config/                  # Configuration files
│   ├── api.ts               # API configuration
│   ├── theme.ts             # Theme configuration
│   ├── constants.ts         # Global constants
│── lib/                     # Utility functions and external libraries
│   ├── auth.ts              # Authentication functions
│   ├── helpers.ts           # Helper functions
│   ├── fetcher.ts           # Data fetching utility
│── services/                # API request handlers
│   ├── authService.ts       # Authentication services
│   ├── userService.ts       # User-related services
│── store/                   # Global state management (Zustand, Redux, etc.)
│   ├── userSlice.ts         # Redux slice or Zustand store
│   ├── cartSlice.ts
│── types/                   # TypeScript types and interfaces
│   ├── index.ts             # Global types
│   ├── user.ts              # User-related types
│── middleware.ts            # Next.js Middleware
│── utils/                   # Utility functions
│   ├── dateFormatter.ts     # Date formatting functions
│   ├── validators.ts        # Input validation functions
│── hooks/                   # Custom hooks
│   ├── useAuth.ts           # Authentication hook
│   ├── useTheme.ts          # Theme hook
│── tests/                   # Test files
│   ├── __mocks__/           # Mock data for tests
│   ├── __tests__/           # Unit and integration tests
│   ├── e2e/                 # End-to-end tests
│── cypress/                 # Cypress test setup
│── .env                     # Environment variables
│── .gitignore               # Git ignore file
│── next.config.js           # Next.js configuration
│── tsconfig.json            # TypeScript configuration
│── package.json             # Dependencies and scripts
│── README.md   