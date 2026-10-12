import { Room, MenuItem, GalleryItem, NearbyAttraction } from '../types';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'deluxe',
    title: 'Deluxe Room',
    price: 1500,
    capacity: '2 Guests',
    desc: 'Comfortable AC room with King-size bed, Smart TV, 24/7 power backup, 24/7 hot water, and complimentary swimming pool access (Room only, No Breakfast).',
    image: 'https://i.pinimg.com/736x/b3/e0/cf/b3e0cfc61f315eebd01c730bbf9c58b5.jpg',
    images: [
      'https://i.pinimg.com/736x/b3/e0/cf/b3e0cfc61f315eebd01c730bbf9c58b5.jpg',
      'https://i.pinimg.com/736x/f5/bb/de/f5bbded199a723314a539feef9af6eb6.jpg',
      'https://i.pinimg.com/736x/12/a3/16/12a3169cf39908832ecd941c2ac74b04.jpg',
      'https://i.pinimg.com/736x/1f/a4/95/1fa495c87e6212079dadd60c94867adb.jpg'
    ],
    amenities: [
      'Free Swimming Pool Access',
      'Smart TV',
      '24/7 Power Backup',
      '24/7 Hot & Cold Water',
      'Air Conditioning',
      'Free Wi-Fi',
      'Housekeeping',
      'King-size bed',
      'Toiletries'
    ],
    isAvailable: true,
    availableRoomsCount: 3,
  },
  {
    id: 'semi-deluxe',
    title: 'Semi Deluxe Room',
    price: 2000,
    capacity: '2 Guests',
    desc: 'Spacious AC room with King Bed, private balcony view, Smart TV, 24/7 power backup, 24/7 hot & cold water, and complimentary swimming pool & breakfast.',
    image: 'https://i.pinimg.com/736x/8b/7c/da/8b7cdaa3a8d6bf5bd53ef57b96691ffa.jpg',
    images: [
      'https://i.pinimg.com/736x/8b/7c/da/8b7cdaa3a8d6bf5bd53ef57b96691ffa.jpg',
      'https://i.pinimg.com/736x/66/ff/d7/66ffd7e4ac6b6cbab3cf934c59a74311.jpg',
      'https://i.pinimg.com/736x/78/0e/f4/780ef44602df23bcb645f64d7a2ec2b5.jpg',
      'https://i.pinimg.com/736x/0e/55/ee/0e55ee84730e03f58c8423ae38a97d47.jpg'
    ],
    amenities: [
      'Free Swimming Pool Access',
      'Smart TV',
      '24/7 Power Backup',
      '24/7 Hot & Cold Water',
      'Air Conditioning',
      'Free Wi-Fi',
      'Complimentary Breakfast',
      'Housekeeping',
      'Toiletries'
    ],
    isAvailable: true,
    availableRoomsCount: 3,
  },
  {
    id: 'premium-deluxe',
    title: 'Premium Deluxe Room',
    price: 2200,
    capacity: '3 Guests',
    desc: 'Premium appointed room with elegant wooden finishes, Premium Double Bed, Smart TV, 24/7 power backup, 24/7 hot water, free swimming pool, and complimentary breakfast.',
    image: 'https://i.pinimg.com/736x/0e/25/23/0e2523f72d06a739d9eb8c5fdd925180.jpg',
    images: [
      'https://i.pinimg.com/736x/0e/25/23/0e2523f72d06a739d9eb8c5fdd925180.jpg',
      'https://i.pinimg.com/736x/ce/59/1b/ce591b895bc315f578d3e6944df004d2.jpg',
      'https://i.pinimg.com/736x/34/4b/54/344b5424c51903c9a387836d299d2f76.jpg',
      'https://i.pinimg.com/736x/32/dd/9b/32dd9b10043027b57dcc2f30b1c06c3a.jpg',
      'https://i.pinimg.com/736x/58/9d/e7/589de7ce91ab1eeef22a90c7082da55f.jpg'
    ],
    amenities: [
      'Free Swimming Pool Access',
      'Smart TV',
      '24/7 Power Backup',
      '24/7 Hot & Cold Water',
      'Air Conditioning',
      'Free Wi-Fi',
      'Complimentary Breakfast',
      'Housekeeping',
      'Toiletries',
      'Premium Double Bed'
    ],
    isAvailable: true,
    availableRoomsCount: 3,
  },
  {
    id: 'royal-deluxe',
    title: 'Royal Deluxe Room',
    price: 3500,
    capacity: '3-4 Guests',
    desc: 'Exquisite royal deluxe room with luxurious wooden accents, Two Double Beds, Smart TV, 24/7 power backup, 24/7 hot water, free swimming pool access, attached bathroom with geyser, and complimentary breakfast.',
    image: 'https://i.pinimg.com/736x/d4/ee/95/d4ee95e5824d850c6e30ad56e1939f74.jpg',
    images: [
      'https://i.pinimg.com/736x/d4/ee/95/d4ee95e5824d850c6e30ad56e1939f74.jpg',
      'https://i.pinimg.com/736x/70/16/57/701657bcd93fb3facdefc0c66d9a85bd.jpg',
      'https://i.pinimg.com/736x/58/9d/e7/589de7ce91ab1eeef22a90c7082da55f.jpg'
    ],
    amenities: [
      'Free Swimming Pool Access',
      'Smart TV',
      '24/7 Power Backup',
      '24/7 Hot & Cold Water',
      'Air Conditioning',
      'Free Wi-Fi',
      'Complimentary Breakfast',
      'Two Beds',
      'Housekeeping',
      'Toiletries'
    ],
    isAvailable: true,
    availableRoomsCount: 3,
  },
  {
    id: 'super-deluxe',
    title: 'Super Deluxe Room',
    price: 4000,
    capacity: '4 Guests',
    desc: 'Luxurious spacious super deluxe room featuring premium wood finishings, Smart TV, 24/7 power backup, 24/7 hot water, free pool access, and complimentary chef-special breakfast.',
    image: 'https://i.pinimg.com/736x/07/8f/b8/078fb8f974b91fe1827b0770ca92e451.jpg',
    images: [
      'https://i.pinimg.com/736x/07/8f/b8/078fb8f974b91fe1827b0770ca92e451.jpg',
      'https://i.pinimg.com/736x/23/9c/93/239c93f80b29795e3f2dafb78f799311.jpg',
      'https://i.pinimg.com/736x/58/9d/e7/589de7ce91ab1eeef22a90c7082da55f.jpg'
    ],
    amenities: [
      'Free Swimming Pool Access',
      'Smart TV',
      '24/7 Power Backup',
      '24/7 Hot & Cold Water',
      'Air Conditioning',
      'Free Wi-Fi',
      'Complimentary Breakfast',
      'Electric Kettle',
      'Two Double Beds',
      'Housekeeping',
      'Toiletries'
    ],
    isAvailable: true,
    availableRoomsCount: 3,
  },
  {
    id: 'suite',
    title: 'Royal Suite',
    price: 5000,
    capacity: '5 Guests',
    desc: 'Our premier luxury heritage suite accommodating up to 5 guests with 1 King Size Bed & 1 Queen Size Bed, Free Swimming Pool access, Smart TV, 24/7 power backup, 24/7 hot water, Luxury Attached Bathroom, Electric Kettle, and inclusive royal breakfast.',
    image: 'https://i.pinimg.com/736x/b6/fa/6a/b6fa6a6a3b3764a0ebf70c8244a386a4.jpg',
    images: [
      'https://i.pinimg.com/736x/b6/fa/6a/b6fa6a6a3b3764a0ebf70c8244a386a4.jpg',
      'https://i.pinimg.com/736x/07/16/09/071609b96f678456adf1be0dbf143bcd.jpg',
      'https://i.pinimg.com/736x/b7/d1/67/b7d16747947da28a56bb92b2e9b9686a.jpg',
      'https://i.pinimg.com/736x/aa/57/3f/aa573f169c99fe7f158339301c4f76bb.jpg',
      'https://i.pinimg.com/736x/df/5d/cb/df5dcbbcdeecd80722846bab9fc2f135.jpg',
      'https://i.pinimg.com/736x/dc/86/0f/dc860fc84407c8d008b7d4365447d855.jpg',
      'https://i.pinimg.com/736x/dc/91/20/dc9120a3659a5bd1ff115d29a7cfea3f.jpg',
      'https://i.pinimg.com/736x/38/68/ed/3868ed9231291ed9839aaa7f88d64e9e.jpg'
    ],
    amenities: [
      'Free Swimming Pool Access',
      'Smart TV',
      '24/7 Power Backup',
      '24/7 Hot & Cold Water',
      '1 King Size Bed',
      '1 Queen Size Bed',
      'Luxury Bathroom',
      'Electric Kettle',
      'Air Conditioning',
      'Free Wi-Fi',
      'Housekeeping',
      'Toiletries',
      'Complimentary Royal Breakfast',
      'Sofa Seating',
      'Mini Refrigerator',
      'Dressing Mirror'
    ],
    isAvailable: true,
    availableRoomsCount: 3,
  },
  {
    id: 'dormitory',
    title: 'Dormitory Suite',
    price: 7000,
    capacity: '10-12 Guests',
    desc: 'Large, clean spacious accommodation ideal for wedding parties, family reunions, and tour travels. Includes Smart TV, 24/7 power backup, 24/7 hot water, free swimming pool access, morning breakfast and AC.',
    image: 'https://i.pinimg.com/1200x/db/c3/9e/dbc39ec02e4eec197fa319621801e467.jpg',
    images: [
      'https://i.pinimg.com/1200x/db/c3/9e/dbc39ec02e4eec197fa319621801e467.jpg'
    ],
    amenities: [
      'Free Swimming Pool Access',
      'Smart TV',
      '24/7 Power Backup',
      '24/7 Hot & Cold Water',
      'Air Conditioning',
      'Free Wi-Fi',
      'Housekeeping',
      'Toiletries',
      'Complimentary Breakfast for All',
      'Multiple Private Lockers',
      'En-Suite Multiple Washrooms',
      'Luggage Assistance'
    ],
    isAvailable: true,
    availableRoomsCount: 3,
  }
];

export const INITIAL_MENU: MenuItem[] = [
  // ==========================================
  // PAGE 1: NOODLE
  // ==========================================
  // Veg
  { id: 'nd-1', name: 'Veg. Hakka Noodles', category: 'noodles', categoryName: 'Noodle', subCategory: 'Veg', isVeg: true },
  { id: 'nd-2', name: 'Veg. Mix. Hakka Noodles', category: 'noodles', categoryName: 'Noodle', subCategory: 'Veg', isVeg: true },
  { id: 'nd-3', name: 'Veg. Chilli Garlic Noodles', category: 'noodles', categoryName: 'Noodle', subCategory: 'Veg', isVeg: true },
  { id: 'nd-4', name: 'Veg. Sezwan Noodles', category: 'noodles', categoryName: 'Noodle', subCategory: 'Veg', isVeg: true },
  { id: 'nd-5', name: 'Veg. Hongkong Noodles', category: 'noodles', categoryName: 'Noodle', subCategory: 'Veg', isVeg: true },
  { id: 'nd-6', name: 'Paneer Noodles', category: 'noodles', categoryName: 'Noodle', subCategory: 'Veg', isVeg: true },
  { id: 'nd-7', name: 'American Choupse', category: 'noodles', categoryName: 'Noodle', subCategory: 'Veg', isVeg: true },
  { id: 'nd-8', name: 'Veg. Chinese Choupsey', category: 'noodles', categoryName: 'Noodle', subCategory: 'Veg', isVeg: true },
  // Nonveg
  { id: 'nd-9', name: 'Egg Hakka Noodles', category: 'noodles', categoryName: 'Noodle', subCategory: 'Nonveg', isVeg: false },
  { id: 'nd-10', name: 'Chicken Hakka Noodles', category: 'noodles', categoryName: 'Noodle', subCategory: 'Nonveg', isVeg: false },
  { id: 'nd-11', name: 'Mix. Hakka Noodles', category: 'noodles', categoryName: 'Noodle', subCategory: 'Nonveg', isVeg: false, isSpecial: true },
  { id: 'nd-12', name: 'Egg Chicken Chilly Garlic Noodles', category: 'noodles', categoryName: 'Noodle', subCategory: 'Nonveg', isVeg: false },
  { id: 'nd-13', name: 'Mix. Chilli Garlic Noodles', category: 'noodles', categoryName: 'Noodle', subCategory: 'Nonveg', isVeg: false },
  { id: 'nd-14', name: 'Chicken Sezwan Noodles', category: 'noodles', categoryName: 'Noodle', subCategory: 'Nonveg', isVeg: false },
  { id: 'nd-15', name: 'Chicken Hongkong Noodles', category: 'noodles', categoryName: 'Noodle', subCategory: 'Nonveg', isVeg: false },
  { id: 'nd-16', name: 'Mix. Hongkong Noodles', category: 'noodles', categoryName: 'Noodle', subCategory: 'Nonveg', isVeg: false },
  { id: 'nd-17', name: 'Chicken Singapuri Noodles', category: 'noodles', categoryName: 'Noodle', subCategory: 'Nonveg', isVeg: false },
  { id: 'nd-18', name: 'Mix. Chineese Choupsy', category: 'noodles', categoryName: 'Noodle', subCategory: 'Nonveg', isVeg: false },
  { id: 'nd-19', name: 'Non. Veg. Chineese Choup', category: 'noodles', categoryName: 'Noodle', subCategory: 'Nonveg', isVeg: false },

  // ==========================================
  // PAGE 2: INDIAN VEG.
  // ==========================================
  { id: 'iv-1', name: 'Kadai Paneer (8p)', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true },
  { id: 'iv-2', name: 'Paneer Do Pyaza (8p)', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true },
  { id: 'iv-3', name: 'Paneer Lababdar', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true },
  { id: 'iv-4', name: 'Paneer Butter Masala', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true, isSpecial: true },
  { id: 'iv-5', name: 'Malai Kofta (2p)', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true },
  { id: 'iv-6', name: 'Mix Veg. (F)', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Vegetable Mains', isVeg: true },
  { id: 'iv-7', name: 'Mix Veg. (H)', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Vegetable Mains', isVeg: true },
  { id: 'iv-8', name: 'Paneer Pasinda (2p)', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true },
  { id: 'iv-9', name: 'Paneer Muskan', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true },
  { id: 'iv-10', name: 'Paneer Tikka Masala (6p)', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true, isSpecial: true },
  { id: 'iv-11', name: 'Paneer Mushroom Masala (6p)', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true },
  { id: 'iv-12', name: 'Shahi Paneer (8p)', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true },
  { id: 'iv-13', name: 'Paneer Tawa Masala (8p)', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true },
  { id: 'iv-14', name: 'Veg. Jhalfrezi', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Vegetable Mains', isVeg: true },
  { id: 'iv-15', name: 'Veg. Diwani Handi', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Vegetable Mains', isVeg: true },
  { id: 'iv-16', name: 'Veg. Kolapuri', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Vegetable Mains', isVeg: true },
  { id: 'iv-17', name: 'Veg. Apka', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Vegetable Mains', isVeg: true },
  { id: 'iv-18', name: 'Veg. Tawa Masala', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Vegetable Mains', isVeg: true },
  { id: 'iv-19', name: 'Mushroom Mator Masala', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Vegetable Mains', isVeg: true },
  { id: 'iv-20', name: 'Punjabi Aludam (6p)', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Aloo Specials', isVeg: true },
  { id: 'iv-21', name: 'Kashmiri Aludam (6p)', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Aloo Specials', isVeg: true },
  { id: 'iv-22', name: 'Paneer Akbari', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true },
  { id: 'iv-23', name: 'Paneer Punjabi (8p)', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true },
  { id: 'iv-24', name: 'Alu Postu', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Authentic Bengal', isVeg: true, isSpecial: true },
  { id: 'iv-25', name: 'Green Peas Masala', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Vegetable Mains', isVeg: true },
  { id: 'iv-26', name: 'Paneer Chana Masala', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true },
  { id: 'iv-27', name: 'Green Peas Paneer Masala', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true },
  { id: 'iv-28', name: 'Paneer Makhani', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true },
  { id: 'iv-29', name: 'Aloo Dam', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Aloo Specials', isVeg: true },
  { id: 'iv-30', name: 'Aloo Gobi Masala', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Aloo Specials', isVeg: true },
  { id: 'iv-31', name: 'Aloo Bhaja', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Crispy Bhaja', isVeg: true },
  { id: 'iv-32', name: 'Mix. Bhaja (F)', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Crispy Bhaja', isVeg: true },
  { id: 'iv-33', name: 'Mix Bhaja (H)', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Crispy Bhaja', isVeg: true },
  { id: 'iv-34', name: 'Paneer Bharta', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Paneer & Mains', isVeg: true },
  { id: 'iv-35', name: 'Mushroom Masala', category: 'indian-veg', categoryName: 'Indian Veg.', subCategory: 'Vegetable Mains', isVeg: true },

  // ==========================================
  // PAGE 3: SOUTH INDIAN (DOSA, UTTAPAM, IDLI & VADA)
  // ==========================================
  { id: 'si-1', name: 'Plain Dosa', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Dosa Specials', isVeg: true },
  { id: 'si-2', name: 'Masala Dosa', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Dosa Specials', isVeg: true, isSpecial: true },
  { id: 'si-3', name: 'Butter Plain Dosa', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Dosa Specials', isVeg: true },
  { id: 'si-4', name: 'Butter Masala Dosa', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Dosa Specials', isVeg: true, isSpecial: true },
  { id: 'si-5', name: 'Paneer Masala Dosa', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Dosa Specials', isVeg: true, isSpecial: true },
  { id: 'si-7', name: 'Mysore Masala Dosa', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Dosa Specials', isVeg: true, isSpecial: true },
  { id: 'si-8', name: 'Plain Uttapam', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Uttapam Specials', isVeg: true },
  { id: 'si-9', name: 'Onion Tomato Uttapam', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Uttapam Specials', isVeg: true, isSpecial: true },
  { id: 'si-10', name: 'Mix Veg. Uttapam', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Uttapam Specials', isVeg: true },
  { id: 'si-11', name: 'Paneer Onion Uttapam', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Uttapam Specials', isVeg: true },
  { id: 'si-12', name: 'Steamed Idli with Sambar (2p)', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Idli & Vada', isVeg: true },
  { id: 'si-13', name: 'Fried Idli Masala (2p)', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Idli & Vada', isVeg: true },
  { id: 'si-14', name: 'Medu Vada with Sambar (2p)', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Idli & Vada', isVeg: true, isSpecial: true },
  { id: 'si-15', name: 'Sambar Vada Dip (2p)', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Idli & Vada', isVeg: true },
  { id: 'si-16', name: 'Curd Rice (South Indian Tadka)', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Rice Delights', isVeg: true },
  { id: 'si-17', name: 'Lemon Rice with Curry Leaves', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Rice Delights', isVeg: true },
  { id: 'si-18', name: 'South Indian Combo (Idli, Vada, Mini Dosa)', category: 'south-indian', categoryName: 'South Indian', subCategory: 'Combos & Platters', isVeg: true, isSpecial: true },

  // ==========================================
  // PAGE 4: INDIAN DAL & MUTTON
  // ==========================================
  // Indian Dal
  { id: 'dl-1', name: 'Dal Makhani', category: 'indian-dal', categoryName: 'Indian Dal', subCategory: 'Dals', isVeg: true, isSpecial: true },
  { id: 'dl-2', name: 'Paneer Makhani', category: 'indian-dal', categoryName: 'Indian Dal', subCategory: 'Dals', isVeg: true },
  { id: 'dl-3', name: 'Chana Masala', category: 'indian-dal', categoryName: 'Indian Dal', subCategory: 'Dals', isVeg: true },
  { id: 'dl-4', name: 'Yellow Dalfry', category: 'indian-dal', categoryName: 'Indian Dal', subCategory: 'Dals', isVeg: true },
  { id: 'dl-5', name: 'Yellow Fried Tarka', category: 'indian-dal', categoryName: 'Indian Dal', subCategory: 'Tarka', isVeg: true },
  { id: 'dl-6', name: 'Dal Panchmel', category: 'indian-dal', categoryName: 'Indian Dal', subCategory: 'Dals', isVeg: true },
  { id: 'dl-7', name: 'Dal Tiranga', category: 'indian-dal', categoryName: 'Indian Dal', subCategory: 'Dals', isVeg: true },
  { id: 'dl-8', name: 'Veg. Tarka Full', category: 'indian-dal', categoryName: 'Indian Dal', subCategory: 'Tarka', isVeg: true },
  { id: 'dl-9', name: 'Veg. Tarka Half', category: 'indian-dal', categoryName: 'Indian Dal', subCategory: 'Tarka', isVeg: true },
  { id: 'dl-10', name: 'Egg Tarka Full', category: 'indian-dal', categoryName: 'Indian Dal', subCategory: 'Tarka', isVeg: false },
  { id: 'dl-11', name: 'Egg Tarka Half', category: 'indian-dal', categoryName: 'Indian Dal', subCategory: 'Tarka', isVeg: false },
  { id: 'dl-12', name: 'Chicken Tarka Full', category: 'indian-dal', categoryName: 'Indian Dal', subCategory: 'Tarka', isVeg: false, isSpecial: true },
  // Mutton
  { id: 'mt-1', name: 'Mutton Dak Bunglow (4p)', category: 'mutton', categoryName: 'Mutton', subCategory: 'Mutton Specials', isVeg: false, isSpecial: true },
  { id: 'mt-2', name: 'Mutton Kadai (4p)', category: 'mutton', categoryName: 'Mutton', subCategory: 'Mutton Specials', isVeg: false },
  { id: 'mt-3', name: 'Mutton Roganjuce (4p)', category: 'mutton', categoryName: 'Mutton', subCategory: 'Mutton Specials', isVeg: false },
  { id: 'mt-4', name: 'Mutton Do Pyaza (4p)', category: 'mutton', categoryName: 'Mutton', subCategory: 'Mutton Specials', isVeg: false },
  { id: 'mt-5', name: 'Mutton Chap (4p)', category: 'mutton', categoryName: 'Mutton', subCategory: 'Mutton Specials', isVeg: false },
  { id: 'mt-6', name: 'Mutton Kasa (4p)', category: 'mutton', categoryName: 'Mutton', subCategory: 'Mutton Specials', isVeg: false, isSpecial: true },
  { id: 'mt-7', name: 'Mutton Curry (4p)', category: 'mutton', categoryName: 'Mutton', subCategory: 'Mutton Specials', isVeg: false },
  { id: 'mt-8', name: 'Mutton Handi (4p)', category: 'mutton', categoryName: 'Mutton', subCategory: 'Mutton Specials', isVeg: false },
  { id: 'mt-9', name: 'Mutton Handi (8p)', category: 'mutton', categoryName: 'Mutton', subCategory: 'Mutton Specials', isVeg: false, isSpecial: true },

  // ==========================================
  // PAGE 4: INDIAN NONVEG.
  // ==========================================
  { id: 'nv-1', name: 'Gram Bangla Special Chicken (4p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false, isSpecial: true },
  { id: 'nv-2', name: 'Chicken Tawa Masala (4p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-3', name: 'Chicken Punjabi (4p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-4', name: 'Chicken Lababdar (4p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-5', name: 'Chicken Kolapuri (4p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-6', name: 'Chicken Maharaja (6p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false, isSpecial: true },
  { id: 'nv-7', name: 'Chicken Kadai (4p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-8', name: 'Chicken Tikka Masala (6p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-9', name: 'Chicken Patiyala (8p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-10', name: 'Chicken Keema with Capsicum', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-11', name: 'Chicken Bharta', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false, isSpecial: true },
  { id: 'nv-12', name: 'Chicken Butter Masala (6p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-13', name: 'Chicken Do Pyaza (4p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-14', name: 'Chicken Handi (8p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-15', name: 'Chicken Handi (4p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-16', name: 'Chicken Kasha (F)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Curries', isVeg: false },
  { id: 'nv-17', name: 'Chicken Kasa (H)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Curries', isVeg: false },
  { id: 'nv-18', name: 'Chicken Curry (F)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Curries', isVeg: false },
  { id: 'nv-19', name: 'Chicken Curry (H)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Curries', isVeg: false },
  { id: 'nv-20', name: 'Chicken Chap (2p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-21', name: 'Jangla Chicken (8p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-22', name: 'Chicken Korma (2p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-23', name: 'Chicken Erani (6p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-24', name: 'Chicken Bhuna Masala (4p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-25', name: 'Desi Chicken (6p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Desi Country Chicken', isVeg: false, isSpecial: true },
  { id: 'nv-26', name: 'Prawn Masala', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Seafood', isVeg: false },
  { id: 'nv-27', name: 'Afgani Chicken (4p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Chicken Specials', isVeg: false },
  { id: 'nv-28', name: 'Murg Masalam', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Royal Mughlai', isVeg: false, isSpecial: true },
  { id: 'nv-29', name: 'Fish Tikka Masala (4p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Fish Specials', isVeg: false },
  { id: 'nv-30', name: 'Fish Masala (4p)', category: 'indian-non-veg', categoryName: 'Indian Nonveg.', subCategory: 'Fish Specials', isVeg: false },

  // ==========================================
  // PAGE 5: TANDOORI KABAB
  // ==========================================
  // Veg.
  { id: 'tk-1', name: 'Paneer Hariyali Tikka (6p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Veg', isVeg: true },
  { id: 'tk-2', name: 'Paneer Pudina Tikka (6p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Veg', isVeg: true },
  { id: 'tk-3', name: 'Paneer Malai Kabab (6p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Veg', isVeg: true },
  { id: 'tk-4', name: 'Paneer Tikka (6P)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Veg', isVeg: true },
  { id: 'tk-5', name: 'Veg. Seek Kabab (6p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Veg', isVeg: true },
  { id: 'tk-6', name: 'Hara Bhara Kabab (6p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Veg', isVeg: true },
  { id: 'tk-7', name: 'Tandoori Veg. Plater (6p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Veg', isVeg: true, isSpecial: true },
  { id: 'tk-8', name: 'Veg. Malai Kabab (6p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Veg', isVeg: true },
  { id: 'tk-9', name: 'Mushroom Tikka (6p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Veg', isVeg: true },
  // Nonveg
  { id: 'tk-10', name: 'Tandoori Chicken Full', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false, isSpecial: true },
  { id: 'tk-11', name: 'Tandoori Chicken Half', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false },
  { id: 'tk-12', name: 'Chicken Pahari Kabab (6p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false },
  { id: 'tk-13', name: 'Chicken Hariyali Tikka (6p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false },
  { id: 'tk-14', name: 'Chicken Pudina Kabab (6p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false },
  { id: 'tk-15', name: 'Chicken Sik Kabab (6p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false },
  { id: 'tk-16', name: 'Chicken Banjara Kabab (6p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false },
  { id: 'tk-17', name: 'Chicken Kalimirch Kabab (6p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false },
  { id: 'tk-18', name: 'Chicken Tikka Kabab', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false },
  { id: 'tk-19', name: 'Chicken Reshmi Kabab (6P)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false, isSpecial: true },
  { id: 'tk-20', name: 'Chicken Pyara Kabab', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false },
  { id: 'tk-21', name: 'Chicken Malai Kabab', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false },
  { id: 'tk-22', name: 'Chicken Amritsari Kabab', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false },
  { id: 'tk-23', name: 'Chicken Sezwan Tikka', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false },
  { id: 'tk-24', name: 'Fish Achari Tikka', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false },
  { id: 'tk-25', name: 'Fish Banjara Kabab', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false },
  { id: 'tk-26', name: 'Fish Tikka Kabab (6P)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false },
  { id: 'tk-27', name: 'Tandoori Prawn', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false, isSpecial: true },
  { id: 'tk-28', name: 'Tandoori Nonveg Plater (10p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false, isSpecial: true },
  { id: 'tk-29', name: 'Chicken Jungli Kabab (6p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false },
  { id: 'tk-30', name: 'Tandoori Pamfret (1p)', category: 'tandoori-kabab', categoryName: 'Tandoori Kabab', subCategory: 'Nonveg', isVeg: false, isSpecial: true },

  // ==========================================
  // PAGE 6: CHINESE GRAVY (CHINESE GAVE)
  // ==========================================
  // Veg
  { id: 'cg-1', name: 'Paneer Munchurian (8P)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Veg', isVeg: true },
  { id: 'cg-2', name: 'Mushroom Chilli (8p)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Veg', isVeg: true },
  { id: 'cg-3', name: 'Mushroom Manchurian (8p)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Veg', isVeg: true },
  { id: 'cg-4', name: 'Paneer Chilli (8P)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Veg', isVeg: true },
  // Nonveg
  { id: 'cg-5', name: 'Chicken Manchurian (8p)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Nonveg', isVeg: false },
  { id: 'cg-6', name: 'Lemon Chicken (8p)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Nonveg', isVeg: false },
  { id: 'cg-7', name: 'Sweet & Sour Chicken (8p)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Nonveg', isVeg: false },
  { id: 'cg-8', name: 'Lemon Coriander Chicken (8p)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Nonveg', isVeg: false },
  { id: 'cg-9', name: 'Sezwan Chicken (8p)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Nonveg', isVeg: false },
  { id: 'cg-10', name: 'Chicken in Black Bean Sauce', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Nonveg', isVeg: false },
  { id: 'cg-11', name: 'Fish Manchurian (8p)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Nonveg', isVeg: false },
  { id: 'cg-12', name: 'Chilli Chicken (8P)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Nonveg', isVeg: false, isSpecial: true },
  { id: 'cg-13', name: 'Girlic Chicken (8P)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Nonveg', isVeg: false },
  { id: 'cg-14', name: 'Chicken in Hot Girlic Sauce (8)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Nonveg', isVeg: false },
  { id: 'cg-15', name: 'Chilli Fish (8P)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Nonveg', isVeg: false },
  { id: 'cg-16', name: 'Girlic Fish (8P)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Nonveg', isVeg: false },
  { id: 'cg-17', name: 'Chilli Prawn', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Nonveg', isVeg: false },
  { id: 'cg-18', name: 'Prawn Manchurian (8P)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Nonveg', isVeg: false },
  { id: 'cg-19', name: 'Sezwan Prawn (8P)', category: 'chinese-gravy', categoryName: 'Chinese Gravy', subCategory: 'Nonveg', isVeg: false },

  // ==========================================
  // PAGE 7: CHINEESE SNAKES (CHINESE SNACKS)
  // ==========================================
  // Veg.
  { id: 'cs-1', name: 'Crispy Chilli Babycorn', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Veg.', isVeg: true, isSpecial: true },
  { id: 'cs-2', name: 'American Cripsy Corn', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Veg.', isVeg: true },
  { id: 'cs-3', name: 'Butter Corn Fry', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Veg.', isVeg: true },
  { id: 'cs-4', name: 'Paneer Salt & Pepper', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Veg.', isVeg: true },
  { id: 'cs-5', name: 'Veg. Salt & Pepper', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Veg.', isVeg: true },
  { id: 'cs-6', name: 'Corn Salt & Pepper', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Veg.', isVeg: true },
  { id: 'cs-7', name: 'Corn Lollypop (6p)', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Veg.', isVeg: true },
  { id: 'cs-8', name: 'Cheese Lollypop (6p)', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Veg.', isVeg: true },
  { id: 'cs-9', name: 'Paneer Sticks (6p)', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Veg.', isVeg: true },
  { id: 'cs-10', name: 'Paneer Fingers (6p)', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Veg.', isVeg: true },
  { id: 'cs-11', name: 'Franch Fry', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Veg.', isVeg: true },
  { id: 'cs-12', name: 'Onion Pakora', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Veg.', isVeg: true },
  { id: 'cs-13', name: 'Veg. Pakora', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Veg.', isVeg: true },
  { id: 'cs-14', name: 'Paneer Pakora', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Veg.', isVeg: true },
  { id: 'cs-15', name: 'Chana Salt & Pipper', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Veg.', isVeg: true },
  // Nonveg
  { id: 'cs-16', name: 'Drums of Heaven (6p)', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false, isSpecial: true },
  { id: 'cs-17', name: 'Drugan Chicken', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false },
  { id: 'cs-18', name: 'Chicken Sal & Pepper', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false },
  { id: 'cs-19', name: 'Chuicken Cutlet (2p)', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false },
  { id: 'cs-20', name: 'Fish Salt & Pepper', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false },
  { id: 'cs-21', name: 'Golden Fried Prawn', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false, isSpecial: true },
  { id: 'cs-22', name: 'Fish Kabiraji', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false, isSpecial: true },
  { id: 'cs-23', name: 'Fish Cutlet', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false },
  { id: 'cs-24', name: 'Chicken Pakora', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false },
  { id: 'cs-25', name: 'Honey Chicken', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false },
  { id: 'cs-26', name: 'Pepsi Chicken', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false },
  { id: 'cs-27', name: 'Chicken \'65\'', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false },
  { id: 'cs-28', name: 'Chicken Lolipop', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false },
  { id: 'cs-29', name: 'Chicken Manchurian', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false },
  { id: 'cs-30', name: 'Fish Fry (Vetki)', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false, isSpecial: true },
  { id: 'cs-31', name: 'Fish Finger (8Pcs)', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false },
  { id: 'cs-32', name: 'Fish \'65\'', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false },
  { id: 'cs-33', name: 'Fish Pakora', category: 'chinese-snacks', categoryName: 'Chinese Snacks', subCategory: 'Nonveg', isVeg: false },

  // ==========================================
  // PAGE 8: SALAD, RAITA & SOUP
  // ==========================================
  // Salad & Raita
  { id: 'sr-1', name: 'Green Salad', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Salad & Raita', isVeg: true },
  { id: 'sr-2', name: 'Onion Salad', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Salad & Raita', isVeg: true },
  { id: 'sr-3', name: 'Cucumber Salad', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Salad & Raita', isVeg: true },
  { id: 'sr-4', name: 'Mix. Veg Raita', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Salad & Raita', isVeg: true },
  { id: 'sr-5', name: 'Onian Raita', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Salad & Raita', isVeg: true },
  { id: 'sr-6', name: 'Rosted Papad', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Salad & Raita', isVeg: true },
  { id: 'sr-7', name: 'Masala Papad', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Salad & Raita', isVeg: true },
  // Veg. Soup
  { id: 'sr-8', name: 'Manchow Soup', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Veg. Soup', isVeg: true },
  { id: 'sr-9', name: 'Sweet Corn Soup', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Veg. Soup', isVeg: true },
  { id: 'sr-10', name: 'Hot & Sour Soup', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Veg. Soup', isVeg: true },
  { id: 'sr-11', name: 'Tomato Soup', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Veg. Soup', isVeg: true },
  { id: 'sr-12', name: 'Lemon Coriander Soup', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Veg. Soup', isVeg: true },
  { id: 'sr-13', name: 'Noodle Soup', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Veg. Soup', isVeg: true },
  { id: 'sr-14', name: 'Mushroom Soup', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Veg. Soup', isVeg: true },
  { id: 'sr-15', name: 'Veg. Clear Soup', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Veg. Soup', isVeg: true },
  // Nonveg Soup
  { id: 'sr-16', name: 'Chicken Manchow Soup', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Nonveg Soup', isVeg: false },
  { id: 'sr-17', name: 'Chicken Sweet Corn Soup', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Nonveg Soup', isVeg: false },
  { id: 'sr-18', name: 'Chicken Hot & Sour Soup', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Nonveg Soup', isVeg: false },
  { id: 'sr-19', name: 'Chicken Lemon Coriander Soup', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Nonveg Soup', isVeg: false },
  { id: 'sr-20', name: 'Chicken Noodle Soup', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Nonveg Soup', isVeg: false },
  { id: 'sr-21', name: 'Chicken Mushroom Soup', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Nonveg Soup', isVeg: false },
  { id: 'sr-22', name: 'Chicken Cleary Soup', category: 'salad-soup', categoryName: 'Salad, Raita & Soup', subCategory: 'Nonveg Soup', isVeg: false },

  // ==========================================
  // PAGE 9: BREAKFAST & ROLL
  // ==========================================
  { id: 'br-1', name: 'Alu Paratha (2P)', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Breakfast', isVeg: true },
  { id: 'br-2', name: 'Paneer Paratha (2P)', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Breakfast', isVeg: true },
  { id: 'br-3', name: 'Sabji Puri (4P)', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Breakfast', isVeg: true },
  { id: 'br-4', name: 'Veg. Sandwich (4p)', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Sandwich & Toast', isVeg: true },
  { id: 'br-5', name: 'Green Sandwitch (4p)', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Sandwich & Toast', isVeg: true },
  { id: 'br-6', name: 'Butter Toast (4p)', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Sandwich & Toast', isVeg: true },
  { id: 'br-7', name: 'Jam Toast (4p)', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Sandwich & Toast', isVeg: true },
  { id: 'br-8', name: 'Veg. Roll (1p)', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Rolls', isVeg: true },
  { id: 'br-9', name: 'Paneer Roll (1p)', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Rolls', isVeg: true },
  // Non Veg.
  { id: 'br-10', name: 'Chicken Sandwitch (4p)', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Non Veg. Breakfast', isVeg: false },
  { id: 'br-11', name: 'Egg Sandwitch (4p)', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Non Veg. Breakfast', isVeg: false },
  { id: 'br-12', name: 'Egg Toast (4p)', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Non Veg. Breakfast', isVeg: false },
  { id: 'br-13', name: 'Egg Boil (2p)', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Non Veg. Breakfast', isVeg: false },
  { id: 'br-14', name: 'Egg Pouch (2p)', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Non Veg. Breakfast', isVeg: false },
  { id: 'br-15', name: 'Egg Roll (1p)', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Rolls', isVeg: false },
  { id: 'br-16', name: 'Egg Chicken Roll (1p)', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Rolls', isVeg: false, isSpecial: true },
  { id: 'br-17', name: 'Double Egg Roll', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Rolls', isVeg: false },
  { id: 'br-18', name: 'Moglai Paratha', category: 'breakfast-rolls', categoryName: 'Breakfast & Roll', subCategory: 'Rolls', isVeg: false, isSpecial: true },

  // ==========================================
  // PAGE 10: LUNCH, THALI & FISH EGG
  // ==========================================
  { id: 'th-1', name: 'Veg. Thali', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Thali', isVeg: true },
  { id: 'th-2', name: 'Egg Thali', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Thali', isVeg: false },
  { id: 'th-3', name: 'Fish Thali', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Thali', isVeg: false, isSpecial: true },
  { id: 'th-4', name: 'Chicken Thali', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Thali', isVeg: false },
  { id: 'th-5', name: 'Mutton Thali', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Thali', isVeg: false, isSpecial: true },
  { id: 'th-6', name: 'Charapona Thali', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Thali', isVeg: false },
  { id: 'th-7', name: 'Plain Rice', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Rice', isVeg: true },
  { id: 'th-8', name: 'Steam Rice', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Rice', isVeg: true },
  { id: 'th-9', name: 'Jeera Rice', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Rice', isVeg: true },
  { id: 'th-10', name: 'Postu Barha', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Bengal Delicacy', isVeg: true, isSpecial: true },
  { id: 'th-11', name: 'Omlet (2p)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Egg', isVeg: false },
  { id: 'th-12', name: 'Egg Bhujia (2p)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Egg', isVeg: false },
  { id: 'th-13', name: 'Egg Curry (2p)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Egg', isVeg: false },
  { id: 'th-14', name: 'Morola (2p)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Fish Catch', isVeg: false },
  { id: 'th-15', name: 'Rui Fish Curry (2p)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Fish Catch', isVeg: false },
  { id: 'th-16', name: 'Katla Fish Curry (2p)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Fish Catch', isVeg: false },
  { id: 'th-17', name: 'Charapona Curry (2p)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Fish Catch', isVeg: false },
  { id: 'th-18', name: 'Vektifish Cury (2p)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Fish Catch', isVeg: false },
  { id: 'th-19', name: 'Rui Postu (2p)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Fish Catch', isVeg: false, isSpecial: true },
  { id: 'th-20', name: 'Rui Masala (2p)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Fish Catch', isVeg: false },
  { id: 'th-21', name: 'Vetki Masala (2p)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Fish Catch', isVeg: false },
  { id: 'th-22', name: 'Pomfret Masala (1p)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Fish Catch', isVeg: false },
  { id: 'th-23', name: 'Prawn Masala (1plate)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Prawn', isVeg: false },
  { id: 'th-24', name: 'Pron Malaicurry (1plate)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Prawn', isVeg: false, isSpecial: true },
  { id: 'th-25', name: 'Dahi Hilsa (1p)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Hilsa Royal', isVeg: false, isSpecial: true },
  { id: 'th-26', name: 'Sarse Hilsa (1p)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Hilsa Royal', isVeg: false, isSpecial: true },
  { id: 'th-27', name: 'Parse Bata (1p)', category: 'thali-fish', categoryName: 'Lunch, Thali & Fish Egg', subCategory: 'Fish Catch', isVeg: false },

  // ==========================================
  // PAGE 11: ASSORTED BREAD
  // ==========================================
  { id: 'ab-1', name: 'Roti', category: 'breads-roti', categoryName: 'Assorted Bread', subCategory: 'Roti', isVeg: true },
  { id: 'ab-2', name: 'Rumali Roti', category: 'breads-roti', categoryName: 'Assorted Bread', subCategory: 'Roti', isVeg: true },
  { id: 'ab-3', name: 'Butter Rumali', category: 'breads-roti', categoryName: 'Assorted Bread', subCategory: 'Roti', isVeg: true },
  { id: 'ab-4', name: 'Tandoori Roti', category: 'breads-roti', categoryName: 'Assorted Bread', subCategory: 'Tandoori Roti', isVeg: true },
  { id: 'ab-5', name: 'Butter Tandoori Roti', category: 'breads-roti', categoryName: 'Assorted Bread', subCategory: 'Tandoori Roti', isVeg: true },
  { id: 'ab-6', name: 'Ginger Chilli Tandoori', category: 'breads-roti', categoryName: 'Assorted Bread', subCategory: 'Tandoori Roti', isVeg: true },
  { id: 'ab-7', name: 'Plain Naan', category: 'breads-roti', categoryName: 'Assorted Bread', subCategory: 'Naan', isVeg: true },
  { id: 'ab-8', name: 'Butter Naan', category: 'breads-roti', categoryName: 'Assorted Bread', subCategory: 'Naan', isVeg: true },
  { id: 'ab-9', name: 'Garlic Naan', category: 'breads-roti', categoryName: 'Assorted Bread', subCategory: 'Naan', isVeg: true },
  { id: 'ab-10', name: 'Cheese Garlic Naan', category: 'breads-roti', categoryName: 'Assorted Bread', subCategory: 'Naan', isVeg: true, isSpecial: true },
  { id: 'ab-11', name: 'Kashmiri Naan', category: 'breads-roti', categoryName: 'Assorted Bread', subCategory: 'Naan', isVeg: true },
  { id: 'ab-12', name: 'Kulcha', category: 'breads-roti', categoryName: 'Assorted Bread', subCategory: 'Kulcha', isVeg: true },
  { id: 'ab-13', name: 'Masala Kulcha', category: 'breads-roti', categoryName: 'Assorted Bread', subCategory: 'Kulcha', isVeg: true },
  { id: 'ab-14', name: 'Kashmiri Kulcha', category: 'breads-roti', categoryName: 'Assorted Bread', subCategory: 'Kulcha', isVeg: true },
  { id: 'ab-15', name: 'Lachha Parota', category: 'breads-roti', categoryName: 'Assorted Bread', subCategory: 'Parota', isVeg: true },

  // ==========================================
  // PAGE 12: BIRIYANI (BIRIYANI & RICE)
  // ==========================================
  { id: 'by-1', name: 'Veg. Biriyani', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Biriyani', isVeg: true },
  { id: 'by-2', name: 'Paneer Biriyani', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Biriyani', isVeg: true },
  { id: 'by-3', name: 'Egg Biriyani', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Biriyani', isVeg: false },
  { id: 'by-4', name: 'Chicken Biriyani', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Biriyani', isVeg: false, isSpecial: true },
  { id: 'by-5', name: 'Chicken Hydrabadi Biriyani', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Biriyani', isVeg: false },
  { id: 'by-6', name: 'Mutton Biriyani', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Biriyani', isVeg: false, isSpecial: true },
  { id: 'by-7', name: 'Gram Bangla Sp. Biriyani', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Biriyani', isVeg: false, isSpecial: true },
  { id: 'by-8', name: 'Veg. Fried Rice', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Fried Rice', isVeg: true },
  { id: 'by-9', name: 'Corn Fried Rice', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Fried Rice', isVeg: true },
  { id: 'by-10', name: 'Egg Fried Rice', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Fried Rice', isVeg: false },
  { id: 'by-11', name: 'Egg Chicken Fried Rice', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Fried Rice', isVeg: false },
  { id: 'by-12', name: 'Chicken Fried Rice', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Fried Rice', isVeg: false },
  { id: 'by-13', name: 'Mix. Fried Rice', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Fried Rice', isVeg: false },
  { id: 'by-14', name: 'Sezwan Mix. Fried Rice', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Fried Rice', isVeg: false },
  { id: 'by-15', name: 'Veg. Polao', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Polao', isVeg: true },
  { id: 'by-16', name: 'Kashmiri Polao', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Polao', isVeg: true },
  { id: 'by-17', name: 'Peas Polao', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Polao', isVeg: true },
  { id: 'by-18', name: 'Paneer Polao', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Polao', isVeg: true },
  { id: 'by-19', name: 'Badsahi Polao', category: 'biryani-rice', categoryName: 'Biriyani', subCategory: 'Polao', isVeg: true, isSpecial: true }
];

export const INITIAL_GALLERY: GalleryItem[] = [];

export const INITIAL_NEARBY: NearbyAttraction[] = [
  {
    id: 'mukutmanipur',
    title: 'Mukutmanipur Dam & Lake',
    distance: '32 km (45 mins drive)',
    category: 'Dams & Lakes',
    desc: "India's second largest earthen dam located at the confluence of Kangsabati and Kumari rivers with scenic boat rides and deer parks.",
    image: 'https://i.pinimg.com/1200x/5f/31/19/5f31199e7a14991eb47415aac9352c4e.jpg',
    images: [
      'https://i.pinimg.com/1200x/5f/31/19/5f31199e7a14991eb47415aac9352c4e.jpg',
      'https://i.pinimg.com/736x/1f/87/d9/1f87d92717a1eff772e9cc9f7dfb88d4.jpg',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/dd/b5/f9/mukutmanipur-dam.jpg?w=1200&h=1200&s=1'
    ]
  },
  {
    id: 'bishnupur',
    title: 'Bishnupur Terracotta Temples',
    distance: '38 km (50 mins drive)',
    category: 'Temples & Architecture',
    desc: '17th-century Malla kingdom terracotta architecture, Rasmancha, Jor Bangla temple, and Baluchari silk weaving centers.',
    image: 'https://i.pinimg.com/736x/b9/b3/1a/b9b31af62c88b58384f773b466831183.jpg',
    images: [
      'https://i.pinimg.com/736x/b9/b3/1a/b9b31af62c88b58384f773b466831183.jpg',
      'https://i.pinimg.com/1200x/35/79/57/357957d1f7a4dd486408e85339c3a428.jpg',
      'https://i.pinimg.com/1200x/61/ce/c2/61cec2eb05687d92e84eac2d2d766a18.jpg'
    ]
  },
  {
    id: 'susunia',
    title: 'Susunia Hills',
    distance: '24 km (35 mins drive)',
    category: 'Hills & Trekking',
    desc: 'Archaeological rock inscriptions of King Chandravarman, medicinal streams, stone carving artisans, and gentle trekking trails.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSypGrkMuH8R96M5tGf4PPJUyID_pKv-Vs1QWxbP6zVww&s=10',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSypGrkMuH8R96M5tGf4PPJUyID_pKv-Vs1QWxbP6zVww&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKCXOm1-VqaEja8mZhYwLjUJtRrXqazfVsmXwxBOZcCAU6XAigcT0qseU&s=10',
      'https://susuniahill.com/wp-content/uploads/2026/04/susunia_hill_winter.jpg'
    ]
  },
  {
    id: 'biharinath',
    title: 'Biharinath Hill',
    distance: '45 km (1 hr drive)',
    category: 'Hills & Trekking',
    desc: 'Highest hill of Bankura (451m) amidst dense Sal and Palash forests with an ancient Shiva sanctuary.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8mts1KeMBaTk0ZR5kd4JiP3ICwR_A-LoDZs0FbueCCQ&s=10',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8mts1KeMBaTk0ZR5kd4JiP3ICwR_A-LoDZs0FbueCCQ&s=10',
      'https://trekupindia.com/_next/image?url=https%3A%2F%2Fcdn.trekupindia.com%2Fmedia%2F1769169659303-biharinath-hill-trek.jpg&w=1920&q=75',
      'https://bankuratourism.com/wp-content/uploads/2023/07/Biharinath-Hill10.jpg.webp'
    ]
  },
  {
    id: 'panchmura',
    title: 'Panchmura Terracotta Village',
    distance: '28 km (40 mins drive)',
    category: 'Arts & Handicrafts',
    desc: 'World-renowned artisan village where traditional terracotta Bankura horses, pottery, and clay craft are made.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGPPanm7YYt6ycTecKp3nnkyZwMtHjfomLXiMSiLpw3Q&s=10',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGPPanm7YYt6ycTecKp3nnkyZwMtHjfomLXiMSiLpw3Q&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9WBzjmJVTVblvgVHkbqXrfK1xviwiALjpyhezMZYnkg&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXXbCc9LFOKFJBFmNW0NjAEnpe-T9uDyfZe7bXRC8IFw&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_xpyxVCfHMTPyK09TxAr5MxSFLo8OsewI4UNRIac9xw&s=10'
    ]
  },
  {
    id: 'joypur',
    title: 'Joypur Sal Forest',
    distance: '30 km (40 mins drive)',
    category: 'Forest & Eco-Tourism',
    desc: 'Dense canopy of Sal trees with spotted deers, migratory birds, jungle watchtowers, and serene trails.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiREeCN9DKYNfUhFNRF4YHYHK6zB5Q5jweH3lRLtL6hw&s=10',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiREeCN9DKYNfUhFNRF4YHYHK6zB5Q5jweH3lRLtL6hw&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtKxLWc11tF8cENYe7iEKcqptryIWlRsGl0BikdDw3rA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEJHENKMeEKZdk11MFAFniQ2iWv31q37OvU6ewGn5o9A&s=10'
    ]
  }
];
