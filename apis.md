# Gems Inventory API Documentation

## Overview
A REST API for managing gems/diamonds inventory and user quotations built with TypeScript, Express.js, and MongoDB.

**Base URL:** `http://localhost:3000/api`

---

## Authentication
Most endpoints require JWT authentication via cookies or Authorization header. Admin endpoints require additional admin role verification.

---

## API Endpoints

### 1. Health Check

#### GET /api/health
Check API status and health.

**Access:** Public  
**Query Parameters:** None  
**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "Diamond Inventory API is running",
  "timestamp": "2025-07-27T10:30:00.000Z",
  "environment": "development"
}
```

**Response Codes:**
- `200` - API is healthy
- `500` - Health check failed

---

## 2. Gems/Diamonds Management

### GET /api/gems
Get all gems with pagination.

**Access:** Public  
**Query Parameters:**
- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Items per page (default: 10)
- `sortBy` (string, optional) - Field to sort by (default: createdAt)
- `sortOrder` (string, optional) - Sort order: 'asc' or 'desc' (default: desc)

**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "Gems fetched successfully",
  "data": [
    {
      "_id": "gem_id",
      "stockId": "GEM001",
      "productType": "Gem",
      "category": "Natural",
      "stoneType": "Ruby",
      "color": "Red",
      "shape": "Round",
      "carat": 2.5,
      "origin": "Myanmar",
      "treatment": "Heat",
      "availability": true,
      "certificate": "GIA",
      "measurement": "8.0x8.0x5.0mm",
      "createdAt": "2025-07-27T10:30:00.000Z",
      "updatedAt": "2025-07-27T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalRecords": 100,
    "recordsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Response Codes:**
- `200` - Success
- `500` - Server error

### GET /api/gems/all
Get all gems without pagination.

**Access:** Public  
**Query Parameters:**
- `sortBy` (string, optional) - Field to sort by (default: createdAt)
- `sortOrder` (string, optional) - Sort order: 'asc' or 'desc' (default: desc)

**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "All gems fetched successfully",
  "data": [/* array of gem objects */],
  "totalRecords": 250
}
```

**Response Codes:**
- `200` - Success
- `500` - Server error

### GET /api/gems/search
Search gems with advanced filters.

**Access:** Public  
**Rate Limit:** 50 requests per 15 minutes  
**Query Parameters:**
- `page` (number, optional) - Page number
- `limit` (number, optional) - Items per page
- `sortBy` (string, optional) - Field to sort by
- `sortOrder` (string, optional) - Sort order
- `stockId` (string, optional) - Filter by stock ID
- `productType` (string|array, optional) - Filter by product type
- `category` (string|array, optional) - Filter by category
- `stoneType` (string|array, optional) - Filter by stone type
- `color` (string|array, optional) - Filter by color
- `shape` (string|array, optional) - Filter by shape
- `origin` (string|array, optional) - Filter by origin
- `treatment` (string|array, optional) - Filter by treatment
- `certificate` (string|array, optional) - Filter by certificate
- `caratMin` (number, optional) - Minimum carat weight
- `caratMax` (number, optional) - Maximum carat weight
- `availability` (boolean, optional) - Filter by availability
- `searchTerm` (string, optional) - General search term

**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "Gem search completed successfully",
  "data": [/* filtered gem objects */],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalRecords": 50,
    "recordsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "appliedFilters": {
    "stoneType": "Ruby",
    "caratMin": 1.0,
    "caratMax": 3.0
  },
  "totalFilteredRecords": 50
}
```

**Response Codes:**
- `200` - Success
- `500` - Server error

### GET /api/gems/filter-options
Get available filter options for UI dropdowns.

**Access:** Public  
**Rate Limit:** 50 requests per 15 minutes  
**Query Parameters:** None  
**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "Filter options fetched successfully",
  "data": {
    "productTypes": ["Gem", "Jewelry"],
    "categories": ["Natural", "Synthetic"],
    "stoneTypes": ["Ruby", "Sapphire", "Emerald"],
    "colors": ["Red", "Blue", "Green"],
    "shapes": ["Round", "Oval", "Square"],
    "origins": ["Myanmar", "Sri Lanka", "Thailand"],
    "treatments": ["Heat", "Oil", "None"],
    "certificates": ["GIA", "AIGS", "Lotus"]
  }
}
```

**Response Codes:**
- `200` - Success
- `500` - Server error

### POST /api/gems/create
Create a new gem with validation.

**Access:** Public  
**Rate Limit:** 10 requests per minute  
**Query Parameters:** None

**Request Body:**
```json
{
  "stockId": "GEM001",
  "productType": "Gem",
  "category": "Natural",
  "stoneType": "Ruby",
  "color": "Red",
  "shape": "Round",
  "carat": 2.5,
  "origin": "Myanmar",
  "treatment": "Heat",
  "availability": true,
  "certificate": "GIA",
  "measurement": "8.0x8.0x5.0mm"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Gem created successfully",
  "data": {/* created gem object */}
}
```

**Response Codes:**
- `201` - Created successfully
- `400` - Validation failed
- `500` - Server error

### POST /api/gems/bulk-create
Create multiple gems in bulk.

**Access:** Public  
**Rate Limit:** 5 requests per 5 minutes  
**Query Parameters:** None

**Request Body:**
```json
[
  {
    "stockId": "GEM001",
    "productType": "Gem",
    "category": "Natural",
    "stoneType": "Ruby",
    "color": "Red",
    "shape": "Round",
    "carat": 2.5,
    "origin": "Myanmar",
    "treatment": "Heat",
    "availability": true,
    "certificate": "GIA",
    "measurement": "8.0x8.0x5.0mm"
  }
]
```

**Response:**
```json
{
  "success": true,
  "message": "5 gems created successfully",
  "data": [/* array of created gem objects */],
  "count": 5
}
```

**Response Codes:**
- `201` - Created successfully
- `400` - Invalid input data
- `500` - Server error

### PUT /api/gems/:id
Update a gem by ID.

**Access:** Public  
**Rate Limit:** 10 requests per minute  
**Query Parameters:** None

**Request Body:**
```json
{
  "color": "Dark Red",
  "carat": 2.8,
  "availability": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Gem updated successfully",
  "data": {/* updated gem object */}
}
```

**Response Codes:**
- `200` - Updated successfully
- `400` - Validation failed
- `404` - Gem not found
- `500` - Server error

### DELETE /api/gems/:id
Delete a gem by ID.

**Access:** Public  
**Rate Limit:** 10 requests per minute  
**Query Parameters:** None  
**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "Gem deleted successfully"
}
```

**Response Codes:**
- `200` - Deleted successfully
- `404` - Gem not found
- `500` - Server error

---

## 3. User Management

### POST /api/users/register
Register a new normal user.

**Access:** Public  
**Query Parameters:** None

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully. Please verify OTP.",
  "userId": "user_id_here"
}
```

**Response Codes:**
- `201` - Registration successful
- `400` - Validation failed
- `409` - User already exists
- `500` - Server error

### POST /api/users/verify-otp
Verify OTP for user registration.

**Access:** Public  
**Query Parameters:** None

**Request Body:**
```json
{
  "userId": "user_id_here",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "user": {/* user object */}
}
```

**Response Codes:**
- `200` - OTP verified
- `400` - Invalid or expired OTP
- `404` - User not found
- `500` - Server error

### POST /api/users/login
Login normal user.

**Access:** Public  
**Query Parameters:** None

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "user_id",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "USER",
    "status": "ACTIVE"
  }
}
```

**Response Codes:**
- `200` - Login successful
- `400` - Invalid credentials
- `401` - Account not verified
- `500` - Server error

### POST /api/users/login/vip
Login VIP user with passkey.

**Access:** Public  
**Query Parameters:** None

**Request Body:**
```json
{
  "username": "vip_user",
  "passkey": "1234"
}
```

**Response:**
```json
{
  "success": true,
  "message": "VIP login successful",
  "user": {
    "_id": "user_id",
    "username": "vip_user",
    "role": "USER",
    "isVip": true
  }
}
```

**Response Codes:**
- `200` - Login successful
- `400` - Invalid credentials
- `500` - Server error

### GET /api/users
Get all normal users (Admin only).

**Access:** Admin only  
**Authentication:** Required  
**Query Parameters:**
- `page` (number, optional) - Page number
- `limit` (number, optional) - Items per page
- `status` (string, optional) - Filter by user status
- `role` (string, optional) - Filter by user role

**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [/* array of user objects */],
  "pagination": {/* pagination info */}
}
```

**Response Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `500` - Server error

### GET /api/users/:id
Get user by ID (Admin only).

**Access:** Admin only  
**Authentication:** Required  
**Query Parameters:** None  
**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": {/* user object */}
}
```

**Response Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Forbidden
- `404` - User not found
- `500` - Server error

---

## 4. Quotation Management

### POST /api/quotations
Submit a quotation or array of quotations.

**Access:** Authenticated users only (not admins)  
**Authentication:** Required  
**Query Parameters:** None

**Request Body (Single):**
```json
{
  "carat": 2.5,
  "noOfPieces": 1,
  "quotePrice": 5000
}
```

**Request Body (Multiple):**
```json
[
  {
    "carat": 2.5,
    "noOfPieces": 1,
    "quotePrice": 5000
  },
  {
    "carat": 1.8,
    "noOfPieces": 2,
    "quotePrice": 3000
  }
]
```

**Response:**
```json
{
  "message": "Quotations submitted successfully",
  "quotation": [
    {
      "quotationId": "unique_id",
      "carat": 2.5,
      "noOfPieces": 1,
      "quotePrice": 5000,
      "status": "PENDING",
      "submittedAt": "2025-07-27T10:30:00.000Z"
    }
  ],
  "duplicates": [/* duplicate quotations if any */],
  "errors": [/* failed quotations if any */],
  "partialSuccess": false
}
```

**Response Codes:**
- `201` - All quotations submitted successfully
- `207` - Partial success (some failed)
- `400` - All quotations failed or validation error
- `401` - Unauthorized
- `403` - Forbidden (admin users cannot submit)
- `500` - Server error

### GET /api/quotations
Get all users with quotations or specific user quotations (Admin only).

**Access:** Admin only  
**Authentication:** Required  
**Query Parameters:**
- `userId` (string, optional) - Get quotations for specific user

**Request Body:** None

**Response (All users):**
```json
{
  "message": "Users with quotations retrieved successfully",
  "data": {
    "users": [
      {
        "userId": "user_id",
        "username": "john_doe",
        "email": "john@example.com",
        "quotationCount": 3,
        "quotations": [
          {
            "quotationId": "unique_id",
            "carat": 2.5,
            "noOfPieces": 1,
            "quotePrice": 5000,
            "status": "PENDING",
            "submittedAt": "2025-07-27T10:30:00.000Z"
          }
        ]
      }
    ],
    "summary": {
      "totalUsers": 10,
      "totalQuotations": 25
    }
  }
}
```

**Response (Specific user):**
```json
{
  "message": "User quotations retrieved successfully",
  "data": {
    "userId": "user_id",
    "username": "john_doe",
    "quotations": [/* array of quotations */]
  }
}
```

**Response Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Forbidden
- `404` - User not found (when userId provided)
- `500` - Server error

### GET /api/quotations/:quotationId
Get specific quotation details (Admin only).

**Access:** Admin only  
**Authentication:** Required  
**Query Parameters:** None  
**Request Body:** None

**Response:**
```json
{
  "message": "Quotation details retrieved successfully",
  "data": {
    "quotation": {
      "quotationId": "unique_id",
      "carat": 2.5,
      "noOfPieces": 1,
      "quotePrice": 5000,
      "status": "PENDING",
      "submittedAt": "2025-07-27T10:30:00.000Z"
    },
    "user": {
      "userId": "user_id",
      "username": "john_doe",
      "email": "john@example.com"
    }
  }
}
```

**Response Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Quotation not found
- `500` - Server error

### POST /api/quotations/:quotationId/approve
Approve a quotation (Admin only).

**Access:** Admin only  
**Authentication:** Required  
**Query Parameters:** None  
**Request Body:** None

**Response:**
```json
{
  "message": "Quotation approved successfully",
  "quotation": {
    "quotationId": "unique_id",
    "carat": 2.5,
    "noOfPieces": 1,
    "quotePrice": 5000,
    "status": "APPROVED",
    "submittedAt": "2025-07-27T10:30:00.000Z",
    "approvedAt": "2025-07-27T11:00:00.000Z"
  }
}
```

**Response Codes:**
- `200` - Approved successfully
- `400` - Missing quotation ID
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Quotation not found
- `500` - Server error

### POST /api/quotations/:quotationId/reject
Reject a quotation (Admin only).

**Access:** Admin only  
**Authentication:** Required  
**Query Parameters:** None

**Request Body:**
```json
{
  "rejectionReason": "Price too high for current market conditions"
}
```

**Response:**
```json
{
  "message": "Quotation rejected successfully",
  "quotation": {
    "quotationId": "unique_id",
    "carat": 2.5,
    "noOfPieces": 1,
    "quotePrice": 5000,
    "status": "REJECTED",
    "submittedAt": "2025-07-27T10:30:00.000Z",
    "rejectedAt": "2025-07-27T11:00:00.000Z",
    "rejectionReason": "Price too high for current market conditions"
  }
}
```

**Response Codes:**
- `200` - Rejected successfully
- `400` - Missing quotation ID or rejection reason
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Quotation not found
- `500` - Server error

---

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message",
  "errors": [/* validation errors if applicable */]
}
```

## Rate Limiting

Some endpoints have rate limiting applied:
- Search endpoints: 50 requests per 15 minutes
- Create gem: 10 requests per minute
- Update/Delete gem: 10 requests per minute
- Bulk create: 5 requests per 5 minutes

## Authentication

JWT tokens are used for authentication, typically sent via cookies. Admin endpoints require additional role verification.

## Data Models

### Gem Model
```typescript
{
  stockId: string;
  productType: 'jewelry' | 'Jewelry' | 'Gem' | 'GEM';
  category: string;
  stoneType: string;
  color: string;
  shape: string;
  carat: number;
  origin: string;
  treatment: string;
  availability: boolean;
  certificate: string;
  measurement: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Quotation Model
```typescript
{
  quotationId: string;
  carat: number;
  noOfPieces: number;
  quotePrice: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
}
```

### User Model
```typescript
{
  username: string;
  email: string;
  phone?: string;
  role: 'USER' | 'ADMIN';
  status: 'PENDING' | 'ACTIVE' | 'SUSPENDED';
  isVip: boolean;
  quotations: Quotation[];
  createdAt: Date;
  updatedAt: Date;
}
```