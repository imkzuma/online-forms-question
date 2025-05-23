# Form Builder Responses Viewer

A simple web application to display form responses fetched from a REST API, built using **Vite**, **React**, **TypeScript**, and **MUI**.

## 📌 Important Notes for Reviewers

> ⚠️ **API Limitation Notice**
>
> The current API endpoint:
>
> ```
> GET /api/v1/forms/<form_slug>/responses
> ```
>
> does **not** return responses filtered by the given `form_slug`. Instead, it currently returns all submitted responses for **all** forms, regardless of the slug provided.
>
> Due to this backend limitation, the **Responses** tab in the application displays the data exactly as received from the API, without further client-side filtering.
>
> Once the backend issue is addressed, appropriate filtering logic can be added.

---

## 🚀 Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [MUI](https://mui.com/) – UI Components
- [Redux Toolkit Query (RTK Query)](https://redux-toolkit.js.org/rtk-query/overview) – API Data Fetching
- [Yup](https://github.com/jquense/yup) – Validation Schema

---

## 📦 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/imkzuma/online-forms-question.git
cd online-forms-question

pnpm install
# or
npm install
# or
yarn
```

### 2. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_API_URL=https://your.api.domain.com/api/v1
```

### 3. Start the Development Server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

### 4. Build for Production

```bash
pnpm build
# or
npm run build
# or
yarn build
```
