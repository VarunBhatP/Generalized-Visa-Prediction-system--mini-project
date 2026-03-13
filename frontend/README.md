# GlobalVisa Frontend

This is the Next.js frontend for the **Generalized Visa Prediction System**. It provides a modern, dark-themed, and highly interactive user interface to collect visa applicant data and display AI-driven approval predictions.

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Language:** TypeScript
- **Icons:** [Lucide React](https://lucide.dev/)

## 📂 Project Structure

- `src/app/`: The Next.js App Router structure.
  - `page.tsx`: The animated landing page featuring the 3D globe and key sections.
  - `predict/page.tsx`: The multi-step visa prediction wizard.
  - `predict/constants.ts`: Shared constants, lists, and types for the prediction flow.
- `src/components/`: Reusable UI components.
  - `InteractiveGlobe.tsx`: The 3D interactive hero globe.
  - `HowItWorks.tsx` & `RankingFactors.tsx`: Landing page informational sections.
  - `predict/`: Components specific to the prediction wizard (e.g., `ProgressBar`, `QuestionStep`, `SearchableSelect`).

## 🛠️ Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or newer) installed. 
You will also need the backend running locally to receive predictions.

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Environment Variables

The frontend connects to the FastAPI backend. By default, it looks for the backend at `http://localhost:8000`.

If your backend is hosted elsewhere (e.g., for production), you can define it by creating a `.env.local` file in the root of the `frontend` folder:

```env
# .env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```
*(Note: Because of the fallback in the code, running locally on port 8000 requires no configuration).*

### Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

Then, start the production server:

```bash
npm start
```
