# 🚢 Cruise Excursion AI Assistant

AI-powered cruise excursion booking app with real-time tour recommendations, smart filtering, and WebSocket updates.

## ✨ Features

- 🎫 **Browse Tours** - View available, prebooked, sold-out excursions
- 🤖 **AI Recommendations** - Gemini-powered smart suggestions
- 🔍 **Smart Filtering** - Filter by destination, price, category
- 📱 **Book Tours** - Easy one-click booking with group support
- 🔄 **Real-time Updates** - WebSocket live status tracking

## 🛠 Tech Stack

**Frontend**: React 18 + Vite + Material-UI  
**Backend**: Node.js + Express + MongoDB  
**AI**: Google Gemini API (RAG)  
**Real-time**: WebSockets

## 📡 API Endpoints

```
GET    /api/tours                      # All tours
GET    /api/tours/status/:status       # By status
POST   /api/tours/book                 # Book tour
POST   /api/prompt-post                # AI recommendations
GET    /api/health                     # Health check
```

## 🎯 Usage

1. **Browse Tours**: Click tabs for Available/Prebooked/Sold Out
2. **Get Recommendations**: Enter preferences → AI suggests tours
3. **Filter**: Use destination, price, category filters
4. **Book**: Select tour → set quantity → click Book

## 📚 Database Schema

```javascript
{
  title, description, destination, port,
  price, duration, image, rating, reviews,
  status: 'available'|'prebooked'|'sold_out',
  totalSpots, bookedSpots,
  pricing: { adults, children },
  departureTime, returnTime,
  category, highlights, includedItems
}
```
**Status**: ✅ Production Ready (WIP) | **Last Updated**: Jan 2025
