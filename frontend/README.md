# Matchable Checkout Frontend

A professional Vue.js 3 frontend for the Matchable training session booking system. Built with modern technologies and best practices.

## 🚀 Features

### ✅ Core Features Implemented
- **Session Selection**: Browse and select training sessions (padel, fitness, tennis)
- **Advanced Filtering**: Filter by session type, trainer, date range, and price
- **Real-time Cart**: Live cart updates with session selection/deselection
- **Professional Booking Form**: Complete customer information collection
- **Responsive Design**: Mobile-first design with TailwindCSS v4
- **State Management**: Pinia store for centralized state management
- **TypeScript**: Full TypeScript support for type safety
- **API Integration**: Professional API service with error handling

### 🎨 UI/UX Features
- **Modern Design**: Clean, professional interface with smooth animations
- **Loading States**: Professional loading spinners and skeleton screens
- **Error Handling**: Comprehensive error display and recovery
- **Form Validation**: Real-time validation with user feedback
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Technology Stack

- **Vue.js 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS v4** - Utility-first CSS framework
- **Pinia** - State management for Vue
- **Vue Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Heroicons** - Beautiful SVG icons
- **HeadlessUI** - Unstyled, accessible UI components
- **VueUse** - Vue composition utilities

## 📦 Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_APP_TITLE=Matchable Checkout
```

### API Configuration
The frontend is configured to connect to the Laravel backend at `http://127.0.0.1:8000/api`. Make sure the backend is running before testing the frontend.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── sessions/
│   │   │   ├── SessionCard.vue      # Individual session display
│   │   │   └── SessionFilters.vue   # Filter controls
│   │   └── ui/
│   │       └── LoadingSpinner.vue   # Loading component
│   ├── services/
│   │   └── api.ts                   # API service layer
│   ├── stores/
│   │   └── booking.ts               # Pinia store
│   ├── views/
│   │   ├── SessionsView.vue         # Main sessions page
│   │   └── BookingView.vue          # Booking form
│   ├── router/
│   │   └── index.ts                 # Vue Router configuration
│   └── assets/
│       └── main.css                 # Global styles with TailwindCSS
├── public/
└── package.json
```

## 🎯 Key Components

### SessionCard.vue
Professional session display component with:
- Session type indicators with color coding
- Trainer information with avatar
- Time and duration display
- Price and availability status
- Add/remove from cart functionality

### SessionFilters.vue
Advanced filtering component with:
- Session type dropdown
- Trainer selection
- Date range picker
- Price range inputs
- Active filter display
- Clear filters functionality

### BookingView.vue
Complete booking form with:
- Customer information collection
- Form validation
- Terms and conditions checkbox
- Order summary sidebar
- Responsive layout

## 🔌 API Integration

The frontend integrates with the Laravel backend through a professional API service:

### API Endpoints Used
- `GET /api/sessions` - Fetch available sessions with filtering
- `POST /api/bookings` - Create new booking
- `POST /api/bookings/calculate-total` - Calculate session totals

### Error Handling
- Comprehensive error display
- Network error recovery
- Validation error handling
- User-friendly error messages

## 🎨 Styling

### TailwindCSS v4
- Latest version with `@import "tailwindcss"` syntax
- Custom color palette and animations
- Responsive design utilities
- Component-based styling

### Custom Components
- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.card` - Content containers
- `.input-field` - Form inputs
- `.badge` - Status indicators

## 🚀 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run format       # Format code with Prettier
npm run lint         # Lint code with ESLint
```

### Development Workflow
1. Start the Laravel backend: `cd backend && php artisan serve`
2. Start the Vue frontend: `npm run dev`
3. Access the application at `http://localhost:5173`

## 🧪 Testing

The frontend includes comprehensive error handling and validation:
- Form validation with real-time feedback
- API error handling with user-friendly messages
- Network error recovery
- Loading state management

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Tablet and desktop optimizations
- Touch-friendly interface
- Adaptive layouts

## 🔒 Security Features

- Input validation and sanitization
- CORS configuration for API calls
- Secure form submission
- XSS protection through Vue's built-in escaping

## 🚀 Performance

- Lazy-loaded components
- Optimized bundle size
- Efficient state management
- Minimal API calls with caching

## 📚 Documentation

For more information about the backend API, see the `backend/API_DOCUMENTATION.md` file.

## 🤝 Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Include error handling for API calls
4. Test on multiple screen sizes
5. Ensure accessibility compliance

---

**Status**: Frontend implementation complete and ready for production! 🎉
