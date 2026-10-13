import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Admin user
  const hash = await bcrypt.hash('Admin@KCS2025!', 12)
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@kiboyacomprehensiveschool.co.ke' },
    update: {},
    create: {
      name:     'School Admin',
      email:    'admin@kiboyacomprehensiveschool.co.ke',
      password: hash,
      role:     'ADMIN',
    },
  })
  console.log('✅ Admin user:', admin.email)

  // Site settings
  const defaultSettings = [
    { key: 'site_name',        value: 'Kiboya Comprehensive School' },
    { key: 'site_tagline',     value: 'Nurturing Excellence, Building Tomorrow' },
    { key: 'site_email',       value: 'info@kiboyacomprehensiveschool.co.ke' },
    { key: 'site_phone',       value: '+254 700 000 000' },
    { key: 'site_address',     value: 'Kieni West, Nyeri County, Kenya' },
    { key: 'established_year', value: '1985' },
    { key: 'enrollment_total', value: '480' },
    { key: 'site_mission',     value: 'To provide quality, inclusive education that empowers learners with knowledge, skills, and values for lifelong success and meaningful contribution to society.' },
    { key: 'site_vision',      value: 'To be a leading centre of academic excellence and holistic development in Kieni Constituency and beyond.' },
    { key: 'social_facebook',  value: '' },
    { key: 'social_whatsapp',  value: '' },
  ]
  for (const s of defaultSettings) {
    await prisma.siteSetting.upsert({ where: { key: s.key }, update: {}, create: s })
  }
  console.log('✅ Site settings seeded')

  // Enrollment snapshot
  await prisma.enrollmentSnapshot.upsert({
    where: { year: 2025 },
    update: {},
    create: { year: 2025, totalStudents: 480, maleCount: 238, femaleCount: 242, note: 'As at January 2025 term opening' },
  })

  // Streams
  const streamData = [
    { name: 'Form 1A', level: 'Form 1', order: 0 },
    { name: 'Form 1B', level: 'Form 1', order: 1 },
    { name: 'Form 2A', level: 'Form 2', order: 0 },
    { name: 'Form 2B', level: 'Form 2', order: 1 },
    { name: 'Form 3A', level: 'Form 3', order: 0 },
    { name: 'Form 3B', level: 'Form 3', order: 1 },
    { name: 'Form 4A', level: 'Form 4', order: 0 },
    { name: 'Form 4B', level: 'Form 4', order: 1 },
  ]
  const existingStreams = await prisma.stream.count()
  if (existingStreams === 0) {
    await prisma.stream.createMany({ data: streamData })
    console.log('✅ Streams seeded')
  }

  // Sample leadership staff
  const staffExists = await prisma.staffMember.count()
  if (staffExists === 0) {
    await prisma.staffMember.createMany({
      data: [
        { name: 'James Mwangi',  title: 'Principal', category: 'LEADERSHIP', department: 'Administration', order: 0, published: true },
        { name: 'Mary Njoroge',  title: 'Deputy Principal — Curriculum', category: 'LEADERSHIP', department: 'Academics', order: 1, published: true },
        { name: 'Peter Kamau',   title: 'Deputy Principal — Administration', category: 'LEADERSHIP', order: 2, published: true },
      ],
    })
    console.log('✅ Sample staff seeded')
  }

  // Sample programs
  const programsExist = await prisma.program.count()
  if (programsExist === 0) {
    await prisma.program.createMany({
      data: [
        { title: 'STEM Club', slug: 'stem-club', description: 'Science, Technology, Engineering and Mathematics for curious minds.', icon: '🔬', order: 0, published: true },
        { title: 'Sports & Athletics', slug: 'sports-athletics', description: 'Football, volleyball, athletics and inter-school competitions.', icon: '⚽', order: 1, published: true },
        { title: 'Debating & Public Speaking', slug: 'debating', description: 'Developing confident communicators and critical thinkers.', icon: '🎤', order: 2, published: true },
        { title: 'Drama & Music', slug: 'drama-music', description: 'Creative expression through performance and music festivals.', icon: '🎭', order: 3, published: true },
      ],
    })
    console.log('✅ Sample programs seeded')
  }

  // Sample welcome post
  const postsExist = await prisma.post.count()
  if (postsExist === 0) {
    await prisma.post.create({
      data: {
        title:       'Welcome to the New Kiboya Comprehensive School Website',
        slug:        'welcome-to-our-new-website',
        excerpt:     'We are excited to launch our new website as part of the Kieni Schools Digital Participation Program.',
        content:     '<p>Dear students, parents, and community members,</p><p>We are proud to launch our new digital home. This website will keep you informed about school news, events, programs, and developments.</p><p>This website is part of the <strong>Kieni Schools Digital Participation Program</strong>, a constituency-wide initiative to equip 36 schools in Kieni with professional digital identities.</p><p>We look forward to serving you better.</p>',
        published:   true,
        publishedAt: new Date(),
        authorId:    admin.id,
      },
    })
    console.log('✅ Welcome post seeded')
  }

  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => { console.error('❌ Seed error:', e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
