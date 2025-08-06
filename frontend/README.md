# Vue.js Frontend

Professional Vue.js frontend for the Matchable Checkout System, providing a modern and responsive user interface for booking personal training sessions.

## Features

- **Session Selection**: Browse and select training sessions with real-time filtering
- **Advanced Filtering**: Filter by session type, trainer, date range, and price
- **Real-time Cart**: Live cart updates with session selection/deselection
- **Professional Booking Form**: Complete customer information collection with validation
- **Responsive Design**: Mobile-first design with TailwindCSS v4
- **State Management**: Pinia store for centralized state management
- **TypeScript**: Full TypeScript support for type safety
- **API Integration**: Professional API service with comprehensive error handling

## Technology Stack

- **Vue.js 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS v4** - Utility-first CSS framework
- **Pinia** - State management for Vue
- **Vue Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Heroicons** - Beautiful SVG icons
- **Vite** - Fast build tool and development server

## Project Structure

```
frontend/src/
├── components/
│   ├── sessions/
│   │   ├── SessionCard.vue      # Individual session display
│   │   └── SessionFilters.vue   # Filter controls
│   └── ui/
│       └── LoadingSpinner.vue   # Loading component
├── services/
│   └── api.ts                   # API service layer
├── stores/
│   └── booking.ts               # Pinia store
├── types/
│   └── index.ts                 # TypeScript type definitions
├── views/
│   ├── SessionsView.vue         # Main sessions page
│   └── BookingView.vue          # Booking form
├── router/
│   └── index.ts                 # Vue Router configuration
└── assets/
    └── main.css                 # Global styles and TailwindCSS
```

## Installation

### Prerequisites
- Node.js 18+ and npm
- Backend API running on port 8000

### Setup Steps

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://127.0.0.1:8000/api`

## Key Components

### SessionCard.vue
Professional session display component with:
- Session type indicators with color coding
- Trainer information with avatar
- Time and duration display
- Price and availability status
- Add/remove from cart functionality
- Modern glass morphism design

### SessionFilters.vue
Advanced filtering component with:
- Session type dropdown
- Trainer selection
- Date range picker
- Price range inputs
- Active filter display
- Clear filters functionality
- Creative floating design elements

### BookingView.vue
Complete booking form with:
- Customer information collection
- Form validation
- Terms and conditions checkbox
- Order summary sidebar
- Responsive layout
- Professional error handling

### LoadingSpinner.vue
Reusable loading component with:
- Custom spinner animation
- Configurable text
- Professional styling
- Responsive design

## State Management

### Pinia Store (booking.ts)
Centralized state management with:
- Session data and filtering
- Cart management
- API integration
- Error handling
- Loading states

### Key State Properties
- `sessions` - Available sessions
- `selectedSessions` - Cart items
- `filters` - Active filters
- `loading` - Loading states
- `error` - Error handling

### Key Actions
- `fetchSessions()` - Load sessions from API
- `toggleSessionSelection()` - Add/remove from cart
- `updateFilters()` - Apply filters
- `createBooking()` - Submit booking
- `clearSelection()` - Clear cart

## API Integration

### API Service (api.ts)
Professional API service with:
- Axios configuration
- Request/response interceptors
- Error handling
- TypeScript interfaces
- Base URL configuration

### Endpoints Used
- `GET /api/sessions` - Fetch available sessions
- `POST /api/bookings` - Create new booking
- `POST /api/bookings/calculate-total` - Calculate totals

### Error Handling
- Network error recovery
- Validation error display
- User-friendly error messages
- Loading state management

## Styling

### TailwindCSS v4
Modern utility-first CSS with:
- Custom component classes
- Responsive design
- Dark/light theme support
- Professional color palette
- Smooth animations

### Design System
- Glass morphism effects
- Gradient backgrounds
- Floating animations
- Professional typography
- Consistent spacing

### Custom Classes
- `.btn-primary` - Primary buttons
- `.card-elevated` - Elevated cards
- `.input-field` - Form inputs
- `.badge` - Status badges
- `.spinner` - Loading spinners

## Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
npm run type-check   # TypeScript type checking
```

### Development Workflow
1. Start backend server
2. Start frontend development server
3. Access application at `http://localhost:5173`
4. Make changes and see hot reload
5. Test API integration

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Vue DevTools for debugging

## Responsive Design

### Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### Mobile-First Approach
- Touch-friendly interfaces
- Optimized for mobile performance
- Responsive grid layouts
- Accessible navigation

## Performance

### Optimizations
- Code splitting with Vite
- Lazy loading of components
- Optimized images and assets
- Efficient state management
- Minimal bundle size

### Loading States
- Skeleton screens
- Progressive loading
- Smooth transitions
- User feedback

## Testing

### Manual Testing
- Session selection and filtering
- Cart functionality
- Form validation
- API integration
- Responsive design

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Production Build
```bash
npm run build
```

### Build Output
- Optimized JavaScript bundles
- Minified CSS
- Compressed assets
- Static file serving

### Deployment Options
- Vercel
- Netlify
- GitHub Pages
- Traditional hosting

## Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Verify backend is running on port 8000
   - Check CORS configuration
   - Verify API_BASE_URL in configuration

2. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript errors
   - Verify TailwindCSS configuration

3. **Hot Reload Issues**
   - Restart development server
   - Clear browser cache
   - Check file permissions

4. **TypeScript Errors**
   - Run `npm run type-check`
   - Check type definitions
   - Verify imports

## Future Enhancements

- **Unit Testing**: Jest and Vue Test Utils
- **E2E Testing**: Cypress or Playwright
- **PWA Support**: Service workers and offline functionality
- **Internationalization**: Multi-language support
- **Advanced Animations**: Framer Motion integration
- **Real-time Updates**: WebSocket integration
- **Performance Monitoring**: Analytics and error tracking
- **Accessibility**: ARIA improvements and screen reader support

## Support

For technical support or questions:
- Check the troubleshooting section
- Review Vue.js documentation
- Check browser console for errors
- Verify API responses

---

**Status**: Production-ready Vue.js frontend with modern architecture and professional design.
