# xyzOrganics - Organic Vegetables E-commerce Store

## Overview

xyzOrganics is a modern e-commerce application for selling fresh organic vegetables. The application features a clean, green-themed interface that allows customers to browse products, add items to their cart, and place orders through an email-based ordering system. Built with React and TypeScript on the frontend, Express.js on the backend, and utilizing Drizzle ORM for database operations, the application provides a seamless shopping experience for organic produce.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Zustand with persistence for cart state management, ensuring cart contents survive page refreshes
- **UI Framework**: shadcn/ui components with Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom green color scheme reflecting the organic brand identity
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Database Layer**: Drizzle ORM configured for PostgreSQL with type-safe queries
- **Storage Interface**: Abstract storage interface with in-memory implementation for development, designed to be easily swapped for database-backed storage
- **Session Management**: Express sessions with PostgreSQL session store for production scalability
- **Development Setup**: Vite integration for hot module replacement and seamless full-stack development

### Data Models
- **Product Schema**: Defines organic vegetable products with pricing, descriptions, and image URLs including fallback images for reliability
- **Cart Schema**: Manages shopping cart items with quantities and product references
- **Order Schema**: Validates customer order forms with contact and delivery information

### Email Integration
- **Service**: EmailJS for client-side email delivery without backend email infrastructure
- **Order Processing**: Automated order emails sent to the business with customer details and item breakdowns
- **Configuration**: Environment-based email service configuration for different deployment environments

### Authentication Strategy
- **Current State**: Basic user schema defined but not yet implemented
- **Planned**: Session-based authentication with user accounts for order history and preferences
- **Storage Ready**: User management interface prepared in the storage layer for future implementation

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL database for production data storage
- **Drizzle Kit**: Database migration and schema management tools
- **Connection**: Environment variable-based database URL configuration

### Email Service
- **EmailJS**: Browser-based email service for order notifications
- **Configuration**: Service ID, template ID, and public key stored in environment variables
- **Fallback**: Graceful degradation if email service is unavailable

### UI Components
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Lucide React**: Modern icon library with consistent styling
- **React Hook Form**: Form handling with Zod validation for type-safe form processing
- **Date-fns**: Date manipulation and formatting utilities

### Development Tools
- **React Query**: Server state management and caching for API interactions
- **Replit Integration**: Development environment optimizations and error overlays
- **PostCSS & Autoprefixer**: CSS processing and vendor prefix automation

### Hosting & Deployment
- **Static Assets**: Client-side assets served through Vite's build system
- **API Routes**: Express server handling API endpoints with `/api` prefix
- **Environment Variables**: Separate configuration for development and production environments