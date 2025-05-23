# Grind - Gamified Habit Tracker

Grind is a gamified habit tracker mobile app built with React Native and Expo. It transforms your daily habits and tasks into RPG-style quests, helping you level up your character as you progress in real life.

---

## Features

- **Gamified Habit Tracking:** Create quests with custom stats, difficulty, and types (positive/negative/both).
- **Character Progression:** Level up, gain XP, increase stats, and manage HP.
- **Dynamic Titles:** Earn unique titles as you reach higher levels.
- **Sound Effects:** Immersive audio feedback for actions (level up, menu, clicks, etc.).
- **Animated UI:** Neon effects, animated borders, and smooth transitions.
- **Persistent Storage:** All data is saved locally using AsyncStorage.
- **Daily Reset:** Quests reset daily to keep you on track.
- **Customizable Stats:** STR, AGI, INT, PER, VIT.
- **Responsive Design:** Works on Android and iOS devices.

---

## Tech Stack

- **React Native** (`react-native`, `react`)
- **Expo** (`expo`, `expo-av`, `expo-updates`)
- **State Management:** [`zustand`](https://github.com/pmndrs/zustand)
- **Navigation:** [`@react-navigation/native`](https://reactnavigation.org/)
- **Async Storage:** [`@react-native-async-storage/async-storage`](https://react-native-async-storage.github.io/async-storage/)
- **UI Styling:** [`nativewind`](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Icons:** [`@expo/vector-icons`](https://docs.expo.dev/guides/icons/)
- **Progress Bars:** [`react-native-progress`](https://github.com/oblador/react-native-progress)
- **Sound:** [`expo-av`](https://docs.expo.dev/versions/latest/sdk/av/)
- **Other:** `react-native-reanimated`, `react-native-gesture-handler`, `react-native-safe-area-context`, `react-native-svg`, `react-native-uuid`

---

## Screenshots

> Add your screenshots to `assets/screenshots/` and update the image paths below.

| Home Screen                | Quest Creation Dialog         | 
|----------------------------|------------------------------|
| ![hrpg_1](https://github.com/user-attachments/assets/937e9fa7-763c-4ef4-93bc-bac68008fcf7) | ![hrpg_2](https://github.com/user-attachments/assets/77f05dbc-6b08-4962-a1d4-f6507a290894) |



---

## Folder Structure

```
.
├── App.tsx
├── app.json
├── global.css
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── metro.config.js
├── babel.config.js
├── prettier.config.js
├── assets/
│   ├── adaptive-icon.png
│   ├── app-open.mp3
│   ├── bg-video-2.mp4
│   ├── click.mp3
│   ├── favicon.png
│   ├── icon.png
│   ├── levelUp.mp3
│   ├── menu.mp3
│   └── splash.png
├── components/
│   ├── CharacterPanel.tsx
│   ├── Quest.tsx
│   ├── QuestCreationDialog.tsx
│   ├── QuestList.tsx
│   └── utils/
│       ├── NeonText.tsx
│       ├── soundBox.tsx
│       └── titles.ts
├── screens/
│   └── HomeScreen.tsx
├── store/
│   ├── useStore.ts
│   └── utils.ts
├── types/
│   ├── questTypes.ts
│   └── storeType.ts
├── .expo/
├── .expo-shared/
└── ...
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (v9+ recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/):  
  ```sh
  npm install -g expo-cli
  ```

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/grind.git
   cd grind
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm start
   ```
   or for Android/iOS:
   ```sh
   npm run android
   npm run ios
   ```

4. **Open the app:**
   - Use the Expo Go app on your device, or
   - Run on an emulator/simulator.

---

## Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run lint` - Lint and check formatting
- `npm run format` - Auto-fix lint and formatting issues
- `npm run prebuild` - Prepare for native build (EAS)

---

## Configuration

- **Tailwind CSS:**  
  Configured via [`tailwind.config.js`](tailwind.config.js) and [`global.css`](global.css) using NativeWind.
- **TypeScript:**  
  Configured via [`tsconfig.json`](tsconfig.json).
- **Prettier & ESLint:**  
  Formatting and linting via [`prettier.config.js`](prettier.config.js) and ESLint config in [`package.json`](package.json).

---

## Customization

- **Assets:**  
  Place your custom icons, sounds, and splash screens in the [`assets/`](assets/) folder.
- **Titles:**  
  Customize level titles in [`components/utils/titles.ts`](components/utils/titles.ts).
- **Stats & Quests:**  
  Modify quest/stat logic in [`store/useStore.ts`](store/useStore.ts) and [`store/utils.ts`](store/utils.ts).

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

This project is licensed under the MIT License.

---

## Credits

- [Expo](https://expo.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Native](https://reactnative.dev/)
- [FontAwesome](https://fontawesome.com/)

---

## Contact

For questions, suggestions, or feedback, open an issue or contact [abhishek2022.work@gmail.com](mailto:abhishek2022.work@gmail.com).
