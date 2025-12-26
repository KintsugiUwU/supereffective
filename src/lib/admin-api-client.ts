/**
 * Standalone Admin API Client
 *
 * This client provides type-safe access to the admin API endpoints.
 * It does not import any types from the project - all types are defined inline.
 */

// ============================================================================
// Type Definitions
// ============================================================================

export type SessionMembership = {
  patreonCampaignId: string
  patreonUserId: string | null
  patreonMemberId: string | null
  patronStatus: string | null
  provider: string
  currentTier: string
  highestTier: string
  isSubscriptionTier: boolean
  totalContributed: number
  createdAt: Date
  updatedAt: Date
  expiresAt: Date | null
  userId: string
  overridenRewards: boolean
  rewardMaxDexes: number
  rewardFeaturedStreamer: boolean
  avatarUrl?: string
}

export type Account = {
  id: string
  provider: string
  type: string
  providerAccountId: string
}

export type DexPokemon = {
  pid: string
  nid: string
  caught: boolean
  gmax: boolean
  alpha: boolean
  shiny: boolean
  shinyLocked?: boolean
  shinyBase?: string | null
  matchesFilter?: boolean
}

export type NullableDexPokemon = DexPokemon | null

export type DexPokemonList = Array<NullableDexPokemon>

export type DexBox = {
  title?: string
  pokemon: DexPokemonList
  shiny: boolean
  hasFilterMatch?: boolean
}

export type LoadedDex = {
  id?: string
  userId?: string
  createdAt?: Date
  updatedAt?: Date
  title: string
  schemaVersion: number
  gameId: string
  gameSetId: string
  presetId: string
  presetVersion: number
  caughtRegular: number
  totalRegular: number
  caughtShiny: number
  totalShiny: number
  boxes: DexBox[]
  lostPokemon: DexPokemonList
}

export type LivingDexMetadata = {
  id: string
  title: string
  gameId: string
  gameSetId: string
  presetId: string
  caughtRegular: number
  totalRegular: number
  caughtShiny: number
  totalShiny: number
  createdAt: Date
  updatedAt: Date
}

export type UserProfile = {
  user: {
    id: string
    email: string | null
    displayName: string | null
    userName: string | null
    twitterUsername: string | null
    twitchUsername: string | null
    discordUsername: string | null
    isDisabled: boolean
    roles: unknown
    emailVerified: Date | null
    createdAt: string
    updatedAt: string
  }
  accounts: Account[]
  membership: SessionMembership | null
  livingDexes: LivingDexMetadata[]
}

export type UserListItem = {
  id: string
  email: string | null
  emailVerified: Date | null
  accounts: Account[]
  membership: SessionMembership | null
  livingDexCount: number
}

export type PaginationMetadata = {
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type UsersListResponse = {
  users: UserListItem[]
  pagination: PaginationMetadata
}

export type AdminApiClientConfig = {
  baseUrl: string
  apiToken: string
}

// ============================================================================
// Client Class
// ============================================================================

export class AdminApiClient {
  private baseUrl: string
  private apiToken: string

  constructor(config: AdminApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '') // Remove trailing slash
    this.apiToken = config.apiToken
  }

  /**
   * Get authorization headers
   */
  private getHeaders(): HeadersInit {
    return {
      Authorization: `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
    }
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
      throw new Error(`API Error (${response.status}): ${errorData.message || response.statusText}`)
    }
    return response.json()
  }

  /**
   * Get a paginated list of all users
   * @param page - Page number (default: 1)
   * @param pageSize - Number of users per page (default: 1000)
   */
  async getUsers(page: number = 1, pageSize: number = 1000): Promise<UsersListResponse> {
    const url = `${this.baseUrl}/api/admin/users?page=${page}&pageSize=${pageSize}`
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    })
    return this.handleResponse<UsersListResponse>(response)
  }

  /**
   * Get a specific user's profile by ID
   * @param userId - The user's unique ID
   */
  async getUserProfile(userId: string): Promise<UserProfile> {
    const url = `${this.baseUrl}/api/admin/users/${userId}`
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    })
    return this.handleResponse<UserProfile>(response)
  }

  /**
   * Get a specific living dex by ID
   * @param dexId - The living dex's unique ID
   */
  async getLivingDex(dexId: string): Promise<LoadedDex> {
    const url = `${this.baseUrl}/api/admin/livingdexes/${dexId}`
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    })
    return this.handleResponse<LoadedDex>(response)
  }

  /**
   * Get all users (handles pagination automatically)
   * @param pageSize - Number of users per page (default: 1000)
   */
  async getAllUsers(pageSize: number = 1000): Promise<UserListItem[]> {
    const allUsers: UserListItem[] = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const response = await this.getUsers(page, pageSize)
      allUsers.push(...response.users)
      hasMore = response.pagination.hasNextPage
      page++
    }

    return allUsers
  }
}

// ============================================================================
// Factory Function
// ============================================================================

/**
 * Create a new AdminApiClient instance
 * @param config - Client configuration
 */
export function createAdminApiClient(config: AdminApiClientConfig): AdminApiClient {
  return new AdminApiClient(config)
}
