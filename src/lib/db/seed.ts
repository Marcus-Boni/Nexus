import { db } from './index'
import { users } from './schema'
import { hash } from 'bcryptjs'

async function seed() {
  const passwordHash = await hash('nexus123456', 12)
  await db
    .insert(users)
    .values({
      name: 'Admin',
      email: 'admin@nexus.local',
      passwordHash,
      role: 'admin',
    })
    .onConflictDoNothing()
  console.log('✓ Seed complete — admin@nexus.local / nexus123456')
}

seed().catch(console.error)
