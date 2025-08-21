# Men Footwear App

## Overview
A single-page React app (Vite) for Men Footwear with Category → Subcategory → Products flow. Node.js + Express backend (Model–Route–Controller) with MongoDB. Includes seeding script and clean CSS.

## Run Scripts

### Backend
- `cd server`
- `npm install`
- `npm run seed`   # Seed the database
- `npm start`      # Start the backend server

### Frontend
- `cd client`
- `npm install`
- `npm run dev`    # Start the React app

## API Endpoints
- `GET /api/categories`
- `GET /api/subcategories/:categoryId`
- `GET /api/products/:subcategoryId`

## Tech Stack
- React (Vite)
- Node.js + Express
- MongoDB

## Styling
- Clean CSS (no Tailwind)
