const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config();

const connectDB = require('../config/db');
const User = require('../models/User');
const Space = require('../models/Space');
const Booking = require('../models/Booking');
const Activity = require('../models/Activity');

const seedData = async () => {
  try {
    await connectDB();

    console.log('🔍 Checking existing database records (Safe Non-Destructive Mode)...');

    // 1. Safe, idempotent creation of Admin Account
    let adminUser = await User.findOne({ email: 'admin@respace.com' });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'System Admin',
        email: 'admin@respace.com',
        password: 'admin123',
        role: 'admin',
        organization: 'ReSpace Platform Management',
        bio: 'Head administrator for community public space utilization.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
      });
      console.log('✅ Created demo admin account: admin@respace.com (Role: admin)');
    } else {
      console.log('ℹ️ Demo admin account already exists: admin@respace.com');
    }

    // 2. Safe, idempotent creation of Demo User Account
    let demoUser = await User.findOne({ email: 'user@respace.com' });
    if (!demoUser) {
      demoUser = await User.create({
        name: 'Sarah Connor',
        email: 'user@respace.com',
        password: 'user123',
        role: 'user',
        organization: 'Civic Tech Alliance',
        bio: 'Community organizer passionate about vibrant public spaces.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400'
      });
      console.log('✅ Created demo user account: user@respace.com (Role: user)');
    } else {
      console.log('ℹ️ Demo user account already exists: user@respace.com');
    }

    // 3. Demo Spaces Definition & Idempotent Creation
    const demoSpacesDefs = [
      {
        name: 'Nexus Tech Courtyard',
        description: 'An open-air glass ceiling atrium equipped with solar charging benches, high-speed Wi-Fi, and modular seating ideal for tech meetups, hackathons, and outdoor exhibits.',
        location: {
          address: '404 Cyberway Boulevard',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94107'
        },
        category: 'Courtyard',
        capacity: 120,
        facilities: ['High-speed Wi-Fi', 'Solar Charging Benches', 'Sound System', 'Wheelchair Accessible', 'Restrooms'],
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
        isAvailable: true,
        hourlyRate: 0,
        rules: ['No loud music after 10 PM', 'Clean up after event', 'No open flame'],
        managedBy: adminUser._id
      },
      {
        name: 'Greenlight Community Amphitheater',
        description: 'A beautiful terraced green amphitheater nestled in Central Park, perfect for acoustic music, community plays, open-air cinema, and fitness classes.',
        location: {
          address: '75 Park Avenue East',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94102'
        },
        category: 'Park',
        capacity: 250,
        facilities: ['Stage Lighting', 'Acoustic Shell', 'Restrooms', 'Parking', 'Wheelchair Accessible'],
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000',
        isAvailable: true,
        hourlyRate: 15,
        rules: ['Acoustic sound limits enforced', 'Trash separation mandatory'],
        managedBy: adminUser._id
      },
      {
        name: 'Skyline Innovation Rooftop',
        description: 'Panoramic skyline view rooftop venue featuring climate-controlled pods, artificial turf, ambient LED lighting, and presentation screens.',
        location: {
          address: '100 Tower Plaza, 18th Floor',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105'
        },
        category: 'Rooftop',
        capacity: 65,
        facilities: ['Projector & Screen', 'Wi-Fi', 'Bar Counter', 'Elevator Access', 'Restrooms'],
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1000',
        isAvailable: true,
        hourlyRate: 25,
        rules: ['Max 65 guests', 'No glass containers'],
        managedBy: adminUser._id
      },
      {
        name: 'Civic Library Digital MakerLab',
        description: 'Multi-purpose collaborative laboratory inside the public library with 3D printers, laser cutters, modular workstations, and video podcasting equipment.',
        location: {
          address: '88 Library Square',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94103'
        },
        category: 'Library',
        capacity: 35,
        facilities: ['3D Printers', 'Podcasting Equipment', 'Wi-Fi', 'Smartboards', 'Restrooms'],
        image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000',
        isAvailable: true,
        hourlyRate: 0,
        rules: ['Safety goggles required for machinery', 'No food inside printer bay'],
        managedBy: adminUser._id
      },
      {
        name: 'Metro Heritage Hall',
        description: 'Restored historic community hall with hardwood flooring, high ceilings, full acoustic dampening, and flexible seating configuration.',
        location: {
          address: '12 Heritage Street',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94110'
        },
        category: 'Community Hall',
        capacity: 180,
        facilities: ['Kitchen Access', 'Tables & Chairs', 'Sound System', 'Projector', 'Parking'],
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000',
        isAvailable: true,
        hourlyRate: 10,
        rules: ['Decorations must use removable tape', 'Clean kitchen after use'],
        managedBy: adminUser._id
      }
    ];

    const seededSpaces = [];
    for (const spaceDef of demoSpacesDefs) {
      let space = await Space.findOne({ name: spaceDef.name });
      if (!space) {
        space = await Space.create(spaceDef);
        console.log(`✅ Created demo space: "${spaceDef.name}"`);
      } else {
        console.log(`ℹ️ Demo space already exists: "${spaceDef.name}"`);
      }
      seededSpaces.push(space);
    }

    // 4. Demo Activities Definition & Idempotent Creation
    const demoActivitiesDefs = [
      {
        title: 'Open Source Civic Hackathon 2026',
        description: 'Join local developers, designers, and urban planners for a 1-day hackathon solving city space allocation challenges.',
        category: 'Workshop',
        organizer: demoUser._id,
        space: seededSpaces[0]._id,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        startTime: '09:00',
        endTime: '17:00',
        expectedParticipants: 50,
        participants: [demoUser._id, adminUser._id],
        status: 'upcoming',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000'
      },
      {
        title: 'Sunrise Community Yoga & Wellness',
        description: 'Revitalize your weekend with an energizing morning yoga session at the Greenlight Amphitheater. Open to all skill levels.',
        category: 'Fitness',
        organizer: demoUser._id,
        space: seededSpaces[1]._id,
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        startTime: '07:00',
        endTime: '08:30',
        expectedParticipants: 40,
        participants: [demoUser._id],
        status: 'upcoming',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1000'
      },
      {
        title: 'Urban Gardening & Micro-Farming Workshop',
        description: 'Learn sustainable urban farming techniques, hydroponics, and balcony gardening from master horticulturists.',
        category: 'Social Cause',
        organizer: adminUser._id,
        space: seededSpaces[2]._id,
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        startTime: '14:00',
        endTime: '16:30',
        expectedParticipants: 25,
        participants: [demoUser._id],
        status: 'upcoming',
        image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1000'
      }
    ];

    const seededActivities = [];
    for (const actDef of demoActivitiesDefs) {
      let activity = await Activity.findOne({ title: actDef.title });
      if (!activity) {
        activity = await Activity.create(actDef);
        console.log(`✅ Created demo activity: "${actDef.title}"`);
      } else {
        console.log(`ℹ️ Demo activity already exists: "${actDef.title}"`);
      }
      seededActivities.push(activity);
    }

    // 5. Demo Bookings Definition & Idempotent Creation
    const demoBookingsDefs = [
      {
        user: demoUser._id,
        space: seededSpaces[0]._id,
        activity: seededActivities[0]._id,
        requestedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        startTime: '09:00',
        endTime: '17:00',
        purpose: 'Hosting the Open Source Civic Hackathon event for local developers.',
        expectedParticipants: 50,
        status: 'approved',
        adminNotes: 'Approved by admin for civic tech community event.'
      },
      {
        user: demoUser._id,
        space: seededSpaces[1]._id,
        activity: seededActivities[1]._id,
        requestedDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        startTime: '07:00',
        endTime: '08:30',
        purpose: 'Sunrise Community Yoga Session for neighborhood residents.',
        expectedParticipants: 40,
        status: 'pending',
        adminNotes: ''
      }
    ];

    for (const bDef of demoBookingsDefs) {
      let booking = await Booking.findOne({
        space: bDef.space,
        purpose: bDef.purpose
      });
      if (!booking) {
        await Booking.create(bDef);
        console.log(`✅ Created demo booking: "${bDef.purpose.slice(0, 35)}..."`);
      } else {
        console.log(`ℹ️ Demo booking already exists: "${bDef.purpose.slice(0, 35)}..."`);
      }
    }

    console.log('--------------------------------------------------');
    console.log('✅ Safe database seeding completed successfully!');
    console.log('Preserved all custom users, spaces, and bookings.');
    console.log('Demo Accounts Available:');
    console.log('Admin: admin@respace.com');
    console.log('User:  user@respace.com');
    console.log('--------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = seedData;
