# 💠 Token Ticker Component

A client-side React component that fetches and displays token ticker data using GraphQL.

## 📖 Overview

This component retrieves a list of tokens (amount, price, and holder count) from a GraphQL API and renders the data in a responsive and theme-aware table UI. It's built with performance, user experience, and code readability in mind.

---

## ✨ Features

- ⚡ **GraphQL Integration**  
  Fetches data using [`graphql-request`](https://github.com/jasonkuhrt/graphql-request).

- 🔁 **Auto Refresh**  
  Automatically updates data every 20 seconds.

- 🔄 **Manual Refresh**  
  Includes a refresh button with loading feedback via spinner animation.

- 💡 **Skeleton UI**  
  Shows loading placeholders while fetching data.

- 🚀 **Memoized Rendering**  
  Optimized using `useCallback` and `useMemo` to avoid unnecessary re-renders.

- 🌗 **Dark Mode Support**  
  Fully styled for light and dark themes using CSS variables and Tailwind.

- 📱 **Responsive & Accessible**  
  Built with semantic HTML and accessible components.

---

## 🔗 Live Demo

👉 [View the deployed version](https://aoro-ticker-pmoq6uhfx-okimjaes-projects.vercel.app/)

---

## 🛠 Tech Stack

- **React** with Server Components  
- **GraphQL Yoga** (API layer)  
- **Tailwind CSS** for UI styling  
- **ShadCN/UI** for reusable components  
- **Next.js (App Router)**