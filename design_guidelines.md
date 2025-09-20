# AI Chatbot Design Guidelines

## Design Approach
**System-Based Approach** - Following Material Design principles for a clean, functional chat interface that prioritizes usability and readability. This utility-focused application requires clear information hierarchy and intuitive interaction patterns.

## Core Design Elements

### Color Palette
**Dark Mode Primary:**
- Background: 215 25% 12% (deep slate)
- Chat surface: 215 20% 16% (elevated slate)
- User messages: 217 91% 60% (blue)
- AI messages: 215 15% 22% (neutral gray)
- Text primary: 0 0% 95% (near white)
- Text secondary: 215 10% 70% (muted)

**Light Mode Primary:**
- Background: 0 0% 98% (near white)
- Chat surface: 0 0% 100% (pure white)
- User messages: 217 91% 60% (blue)
- AI messages: 215 15% 95% (light gray)
- Text primary: 215 25% 15% (dark slate)
- Text secondary: 215 10% 45% (muted)

### Typography
- **Primary Font:** Inter via Google Fonts
- **Body text:** 14px regular for messages
- **User names:** 12px medium weight
- **Timestamps:** 11px regular, muted color
- **Input field:** 16px regular (prevents zoom on mobile)

### Layout System
**Spacing Units:** Consistent use of Tailwind units 2, 4, 6, and 8
- Message padding: p-4
- Component gaps: gap-2 for tight, gap-4 for standard
- Container margins: m-6 for mobile, m-8 for desktop
- Input area padding: p-6

### Component Library

**Chat Container:**
- Full viewport height with header and input areas
- Scrollable message area with bottom-anchored new messages
- Subtle border separating input from chat area

**Message Bubbles:**
- User messages: Right-aligned, blue background, white text
- AI messages: Left-aligned, neutral background, adaptive text color
- Rounded corners: rounded-2xl for modern feel
- Maximum width: max-w-xs on mobile, max-w-md on desktop
- Drop shadow: subtle shadow-sm for depth

**Input Area:**
- Fixed bottom position with backdrop blur
- Text input with rounded-full styling
- Send button integrated within input field
- Typing indicator when AI is responding
- Auto-resize textarea for longer messages

**Navigation/Header:**
- Minimal header with app title
- Optional clear chat button
- No complex navigation needed

**Loading States:**
- Typing indicator with animated dots
- Smooth message appearance animations
- Input disabled state while processing

### Interaction Patterns
- **Message Flow:** Bottom-to-top chronological order
- **Auto-scroll:** Always scroll to newest message
- **Input Focus:** Maintain focus on input after sending
- **Enter to Send:** Support Enter key for quick messaging
- **Responsive:** Single-column layout, optimized for mobile-first

### Visual Hierarchy
- **Primary Action:** Send message button (blue, prominent)
- **Secondary Elements:** Timestamps, user indicators (muted)
- **Content Focus:** Message text has highest contrast
- **Clean Separation:** Clear distinction between user and AI messages through alignment and color

This design creates a familiar, WhatsApp-inspired chat experience optimized for AI conversation with clean Material Design principles.