import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'alice@example.com' },
      update: {},
      create: {
        email: 'alice@example.com',
        username: 'alice',
        name: 'Alice Smith',
        password: await hash('password123', 10),
        country: 'United States',
        phone: '+1234567890',
        emailVerified: true,
        role: 'ARTIST',
        image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=alice',
      },
    }),
    prisma.user.upsert({
      where: { email: 'bob@example.com' },
      update: {},
      create: {
        email: 'bob@example.com',
        username: 'bob',
        name: 'Bob Johnson',
        password: await hash('password123', 10),
        country: 'Canada',
        phone: '+1987654321',
        emailVerified: true,
        role: 'ARTIST',
        image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=bob',
      },
    }),
    prisma.user.upsert({
      where: { email: 'charlie@example.com' },
      update: {},
      create: {
        email: 'charlie@example.com',
        username: 'charlie',
        name: 'Charlie Davis',
        password: await hash('password123', 10),
        country: 'UK',
        phone: '+4412345678',
        emailVerified: true,
        role: 'USER',
        image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=charlie',
      },
    }),
  ]);

  // Sample artwork data with realistic art descriptions and placeholder images
  const artworks = [
    {
      title: 'Ethereal Dreams in Oil',
      description: 'A mesmerizing oil painting that captures the essence of dreams. Swirling colors of deep blues and purples blend seamlessly with golden highlights, creating an otherworldly atmosphere that invites viewers into a realm of imagination.',
      image: 'https://images.unsplash.com/photo-1549490349-8643362247b5',
      price: '1200',
      bidEndDate: '2025-12-31',
      published: true,
      authorId: users[0].id,
      authorUserName: users[0].username,
      bidHistory: [
        {
          userId: users[2].id,
          username: users[2].username,
          amount: '1300',
          timestamp: new Date('2025-10-15').toISOString(),
        },
        {
          userId: users[1].id,
          username: users[1].username,
          amount: '1400',
          timestamp: new Date('2025-10-20').toISOString(),
        },
      ],
    },
    {
      title: 'Urban Symphony',
      description: 'A contemporary mixed media piece that captures the rhythm of city life. Layers of acrylic paint, collage elements, and metallic accents create a dynamic composition that pulses with urban energy.',
      image: 'https://images.unsplash.com/photo-1551913902-c92207136625',
      price: '2500',
      bidEndDate: '2025-11-30',
      published: true,
      authorId: users[1].id,
      authorUserName: users[1].username,
      bidHistory: [
        {
          userId: users[2].id,
          username: users[2].username,
          amount: '2600',
          timestamp: new Date('2025-10-25').toISOString(),
        },
      ],
    },
    {
      title: 'Coastal Serenity',
      description: 'A serene watercolor painting capturing the peaceful essence of a coastal morning. Soft pastel hues blend together to create a misty atmosphere where sea meets sky.',
      image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d',
      price: '850',
      bidEndDate: '2025-12-15',
      published: true,
      authorId: users[0].id,
      authorUserName: users[0].username,
      bidHistory: [
        {
          userId: users[2].id,
          username: users[2].username,
          amount: '900',
          timestamp: new Date('2025-11-01').toISOString(),
        },
      ],
    },
    {
      title: 'Digital Dystopia',
      description: 'A striking digital artwork exploring themes of technology and humanity. Neon colors and geometric patterns create a futuristic landscape that questions our relationship with the digital world.',
      image: 'https://images.unsplash.com/photo-1550784343-6bd0ce5d600b',
      price: '1800',
      bidEndDate: '2025-12-20',
      published: true,
      authorId: users[1].id,
      authorUserName: users[1].username,
      bidHistory: [],
    },
    {
      title: 'Autumn Reflections',
      description: 'A stunning acrylic painting capturing the vibrant colors of fall. Rich reds, oranges, and yellows dance across the canvas, reflecting in a still lake below.',
      image: 'https://images.unsplash.com/photo-1552355170-c8337700b8ad',
      price: '1500',
      bidEndDate: '2025-12-10',
      published: true,
      authorId: users[0].id,
      authorUserName: users[0].username,
      bidHistory: [],
    },
    {
      title: 'Abstract Emotions',
      description: 'An expressive abstract piece that explores human emotions through color and form. Bold brushstrokes and layered textures create a powerful visual impact.',
      image: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb',
      price: '2000',
      bidEndDate: '2025-12-25',
      published: true,
      authorId: users[1].id,
      authorUserName: users[1].username,
      bidHistory: [],
    },
  ];

  // Create sample posts
  for (const artwork of artworks) {
    await prisma.post.create({
      data: artwork,
    });
  }

  // Sample messages between users will be added through the chat feature

  console.log('Sample data has been created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });