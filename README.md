# 🖋️ StorySync - Premium Tech Blogging Platform

MegaBlog is a modern, responsive, and full-featured tech blogging platform designed for developers, creators, and technical writers. It is built using **React 19**, **Redux Toolkit**, **Appwrite**, and visually styled with the next-generation **Tailwind CSS v4.0** featuring glassmorphism elements and an advanced dark/light theme switcher.

---

## 🚀 Key Features

- **🌓 Interactive Theme Switcher**: Toggle between light and dark modes with active `localStorage` persistence and smooth transitions.
- **📱 True Responsive Layout**: Mobile-first design equipped with a stateful hamburger collapse navigation menu.
- **🔐 Secure Authentication**: Multi-route protected auth layouts (Login/Signup) powered by Appwrite.
- **✍️ Rich Text Editing**: Full-blown content writing capabilities utilizing the TinyMCE rich text editor.
- **📁 Image Uploads & Previews**: Upload featured images directly to Appwrite Storage buckets with instantaneous preview handling.
- **📰 Blog Feed & Grid**: Clean glassmorphism grids featuring lazy-loaded images, line clamps, and interactive zoom highlights.

---

## 🛠️ Technology Stack

- **Core**: [React 19](https://react.dev/) + [Vite](https://vite.dev/) (for HMR and build optimizations)
- **Styling**: [Tailwind CSS v4.0](https://tailwindcss.com/) (using CSS-first configuration files)
- **State Management**: [@reduxjs/toolkit](https://redux-toolkit.js.org/) + `react-redux` (globally managing Auth states)
- **Backend-as-a-Service (BaaS)**: [Appwrite](https://appwrite.io/) (managing auth sessions, databases, and files)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) (optimized input renders and validations)
- **Content Parsing**: [html-react-parser](https://www.npmjs.com/package/html-react-parser) (parsing TinyMCE markup safely in React)

---

## 📂 Project Structure

```bash
src/
├── apprite/            # Appwrite service configurations (Auth, Database, Storage)
├── assets/             # Global media files and assets
├── components/         # Reusable UI elements
│   ├── container/      # Center layout wrappers
│   ├── Footer/         # Responsive footers
│   ├── Header/         # Navigation bars with theme toggle and mobile menus
│   ├── BlogForm/       # Responsive form grid (2-column layout)
│   └── index.js        # Centralized component exports
├── conf/               # Environmental variable configuration mapper
├── pages/              # Page components (Home, Blog, AddBlog, EditBlog, Login, Signup)
├── store/              # Redux slices and global store settings
├── App.css             # Main stylesheet imports
├── App.jsx             # Root layout wrapper with theme synchronization
├── index.css           # Global typography definitions, custom scrollbar and theme variants
└── main.jsx            # Router and React-Redux context wrapper
```

---

## ⚙️ How It Works

### 1. Authentication Flow
- When a user submits the signup/login form, React Hook Form validates the fields and forwards them to `appwrite/auth.js`.
- Upon successful login, an Appwrite session is created. The auth status is retrieved and dispatched to the Redux store (`authSlice.js`) as `userData`.
- Page routes are wrapped with a `Protected.jsx` layout that listens to the Redux authentication status and redirects unauthorized users to `/login`.

### 2. Databases & Storage Flow
- **Creating Blogs**: The user enters content through TinyMCE and uploads a file. The file is uploaded to Appwrite Storage first. The returning file ID is linked as the `featuredImage` property inside the Appwrite Database document along with the article title, slug, content, and author ID.
- **Reading Blogs**: The main feed fetches active posts using Query filters in the Appwrite SDK.
- **Updating/Deleting Blogs**: If the current user matches the post's author ID, edit/delete actions are enabled. Deleting a post automatically cleans up both the database entry and the stored featured image file.

### 3. Theme Toggle & Configuration
- Toggling the Sun/Moon icon triggers a React state update and writes the active theme value to `localStorage`.
- A `useEffect` hooks onto theme changes and toggles the `.dark` class directly on the HTML document element (`document.documentElement`).
- Tailwind v4 uses the `@custom-variant dark` directive inside `index.css` to switch element styles globally (e.g., changing background and text colors) using classes like `dark:bg-slate-950 dark:text-slate-100`.

---

## 💻 Getting Started

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Clone this repository and install the dependencies:
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and specify your Appwrite service details:
```env
VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID="your_project_id"
VITE_APPWRITE_DATABASE_ID="your_database_id"
VITE_APPWRITE_COLLECTION_ID="your_collection_id"
VITE_APPWRITE_BUCKET_ID="your_bucket_id"
```

### 4. Running the Development Server
```bash
npm run dev
```

### 5. Compiling a Production Build
```bash
npm run build
```
