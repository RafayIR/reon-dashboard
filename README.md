# Reon Site Dashboard

This project is a frontend dashboard for managing and viewing insights across multiple sites. 
It includes editable tables, trend comparison charts, and heatmaps for visualizing performance metrics.

## Setup Instructions

## 1. Clone the repository
```bash
git clone https://github.com/username/reon-dashboard.git
cd reon-dashboard
```
## 2. Install dependencies
npm install or yarn install

## 3 Set environment variables
VITE_API_BASE_URL = "http://localhost:5173/"

## 4 NOW Run the development server
npm run dev 
or
yarn dev


## Assumptions / Notes
- LocalStorage is used to simulate backend API responses.
- Axios is configured but not used for fetching site data yet. You can easily swap out localStorage with real API calls.
- Update actions simulate delay using setTimeout to mimic async behavior.
- The charts are built using echarts-for-react.
- data is loaded from jsons given to local storage when the app is started.

  ## Line Chart: Site Trends Comparison
    - Track performance trends for each site across defined time intervals (T1–T5).
    - Each site is represented as an individual line
    - Dynamic legend: Automatically populated from sites.map(s => s.siteName).

  ## Heatmap Chart: Site Performance Heatmap
    - Show performance intensity across sites and specific time intervals (T1–T3) in a compact grid.
    - Data Aggregation: Averages values per time interval to smooth fluctuations.
    - VisualMap: Shows the performance range (0–10) for context.


# TECH STACK
- React + Vite
- TypeScript
- Redux + Redux-Saga
- ECharts
- Ant Design
- Tailwind CSS



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration
If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:
```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
