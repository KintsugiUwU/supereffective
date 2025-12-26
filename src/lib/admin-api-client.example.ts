/**
 * Admin API Client Usage Examples
 *
 * This file demonstrates how to use the AdminApiClient to interact with the admin API endpoints.
 */

import { createAdminApiClient, AdminApiClient } from './admin-api-client'

// ============================================================================
// Setup
// ============================================================================

// Create a client instance
const client = createAdminApiClient({
  baseUrl: 'http://localhost:3000', // or 'https://your-production-domain.com'
  apiToken: process.env.ADMIN_API_TOKEN || 'your-secret-token-here',
})

// ============================================================================
// Example 1: Get paginated list of users
// ============================================================================

async function example1_getPaginatedUsers() {
  try {
    // Get first page with default page size (1000)
    const response = await client.getUsers()

    console.log(`Total users: ${response.pagination.totalCount}`)
    console.log(`Page: ${response.pagination.page}/${response.pagination.totalPages}`)
    console.log(`Users on this page: ${response.users.length}`)

    // Print first user
    if (response.users.length > 0) {
      const firstUser = response.users[0]
      console.log('First user:', {
        id: firstUser.id,
        email: firstUser.email,
        livingDexCount: firstUser.livingDexCount,
        hasAccounts: firstUser.accounts.length > 0,
        hasMembership: firstUser.membership !== null,
      })
    }
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

// ============================================================================
// Example 2: Get specific page with custom page size
// ============================================================================

async function example2_getCustomPage() {
  try {
    // Get page 2 with 100 users per page
    const response = await client.getUsers(2, 100)

    console.log(`Showing page ${response.pagination.page} of ${response.pagination.totalPages}`)
    console.log(`Users: ${response.users.length}`)
    console.log(`Has next page: ${response.pagination.hasNextPage}`)
    console.log(`Has previous page: ${response.pagination.hasPreviousPage}`)
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

// ============================================================================
// Example 3: Get all users (auto-pagination)
// ============================================================================

async function example3_getAllUsers() {
  try {
    // This will automatically fetch all pages
    const allUsers = await client.getAllUsers(500) // 500 users per page

    console.log(`Total users fetched: ${allUsers.length}`)

    // Count users with memberships
    const usersWithMemberships = allUsers.filter((u) => u.membership !== null)
    console.log(`Users with memberships: ${usersWithMemberships.length}`)

    // Count total living dexes
    const totalDexes = allUsers.reduce((sum, u) => sum + u.livingDexCount, 0)
    console.log(`Total living dexes: ${totalDexes}`)
  } catch (error) {
    console.error('Error fetching all users:', error)
  }
}

// ============================================================================
// Example 4: Get specific user profile
// ============================================================================

async function example4_getUserProfile() {
  try {
    const userId = 'clxyz123abc' // Replace with actual user ID
    const profile = await client.getUserProfile(userId)

    console.log('User Profile:')
    console.log('  ID:', profile.user.id)
    console.log('  Email:', profile.user.email)
    console.log('  Display Name:', profile.user.displayName)
    console.log('  Username:', profile.user.userName)
    console.log('  Disabled:', profile.user.isDisabled)
    console.log('  Email Verified:', profile.user.emailVerified)

    console.log('\nAccounts:', profile.accounts.length)
    profile.accounts.forEach((account) => {
      console.log(`  - ${account.provider} (${account.type})`)
    })

    console.log('\nMembership:', profile.membership ? 'Active' : 'None')
    if (profile.membership) {
      console.log('  Tier:', profile.membership.currentTier)
      console.log('  Max Dexes:', profile.membership.rewardMaxDexes)
      console.log('  Total Contributed:', profile.membership.totalContributed)
    }

    console.log('\nLiving Dexes:', profile.livingDexes.length)
    profile.livingDexes.forEach((dex) => {
      console.log(`  - ${dex.title} (${dex.gameId})`)
      console.log(`    Regular: ${dex.caughtRegular}/${dex.totalRegular}`)
      console.log(`    Shiny: ${dex.caughtShiny}/${dex.totalShiny}`)
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
  }
}

// ============================================================================
// Example 5: Get specific living dex data
// ============================================================================

async function example5_getLivingDex() {
  try {
    const dexId = 'dex123' // Replace with actual dex ID
    const dex = await client.getLivingDex(dexId)

    console.log('Living Dex:')
    console.log('  ID:', dex.id)
    console.log('  Title:', dex.title)
    console.log('  Game:', dex.gameId)
    console.log('  Game Set:', dex.gameSetId)
    console.log('  Preset:', dex.presetId)
    console.log('  Schema Version:', dex.schemaVersion)

    console.log('\nProgress:')
    console.log('  Regular:', `${dex.caughtRegular}/${dex.totalRegular}`)
    console.log('  Shiny:', `${dex.caughtShiny}/${dex.totalShiny}`)

    console.log('\nBoxes:', dex.boxes.length)
    dex.boxes.forEach((box, index) => {
      const caughtCount = box.pokemon.filter((p) => p?.caught).length
      console.log(`  Box ${index + 1}: ${box.title} (${caughtCount}/${box.pokemon.length} caught)`)
    })

    console.log('\nLost Pokemon:', dex.lostPokemon.length)
  } catch (error) {
    console.error('Error fetching living dex:', error)
  }
}

// ============================================================================
// Example 6: Error handling
// ============================================================================

async function example6_errorHandling() {
  try {
    // Try to get a non-existent user
    await client.getUserProfile('invalid-user-id')
  } catch (error) {
    if (error instanceof Error) {
      console.error('Caught error:', error.message)
      // Error message will be like: "API Error (404): Not found"
    }
  }
}

// ============================================================================
// Run examples (uncomment to test)
// ============================================================================

// example1_getPaginatedUsers()
// example2_getCustomPage()
// example3_getAllUsers()
// example4_getUserProfile()
// example5_getLivingDex()
// example6_errorHandling()
