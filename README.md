# 🎨 MarketPlace

MarketPlace is a dynamic bidding platform designed for artists and art enthusiasts. Artists can upload their artwork, set a minimum bid, and engage in real-time auctions with interested users. Users can place bids, communicate directly with artists, and purchase artwork once bidding is settled.

## 🚀 Features

- **Art Uploads**: Artists can upload their artwork for sale.
- **Minimum Bid Setting**: Each artwork has a minimum bid amount set by the artist.
- **Bid Management**: Users can place bids on artwork, which are stored in the database in real-time.
- **Bid Settlement**: Artists have the option to settle the bid and complete the payment process.
- **Real-Time Chat**: A real-time chat system for artists and users to discuss artwork and bidding terms.

## 📂 Project Structure

- **Frontend**: Built with [React](https://reactjs.org/) and [Next.js](https://nextjs.org/) for server-side rendering, creating a fast, responsive, and interactive UI.
- **Backend**: [Node.js](https://nodejs.org/) and [Zod](https://zod.dev/) to manage bid processing, chat functions, and data storage.
- **Database**: [Prisma ORM](https://www.prisma.io/) used where all bid data and artwork details are stored securely in a database for quick retrieval and accurate bid management.

## 🛠️ Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/awhvish/MarketPlace.git
   cd marketplace
   ```

2. **Install dependencies**:

```bash
Copy code
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```
3. **Run the development server**:
```bash
Copy code
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open http://localhost:3000 in your browser to view the app.
