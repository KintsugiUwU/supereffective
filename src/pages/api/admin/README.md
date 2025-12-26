# Admin API Endpoints

This directory contains admin API endpoints that are secured with bearer token authentication.

## Authentication

All admin endpoints require a bearer token in the `Authorization` header:

```
Authorization: Bearer {ADMIN_API_TOKEN}
```

The `ADMIN_API_TOKEN` must be configured in your environment variables (`.env` file):

```bash
ADMIN_API_TOKEN=your-secret-token-here
```

**Security Note:** Keep your API token secret and never commit it to version control.

## Endpoints

### 1. Get All Users (Paginated)

**Endpoint:** `GET /api/admin/users`

**Description:** Returns a paginated list of all users with their accounts, memberships, and living dex count.

**Query Parameters:**

- `page` (optional, default: `1`) - Page number (must be positive integer)
- `pageSize` (optional, default: `1000`) - Number of users per page (1-10000)

**Example Requests:**

```bash
# Get first page with default page size (1000)
curl -H "Authorization: Bearer your-secret-token-here" \
  http://localhost:3000/api/admin/users

# Get page 2
curl -H "Authorization: Bearer your-secret-token-here" \
  http://localhost:3000/api/admin/users?page=2

# Get page 1 with custom page size of 100
curl -H "Authorization: Bearer your-secret-token-here" \
  http://localhost:3000/api/admin/users?page=1&pageSize=100
```

**Response:**

```json
{
  "users": [
    {
      "id": "clxyz123abc",
      "email": "user@example.com",
      "emailVerified": "2024-01-15T10:30:00.000Z",
      "accounts": [
        {
          "id": "acc123",
          "provider": "email",
          "type": "email",
          "providerAccountId": "user@example.com"
        }
      ],
      "membership": {
        "patreonCampaignId": "9272063",
        "patreonUserId": "12345",
        "currentTier": "9094266",
        "rewardMaxDexes": 25,
        ...
      },
      "livingDexCount": 5
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 1000,
    "totalCount": 2500,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

### 2. Get User Profile

**Endpoint:** `GET /api/admin/users/[userId]`

**Description:** Returns detailed information about a specific user including their profile, accounts, membership, and
living dexes metadata.

**Path Parameters:**

- `userId` (required) - The user's unique ID

**Example Request:**

```bash
curl -H "Authorization: Bearer your-secret-token-here" \
  http://localhost:3000/api/admin/users/clxyz123abc
```

**Response:**

```json
{
  "user": {
    "id": "clxyz123abc",
    "email": "user@example.com",
    "displayName": "Trainer Name",
    "userName": "trainer123",
    "twitterUsername": "trainer",
    "twitchUsername": "trainer_tv",
    "discordUsername": "trainer#1234",
    "isDisabled": false,
    "roles": null,
    "emailVerified": "2024-01-15T10:30:00.000Z",
    "createdAt": "clxyz123abc",
    "updatedAt": "clxyz123abc"
  },
  "accounts": [
    {
      "id": "acc123",
      "provider": "email",
      "type": "email",
      "providerAccountId": "user@example.com"
    }
  ],
  "membership": {
    "patreonCampaignId": "9272063",
    "patreonUserId": "12345",
    "patreonMemberId": "mem456",
    "patronStatus": "active_patron",
    "provider": "patreon",
    "currentTier": "9094266",
    "highestTier": "9094266",
    "isSubscriptionTier": true,
    "totalContributed": 4200,
    "createdAt": "2023-06-26T17:29:58.443Z",
    "updatedAt": "2024-07-26T00:28:40.000Z",
    "expiresAt": null,
    "userId": "clxyz123abc",
    "overridenRewards": true,
    "rewardMaxDexes": 25,
    "rewardFeaturedStreamer": false
  },
  "livingDexes": [
    {
      "id": "dex123",
      "title": "Sword - Livingdex",
      "gameId": "swsh-sw",
      "gameSetId": "swsh",
      "presetId": "fully-sorted",
      "caughtRegular": 350,
      "totalRegular": 400,
      "caughtShiny": 50,
      "totalShiny": 400,
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-20T15:30:00.000Z"
    }
  ]
}
```

---

### 3. Get Living Dex Data

**Endpoint:** `GET /api/admin/livingdexes/[dexId]`

**Description:** Returns the complete living dex data including all boxes and Pokémon.

**Path Parameters:**

- `dexId` (required) - The living dex's unique ID

**Example Request:**

```bash
curl -H "Authorization: Bearer your-secret-token-here" \
  http://localhost:3000/api/admin/livingdexes/dex123
```

**Response:**

Returns the complete `LoadedDex` object with all boxes, Pokémon, and metadata:

```json
{
  "id": "dex123",
  "userId": "clxyz123abc",
  "title": "Sword - Livingdex",
  "schemaVersion": 3,
  "gameId": "swsh-sw",
  "gameSetId": "swsh",
  "presetId": "fully-sorted",
  "presetVersion": 1,
  "caughtRegular": 350,
  "totalRegular": 400,
  "caughtShiny": 50,
  "totalShiny": 400,
  "boxes": [
    {
      "title": "Box 1",
      "shiny": false,
      "pokemon": [
        {
          "pid": "bulbasaur",
          "nid": "0001-bulbasaur",
          "caught": true,
          "gmax": false,
          "alpha": false,
          "shiny": false,
          "shinyLocked": false,
          "shinyBase": null
        }
      ]
    }
  ],
  "lostPokemon": [],
  "createdAt": "2024-01-10T08:00:00.000Z",
  "updatedAt": "2024-01-20T15:30:00.000Z"
}
```

---

## Error Responses

All endpoints return standard error responses:

### 401 Unauthorized

Missing or invalid bearer token:

```json
{
  "message": "Not authenticated"
}
```

### 404 Not Found

Resource not found:

```json
{
  "message": "Not found"
}
```

### 400 Bad Request

Invalid request parameters:

```json
{
  "message": "Invalid request data"
}
```

### 405 Method Not Allowed

Unsupported HTTP method:

```json
{
  "message": "Not allowed"
}
```

---

## Setup

1. Add the `ADMIN_API_TOKEN` to your `.env` file:

   ```bash
   ADMIN_API_TOKEN=your-secret-token-here
   ```

2. Generate a secure random token (recommended):

   ```bash
   # Using Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

   # Using OpenSSL
   openssl rand -hex 32
   ```

3. Restart your development server to load the new environment variable.

---

## Using the TypeScript Client

A standalone TypeScript client is available at `src/lib/admin-api-client.ts` that provides type-safe access to all admin
endpoints.

### Installation

The client is already included in the project. Simply import it:

```typescript
import { createAdminApiClient } from '@/lib/admin-api-client'

const client = createAdminApiClient({
  baseUrl: 'http://localhost:3000',
  apiToken: process.env.ADMIN_API_TOKEN || 'your-secret-token-here',
})
```

### Usage Examples

```typescript
// Get paginated users
const response = await client.getUsers(1, 100)
console.log(response.users)
console.log(response.pagination)

// Get all users (auto-pagination)
const allUsers = await client.getAllUsers()

// Get specific user profile
const profile = await client.getUserProfile('clxyz123abc')

// Get living dex data
const dex = await client.getLivingDex('dex123')
```

### Available Methods

- `getUsers(page?, pageSize?)` - Get paginated list of users
- `getAllUsers(pageSize?)` - Get all users (handles pagination automatically)
- `getUserProfile(userId)` - Get specific user profile
- `getLivingDex(dexId)` - Get specific living dex data

### Type Safety

The client exports all response types:

```typescript
import type {
  UserListItem,
  UserProfile,
  LoadedDex,
  SessionMembership,
  Account,
  DexPokemon,
  DexBox,
  PaginationMetadata,
  UsersListResponse,
} from '@/lib/admin-api-client'
```

See `src/lib/admin-api-client.example.ts` for more detailed usage examples.

---

## Security Considerations

- **Never commit** your `ADMIN_API_TOKEN` to version control
- Use a **strong, randomly generated** token (at least 32 characters)
- **Rotate tokens** periodically
- Use **HTTPS** in production to prevent token interception
- Consider implementing **rate limiting** for production use
- **Audit access logs** regularly
- Store tokens securely (use environment variables or secret management services)
