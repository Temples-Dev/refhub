# RefHub (Refreshinery Hub)

RefHub is an internal web application designed to streamline food ordering for staff within an organization. Staff can log in, place orders for items, and pay for their purchases, including a transportation charge. Admins can view all orders and generate a PDF summary for easy tracking and purchasing.

## Features

### 1. User Authentication
- Staff can log in using their credentials to access the order form.

### 2. Simple Order Entry
- Staff enter the item name and price.
- No menu display, refunds, or order adjustments are available.
  
### 3. Transportation Fee
- A fixed transportation charge is added to each order.

### 4. Admin Panel
- Admins can view all staff orders.
- A single PDF report can be generated with:
  - Staff names
  - Items ordered and respective prices
  - Total amount (including transportation fee)

### 5. Paystack Integration
- Users can securely pay for their orders through Paystack.

## Tech Stack
- **Frontend**: Remix
- **Backend**: Python
- **Database**: SQLite
- **Payment Integration**: Paystack
- **PDF Generation**: PDFKit 

## Installation


### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Temples-Dev/refhub.git
   ```
2. Navigate to the project directory:
   ```bash
   cd refhub
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   Create a `.env` file with the following details:
   ```bash
   PORT=3000
   DATABASE_URL=your_mongodb_connection_string
   PAYSTACK_SECRET_KEY=your_paystack_secret_key
   ```
5. Start the server:
   ```bash
   npm start
   ```

6. Open your browser and visit `http://localhost:5174` to start using RefHub.

## Usage

### Staff
1. Log in with your company credentials.
2. Enter the name and price of the items you want to order.
3. Pay for your order via Paystack.
4. A transportation fee will be added automatically.

### Admin
1. Log in as an admin.
2. View all orders submitted by staff.
3. Generate a PDF report of all orders.

## License
This project is licensed under the MIT License.


