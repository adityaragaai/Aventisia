# Aventisia Knowledge Base UI

A premium, modern React application for managing external knowledge bases seamlessly. Built with a focus on polished UI, responsive design, and smooth user interactions. This application allows users to orchestrate vector stores, AI models, and document knowledge bases from a centralized dashboard.



<img width="2854" height="1446" alt="image" src="https://github.com/user-attachments/assets/5540cd1e-a949-4209-8b43-2173b766553c" />
<img width="2864" height="1467" alt="image" src="https://github.com/user-attachments/assets/9dd46b7a-b227-49b2-aa5d-c9caa0aa7e41" />
<img width="2852" height="1435" alt="image" src="https://github.com/user-attachments/assets/651fa49c-f970-45f4-8907-812eb5739911" />




## 🚀 Features

* **Full CRUD Functionality**: Create, Read, Update, and Delete Knowledge Bases seamlessly in real-time.
* **Smart Search**: Find specific knowledge base cards instantly through an optimized client-side text search (filtering by Name or Description).
* **Responsive Layout**: Designed to look and function perfectly across all devices (Desktop, Tablet, Mobile) with fluid containers.
* **Collapsible Sidebar**: A dynamic sidebar that minimizes into a sleek icon-only view to maximize workspace real estate, complete with smooth CSS transitions.
* **Slide-over Drawer**: A fully functional, state-driven slide-out "Create/Edit" drawer utilizing controlled form inputs and validation.
* **Premium Typography & Aesthetics**: Incorporates modern utility-first CSS styling leveraging custom color palettes, sleek drop shadows, and web-safe Google fonts (`Inter` and `Outfit`).

## 🛠️ Technology Stack

* **Framework:** [React 19](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Language:** TypeScript
* **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Utilities:** `clsx` and `tailwind-merge` for robust class string management.

## 📦 Installation & Setup

To get this project up and running locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adityaragaai/Aventisia.git
   cd Aventisia
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the application:**
   Open your browser and navigate to `http://localhost:5173/`

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── CreateKBDrawer.tsx # slide-over side drawer for configuration
│   ├── Header.tsx         # Full-width top navigation bar
│   ├── KBCard.tsx         # Grid card representing a distinct Knowledge Base
│   ├── Layout.tsx         # Main structural layout wrapper
│   └── Sidebar.tsx        # Collapsible left navigation menu
├── pages/
│   └── KnowledgeBase.tsx  # Main page bringing together search, cards, and data
├── App.tsx              # Router / Implementation entry
├── main.tsx             # ReactDOM rendering root
└── index.css            # Global CSS styles including custom Tailwind layers
```

---

