🛒 Store — Full-Stack E-Commerce Application

A modern, full-stack e-commerce application built with Next.js App Router, Prisma, PostgreSQL (Supabase), and Clerk authentication.
The project focuses on correct backend architecture, cart & order lifecycle, and data consistency, rather than superficial integrations.

🚀 Features
🔐 Authentication & Authorization

User authentication via Clerk

Role-based access control (Admin vs User)

Protected routes using middleware

🛍️ Products

Create, update, delete products (Admin)

Featured products

Product search (name & company)

Product reviews & ratings

Favorites (wishlist) system

🛒 Cart System (Core Focus)

Persistent cart per user

Add / update cart items

Derived cart totals:

number of items

subtotal

tax

shipping

order total

Cart state consistency enforced at the database level

📦 Orders

Cart → Order conversion

Transaction-safe order creation

User order history

Admin sales dashboard

Order totals stored as immutable snapshots

🧑‍💼 Admin Dashboard

Product management

Order overview (sales)

Secure admin-only access

🧠 Architectural Decisions (Important)
Derived Data Handling

Cart totals (cartTotal, tax, orderTotal, etc.) are derived from cart items and treated as cached values, not source-of-truth.

To avoid stale data:

Cart existence

Cart mutation

Cart fetching for UI
are strictly separated into different actions.

This prevents subtle bugs and guarantees UI correctness.

💳 Payments (Intentionally Abstracted)

This project does not integrate a live payment gateway.

Why?

Stripe is not available for individual developers in India

Other gateways (Razorpay / PayPal) introduce heavy onboarding friction

The focus of this project is system design, not compliance

How payments are handled instead:

Orders support a payment state (PAID)

The architecture mirrors real payment flows

A real gateway can be plugged in later via order state transitions

This reflects how production systems actually work (webhooks, retries, reconciliation).

🧱 Tech Stack

Framework: Next.js (App Router)

Language: TypeScript

Database: PostgreSQL (Supabase)

ORM: Prisma

Auth: Clerk

Styling: Tailwind CSS

UI Components: shadcn/ui

State Updates: Server Actions

Validation: Zod

🗄️ Database Models (Overview)

User (via Clerk)

Product

Review

Favorite

Cart

CartItem

Order

Relationships are designed with:

Proper foreign keys

Cascading deletes

Transactional safety

🛠️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/your-username/store.git
cd store

2️⃣ Install dependencies
npm install

3️⃣ Environment variables

Create a .env file:

DATABASE_URL=your_supabase_database_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
ADMIN_USER=your_clerk_user_id

4️⃣ Prisma setup
npx prisma generate
npx prisma db push

5️⃣ Run the app
npm run dev

📈 What This Project Demonstrates

Real-world cart & order architecture

Separation of concerns in backend actions

Transaction-safe data mutations

Authentication & authorization best practices

Practical handling of external constraints (payments)

🔮 Future Enhancements

Real payment gateway integration

Order item breakdown table

Inventory management

Refund & cancellation flow

Analytics dashboard

Webhook-based payment confirmation

👨‍💻 Author

Anubhav Biswas
3rd Year CS Student | Full-Stack & ML Enthusiast
Focused on building correct, scalable systems, not just demos.