# 🚀 CUET PG Score Calculator & Analytics

A lightning-fast, highly interactive, and privacy-focused web application designed to help students calculate, visualize, and rank their CUET PG scores effortlessly. 

Built with an unapologetic focus on modern aesthetics, this project features a custom-built 60 FPS physics engine running in the background, a robust multi-theme system, and real-time crowdsourced answer keys.

---

## ✨ Features

### 📊 Score Calculation & Analytics
- **Precision Scoring:** Instantly calculates total scores, attempted questions, and accuracy based on official/contributed answer keys.
- **Data Visualizations:** Interactive Bar and Pie charts breaking down performance (Correct/Incorrect/Unanswered).
- **Global Leaderboard:** Anonymous, real-time rank computation to see where you stand globally.
- **Contribute Key System:** Missing a subject? Crowdsource the answer key! Users can securely submit raw answer key data backed by **Supabase**.

### 🎨 State-of-the-Art UX/UI
- **Custom Physics Engine:** A beautifully optimized HTML5 Canvas engine powers the background—featuring reactive threads that repel your cursor, glowing planets with precise elastic collision physics, and dynamic meteor showers streaking across the screen.
- **5-Tier Theming System:** Switch flawlessly between Light, Dark, Earthy, Ocean, and Slate themes.
- **Fluid Animations:** Powered by `framer-motion` for ultra-smooth layout transitions, interactive tabs, and beautiful page load sequences.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI/Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL for crowdsourced answer keys)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/InsaneNitish/cuet-score-calculator.git
   cd cuet-score-calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action!

---

## 👨‍💻 Author

**Nitish Thakur**
- GitHub: [@InsaneNitish](https://github.com/InsaneNitish)
- LinkedIn: [Nitish Thakur](https://linkedin.com/in/code-sane)

---

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
