import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Clear existing data (optional - comment out if you want to keep existing data)
    await prisma.todo.deleteMany();
    console.log('  ✓ Cleared existing todos');

    // Create sample todos
    const todos = await prisma.todo.createMany({
        data: [
            {
                title: 'Welcome to your Todo App! 🎉',
                completed: false,
            },
            {
                title: 'Learn React and TypeScript',
                completed: true,
            },
            {
                title: 'Build a fullstack application',
                completed: true,
            },
            {
                title: 'Master Prisma ORM',
                completed: false,
            },
            {
                title: 'Deploy to production',
                completed: false,
            },
        ],
    });

    console.log(`  ✓ Created ${todos.count} sample todos`);
    console.log('✅ Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
