#!/usr/bin/env node

/**
 * Database State Verification Script
 * 
 * This script helps verify the current state of your database
 * and checks for common migration issues.
 * 
 * Usage:
 *   node scripts/verify-db-state.js
 * 
 * Or with npm:
 *   npm run verify-db
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function verifyDatabaseState() {
  console.log('🔍 Starting Database State Verification...\n');

  try {
    // Test database connection
    console.log('1️⃣ Testing database connection...');
    await prisma.$connect();
    console.log('   ✅ Database connection successful\n');

    // Check User table
    console.log('2️⃣ Checking User table...');
    const userCount = await prisma.user.count();
    console.log(`   ✅ User table exists with ${userCount} records`);
    
    // Get sample user to check schema
    const sampleUser = await prisma.user.findFirst();
    if (sampleUser) {
      console.log('   📊 User table columns:', Object.keys(sampleUser));
      console.log(`   🔑 role_id present: ${sampleUser.hasOwnProperty('role_id') ? '✅ Yes' : '❌ No'}`);
    }
    console.log();

    // Check Note table
    console.log('3️⃣ Checking Note table...');
    const noteCount = await prisma.note.count();
    console.log(`   ✅ Note table exists with ${noteCount} records`);
    
    const sampleNote = await prisma.note.findFirst();
    if (sampleNote) {
      console.log('   📊 Note table columns:', Object.keys(sampleNote));
      console.log(`   🔗 userId present: ${sampleNote.hasOwnProperty('userId') ? '✅ Yes' : '❌ No'}`);
    }
    console.log();

    // Check Role table
    console.log('4️⃣ Checking Role table...');
    try {
      const roleCount = await prisma.role.count();
      console.log(`   ✅ Role table exists with ${roleCount} records`);
      
      if (roleCount === 0) {
        console.log('   ⚠️  Warning: Role table is empty. You may want to seed it with default roles.');
      } else {
        const roles = await prisma.role.findMany();
        console.log('   📋 Existing roles:', roles.map(r => r.name).join(', '));
      }
    } catch (error) {
      console.log('   ❌ Role table does not exist or is inaccessible');
      console.log('   💡 This means the latest migration has not been applied');
    }
    console.log();

    // Check for orphaned notes
    console.log('5️⃣ Checking data integrity...');
    
    // Note: Using raw query to check for orphaned notes before foreign key enforcement
    // In practice, Prisma client prevents orphaned records due to referential integrity
    try {
      const orphanedResult = await prisma.$queryRaw`
        SELECT COUNT(*) as count 
        FROM "Note" 
        WHERE "userId" IS NOT NULL 
        AND NOT EXISTS (SELECT 1 FROM "User" WHERE "User".id = "Note"."userId")
      `;
      const orphanedNotes = Number(orphanedResult[0].count);
      
      if (orphanedNotes > 0) {
        console.log(`   ⚠️  Warning: Found ${orphanedNotes} notes with invalid userId references`);
      } else {
        console.log('   ✅ No orphaned notes found');
      }
    } catch (error) {
      console.log('   ⚠️  Could not check for orphaned notes:', error.message);
    }
    console.log();

    // Check migration status using raw query
    console.log('6️⃣ Checking migration history...');
    try {
      const migrations = await prisma.$queryRaw`
        SELECT migration_name, finished_at, rolled_back_at 
        FROM "_prisma_migrations" 
        ORDER BY finished_at DESC 
        LIMIT 5
      `;
      
      console.log('   📜 Recent migrations:');
      migrations.forEach((m) => {
        const status = m.rolled_back_at ? '🔄 Rolled back' : '✅ Applied';
        const date = new Date(m.finished_at).toLocaleString();
        console.log(`      ${status} - ${m.migration_name} (${date})`);
      });
    } catch (error) {
      console.log('   ⚠️  Could not read migration history:', error.message);
    }
    console.log();

    // Check for the specific index that was causing issues
    console.log('7️⃣ Checking for problematic indexes...');
    try {
      const indexes = await prisma.$queryRaw`
        SELECT indexname, tablename 
        FROM pg_indexes 
        WHERE schemaname = 'public' 
        AND tablename IN ('User', 'roles')
      `;
      
      console.log('   📇 Current indexes:');
      indexes.forEach((idx) => {
        console.log(`      - ${idx.tablename}.${idx.indexname}`);
        
        // Flag the problematic index if it still exists
        if (idx.indexname === 'User_resetToken_key') {
          console.log('        ⚠️  This index should have been dropped by migration 20260201135908');
        }
      });
    } catch (error) {
      console.log('   ⚠️  Could not check indexes:', error.message);
    }
    console.log();

    // Final summary
    console.log('✨ Verification Complete!\n');
    console.log('📋 Summary:');
    console.log('   - Database connection: ✅');
    console.log('   - User table: ✅');
    console.log('   - Note table: ✅');
    
    // Try to access role to see if migration is complete
    try {
      await prisma.role.findFirst();
      console.log('   - Role table: ✅');
      console.log('   - Latest migration applied: ✅');
    } catch {
      console.log('   - Role table: ❌ (migration not yet applied)');
      console.log('   - Latest migration applied: ❌');
      console.log('\n💡 Next steps: Run "npx prisma migrate deploy" to apply pending migrations');
    }

  } catch (error) {
    console.error('❌ Error during verification:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('   1. Check your DATABASE_URL environment variable');
    console.error('   2. Ensure the database server is running');
    console.error('   3. Verify database credentials');
    console.error('   4. Check network connectivity to database');
    
    if (error.code === 'P1001') {
      console.error('\n   💡 Database connection failed. Is your database server running?');
    } else if (error.code === 'P1003') {
      console.error('\n   💡 Database does not exist. Create it first with: createdb <dbname>');
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Run the verification
verifyDatabaseState().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
