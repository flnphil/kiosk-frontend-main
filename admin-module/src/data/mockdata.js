// export type UserType = 'guest' | 'normal';
// export type PaymentStatus = 'free' | 'paid';

// export interface Attendee {
//   id: string;
//   name: string;
//   email: string;
//   userType: UserType;
//   paymentStatus: PaymentStatus;
//   registeredAt: string;
// }

// export interface Event {
//   id: string;
//   title: string;
//   description: string;
//   date: string;
//   time: string;
//   location: string;
//   imageUrl: string;
//   isFree: boolean;
//   price?: number;  // Added price field (optional)
//   attendees: Attendee[];
//   isDeleted?: boolean; // Added isDeleted field as optional
// }

export const events = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description:
      "Join us for a day of insightful tech talks and networking opportunities with industry leaders.",
    date: "2025-06-15",
    time: "09:00 - 17:00",
    location: "Convention Center, San Francisco",
    imageUrl: "/placeholder.svg",
    isFree: false,
    price: 99.99,
    attendees: [
      {
        id: "a1",
        name: "John Doe",
        email: "john@example.com",
        userType: "normal",
        paymentStatus: "paid",
        registeredAt: "2025-05-10T14:30:00Z",
      },
      {
        id: "a2",
        name: "Jane Smith",
        email: "jane@example.com",
        userType: "normal",
        paymentStatus: "paid",
        registeredAt: "2025-05-12T10:15:00Z",
      },
      {
        id: "a3",
        name: "Mike Johnson",
        email: "mike@example.com",
        userType: "guest",
        paymentStatus: "paid",
        registeredAt: "2025-05-14T09:20:00Z",
      },
    ],
  },
  {
    id: "3",
    title: "Design Workshop",
    description:
      "Learn the latest UI/UX design trends and practical skills from experienced designers.",
    date: "2025-08-05",
    time: "13:00 - 16:30",
    location: "Creative Studios, Austin",
    imageUrl: "/placeholder.svg",
    isFree: false,
    price: 49.99,
    attendees: [
      {
        id: "a6",
        name: "Emma Thompson",
        email: "emma@example.com",
        userType: "normal",
        paymentStatus: "paid",
        registeredAt: "2025-07-12T08:20:00Z",
      },
      {
        id: "a7",
        name: "David Lee",
        email: "david@example.com",
        userType: "normal",
        paymentStatus: "paid",
        registeredAt: "2025-07-15T14:10:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "Community Hackathon",
    description:
      "A weekend of coding, collaboration, and creating innovative solutions to real-world problems.",
    date: "2025-07-22",
    time: "10:00 - 18:00",
    location: "Innovation Hub, Seattle",
    imageUrl: "/placeholder.svg",
    isFree: true,
    attendees: [
      {
        id: "a1",
        name: "John Doe",
        email: "john@example.com",
        userType: "normal",
        paymentStatus: "free",
        registeredAt: "2025-06-25T11:45:00Z",
      },
      {
        id: "a4",
        name: "Sarah Williams",
        email: "sarah@example.com",
        userType: "normal",
        paymentStatus: "free",
        registeredAt: "2025-06-25T11:45:00Z",
      },
      {
        id: "a5",
        name: "Alex Chen",
        email: "alex@example.com",
        userType: "guest",
        paymentStatus: "free",
        registeredAt: "2025-06-28T16:30:00Z",
      },
    ],
  },
  {
    id: "4",
    title: "Networking Mixer",
    description:
      "Connect with professionals from various industries in a relaxed and friendly environment.",
    date: "2025-09-10",
    time: "18:00 - 21:00",
    location: "Urban Lounge, Chicago",
    imageUrl: "/placeholder.svg",
    isFree: true,
    attendees: [
      {
        id: "a8",
        name: "Lisa Brown",
        email: "lisa@example.com",
        userType: "guest",
        paymentStatus: "free",
        registeredAt: "2025-08-20T17:45:00Z",
      },
      {
        id: "a9",
        name: "Robert Garcia",
        email: "robert@example.com",
        userType: "normal",
        paymentStatus: "free",
        registeredAt: "2025-08-22T09:30:00Z",
      },
      {
        id: "a10",
        name: "Michelle Kim",
        email: "michelle@example.com",
        userType: "normal",
        paymentStatus: "free",
        registeredAt: "2025-08-25T11:15:00Z",
      },
    ],
  },
];
