# WOM Project - Product Market

A React Native mobile application built with Expo for a Product Market platform. This project features Firebase Authentication, product listing from an external API, and a dynamic dark/light theme system.

## 🚀 Features

- **Authentication**: Secure login and registration using Firebase Auth (Email/Password).
- **Product Market**: Browse a list of products fetched from an external API.
- **Product Details**: Detailed view for each product including gallery, rating, and stock information.
- **Theme System**: Global dark and light mode support with a toggle in the navigation header.
- **Modern State Management**: Uses Zustand for authentication and theme states.
- **Optimized Data Fetching**: Implements a resource-based fetching approach using React's `use` hook and caching.

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **Language**: TypeScript
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Navigation**: [React Navigation 7](https://reactnavigation.org/)
- **API Client**: Axios
- **Backend Service**: Firebase (Authentication)
- **Styling**: React Native StyleSheet with dynamic theme tokens

## 📂 Project Structure

```text
src/
├── api/            # API services, Axios instance, and Firebase config
├── components/     # Reusable UI components (ProductCard, Feedback, ThemeToggle)
├── constants/      # App constants and Theme configurations
├── context/        # React Context (ThemeProvider)
├── hooks/          # Custom hooks (Product resource hooks)
├── navigation/     # Navigation configuration (RootNavigator)
├── screens/        # Screen components (Login, Home, Detail)
├── store/          # Zustand stores (Auth, Theme)
├── types/          # TypeScript type definitions
└── utils/          # Helper functions
```

## ⚙️ Setup & Installation

1.  **Clone the repository**
2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Configure Firebase**
    Update `src/api/firebaseConfig.ts` with your Firebase project credentials.
4.  **Run the application**
    ```bash
    # Start Expo
    npm run start

    # Run on Android
    npm run android

    # Run on iOS
    npm run ios
    ```

## 🎨 Theme Customization

The theme system is defined in `src/constants/theme.ts`. You can easily customize colors for both light and dark modes by modifying the `lightColors` and `darkColors` objects. Components can consume these colors using the `useTheme()` hook from `src/context/ThemeContext.tsx`.

## 📄 License

Private Project - All Rights Reserved.
