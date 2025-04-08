import {
  users, User, InsertUser,
  studySpaces, StudySpace, InsertStudySpace,
  amenities, Amenity, InsertAmenity,
  studySpaceAmenities, StudySpaceAmenity, InsertStudySpaceAmenity,
  bookings, Booking, InsertBooking,
  reviews, Review, InsertReview,
  StudySpaceWithAmenities
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Study Space methods
  getAllStudySpaces(): Promise<StudySpaceWithAmenities[]>;
  getStudySpaceById(id: number): Promise<StudySpaceWithAmenities | undefined>;
  searchStudySpaces(query: string, filters: string[]): Promise<StudySpaceWithAmenities[]>;
  createStudySpace(studySpace: InsertStudySpace): Promise<StudySpace>;
  updateStudySpaceAvailability(id: number, availableSeats: number): Promise<StudySpace | undefined>;

  // Amenity methods
  getAllAmenities(): Promise<Amenity[]>;
  createAmenity(amenity: InsertAmenity): Promise<Amenity>;
  
  // Study Space Amenity methods
  addAmenityToStudySpace(studySpaceAmenity: InsertStudySpaceAmenity): Promise<StudySpaceAmenity>;
  getAmenitiesByStudySpaceId(studySpaceId: number): Promise<Amenity[]>;

  // Booking methods
  getAllBookings(): Promise<Booking[]>;
  getBookingsByUserId(userId: number): Promise<Booking[]>;
  getBookingsByStudySpaceId(studySpaceId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  
  // Review methods
  getAllReviews(): Promise<Review[]>;
  getReviewsByStudySpaceId(studySpaceId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  getAverageRatingByStudySpaceId(studySpaceId: number): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private studySpaces: Map<number, StudySpace>;
  private amenities: Map<number, Amenity>;
  private studySpaceAmenities: StudySpaceAmenity[];
  private bookings: Map<number, Booking>;
  private reviews: Map<number, Review>;

  private currentUserId: number;
  private currentStudySpaceId: number;
  private currentAmenityId: number;
  private currentBookingId: number;
  private currentReviewId: number;

  constructor() {
    this.users = new Map();
    this.studySpaces = new Map();
    this.amenities = new Map();
    this.studySpaceAmenities = [];
    this.bookings = new Map();
    this.reviews = new Map();

    this.currentUserId = 1;
    this.currentStudySpaceId = 1;
    this.currentAmenityId = 1;
    this.currentBookingId = 1;
    this.currentReviewId = 1;

    // Initialize with some default amenities and study spaces
    this.initialize().catch(err => {
      console.error("Error initializing storage:", err);
    });
  }

  private async initialize() {
    // First initialize amenities
    await this.initializeAmenities();
    // Then initialize study spaces that depend on the amenities
    await this.initializeStudySpaces();
  }

  private async initializeAmenities() {
    const defaultAmenities: InsertAmenity[] = [
      { name: "Free Wi-Fi", icon: "wifi" },
      { name: "Power Outlets", icon: "plug" },
      { name: "Café", icon: "coffee" },
      { name: "Quiet Zone", icon: "volume-mute" },
      { name: "Group-friendly", icon: "users" },
      { name: "Outdoor", icon: "tree" },
      { name: "Tech", icon: "laptop" },
      { name: "Historical", icon: "history" }
    ];

    for (const amenity of defaultAmenities) {
      await this.createAmenity(amenity);
    }
  }

  private async initializeStudySpaces() {
    const defaultStudySpaces: InsertStudySpace[] = [
      {
        name: "Central Library",
        address: "123 University Ave, Indore",
        description: "A large library with individual study cubicles and group tables. Perfect for long study sessions.",
        imageUrl: "/images/study-spaces/library1.jpg",
        totalSeats: 120,
        availableSeats: 76,
        openingHours: "8:00 AM - 10:00 PM",
        latitude: "22.7196",
        longitude: "75.8577"
      },
      {
        name: "The Bookworm Café",
        address: "45 Park Street, Indore",
        description: "A cozy café with a great selection of books and comfortable seating. Great for casual study sessions.",
        imageUrl: "/images/study-spaces/cafe1.jpg",
        totalSeats: 30,
        availableSeats: 8,
        openingHours: "7:30 AM - 9:00 PM",
        latitude: "22.7256",
        longitude: "75.8818"
      },
      {
        name: "Startup Hub Co-working",
        address: "78 Tech Park, Indore",
        description: "Modern co-working space with high-speed internet and 24/7 access. Ideal for tech enthusiasts.",
        imageUrl: "/images/study-spaces/coworking1.jpg",
        totalSeats: 45,
        availableSeats: 0,
        openingHours: "24/7",
        latitude: "22.7522",
        longitude: "75.8932"
      },
      {
        name: "City Museum Reading Room",
        address: "30 Cultural District, Indore",
        description: "A quiet reading room within the historic city museum. Surrounded by art and history.",
        imageUrl: "/images/study-spaces/library2.jpg",
        totalSeats: 35,
        availableSeats: 24,
        openingHours: "10:00 AM - 6:00 PM",
        latitude: "22.7099",
        longitude: "75.8563"
      },
      {
        name: "TechNest Collaborative Space",
        address: "55 Innovation Ave, Indore",
        description: "Tech-focused collaborative environment with smart boards and presentation facilities.",
        imageUrl: "/images/study-spaces/coworking2.jpg",
        totalSeats: 40,
        availableSeats: 18,
        openingHours: "8:00 AM - 10:00 PM",
        latitude: "22.7404",
        longitude: "75.8839"
      },
      {
        name: "Green Garden Study Center",
        address: "12 Botanical Garden Road, Indore",
        description: "Study amidst nature in this beautiful garden setting with outdoor and indoor seating options.",
        imageUrl: "/images/study-spaces/garden1.jpg",
        totalSeats: 25,
        availableSeats: 5,
        openingHours: "9:00 AM - 6:00 PM",
        latitude: "22.7618",
        longitude: "75.8877"
      }
    ];

    const amenityMap = {
      "Central Library": [1, 2, 4], // Wi-Fi, Power Outlets, Quiet Zone
      "The Bookworm Café": [1, 3, 5], // Wi-Fi, Café, Group-friendly
      "Startup Hub Co-working": [1, 2, 3], // Wi-Fi, Power Outlets, Café
      "City Museum Reading Room": [1, 4, 8], // Wi-Fi, Quiet Zone, Historical
      "TechNest Collaborative Space": [1, 5, 7], // Wi-Fi, Group-friendly, Tech
      "Green Garden Study Center": [1, 3, 6] // Wi-Fi, Café, Outdoor
    };

    for (const space of defaultStudySpaces) {
      // Wait for the study space to be created
      const createdSpace = await this.createStudySpace(space);
      
      // Add amenities to the study space
      const amenityIds = amenityMap[space.name as keyof typeof amenityMap] || [];
      for (const amenityId of amenityIds) {
        await this.addAmenityToStudySpace({
          studySpaceId: createdSpace.id,
          amenityId
        });
      }

      // Add some sample reviews
      const ratings = [4, 5, 3, 4, 5];
      for (let i = 0; i < ratings.length; i++) {
        await this.createReview({
          userId: null,
          studySpaceId: createdSpace.id,
          rating: ratings[i],
          comment: `This is a sample review ${i + 1} for ${space.name}.`
        });
      }
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Study Space methods
  async getAllStudySpaces(): Promise<StudySpaceWithAmenities[]> {
    const studySpacesArray = Array.from(this.studySpaces.values());
    return Promise.all(studySpacesArray.map(async space => {
      const amenities = await this.getAmenitiesByStudySpaceId(space.id);
      const averageRating = await this.getAverageRatingByStudySpaceId(space.id);
      const reviews = await this.getReviewsByStudySpaceId(space.id);
      
      return {
        ...space,
        amenities,
        averageRating,
        totalReviews: reviews.length
      };
    }));
  }

  async getStudySpaceById(id: number): Promise<StudySpaceWithAmenities | undefined> {
    const studySpace = this.studySpaces.get(id);
    if (!studySpace) return undefined;

    const amenities = await this.getAmenitiesByStudySpaceId(id);
    const averageRating = await this.getAverageRatingByStudySpaceId(id);
    const reviews = await this.getReviewsByStudySpaceId(id);

    return {
      ...studySpace,
      amenities,
      averageRating,
      totalReviews: reviews.length
    };
  }

  async searchStudySpaces(query: string, filters: string[]): Promise<StudySpaceWithAmenities[]> {
    let studySpacesArray = Array.from(this.studySpaces.values());
    
    // Filter by query (name or address)
    if (query) {
      const lowerQuery = query.toLowerCase();
      studySpacesArray = studySpacesArray.filter(space => 
        space.name.toLowerCase().includes(lowerQuery) || 
        space.address.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Get all spaces with their amenities
    const spacesWithAmenities = await Promise.all(studySpacesArray.map(async space => {
      const amenities = await this.getAmenitiesByStudySpaceId(space.id);
      const averageRating = await this.getAverageRatingByStudySpaceId(space.id);
      const reviews = await this.getReviewsByStudySpaceId(space.id);
      
      return {
        ...space,
        amenities,
        averageRating,
        totalReviews: reviews.length
      };
    }));
    
    // Filter by amenities if specified
    if (filters && filters.length > 0) {
      return spacesWithAmenities.filter(space => 
        filters.every(filter => 
          space.amenities.some(amenity => 
            amenity.name.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
    }
    
    return spacesWithAmenities;
  }

  async createStudySpace(insertStudySpace: InsertStudySpace): Promise<StudySpace> {
    const id = this.currentStudySpaceId++;
    // Ensure all required fields are present
    const studySpace: StudySpace = { 
      ...insertStudySpace, 
      id, 
      createdAt: new Date(),
      openingHours: insertStudySpace.openingHours || null,
      latitude: insertStudySpace.latitude || null,
      longitude: insertStudySpace.longitude || null
    };
    this.studySpaces.set(id, studySpace);
    return studySpace;
  }

  async updateStudySpaceAvailability(id: number, availableSeats: number): Promise<StudySpace | undefined> {
    const studySpace = this.studySpaces.get(id);
    if (!studySpace) return undefined;

    const updatedStudySpace = { 
      ...studySpace, 
      availableSeats 
    };
    this.studySpaces.set(id, updatedStudySpace);
    return updatedStudySpace;
  }

  // Amenity methods
  async getAllAmenities(): Promise<Amenity[]> {
    return Array.from(this.amenities.values());
  }

  async createAmenity(insertAmenity: InsertAmenity): Promise<Amenity> {
    const id = this.currentAmenityId++;
    const amenity: Amenity = { ...insertAmenity, id };
    this.amenities.set(id, amenity);
    return amenity;
  }

  // Study Space Amenity methods
  async addAmenityToStudySpace(insertStudySpaceAmenity: InsertStudySpaceAmenity): Promise<StudySpaceAmenity> {
    const studySpaceAmenity: StudySpaceAmenity = { ...insertStudySpaceAmenity };
    this.studySpaceAmenities.push(studySpaceAmenity);
    return studySpaceAmenity;
  }

  async getAmenitiesByStudySpaceId(studySpaceId: number): Promise<Amenity[]> {
    const amenityIds = this.studySpaceAmenities
      .filter(sa => sa.studySpaceId === studySpaceId)
      .map(sa => sa.amenityId);
    
    return Array.from(this.amenities.values())
      .filter(amenity => amenityIds.includes(amenity.id));
  }

  // Booking methods
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingsByUserId(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values())
      .filter(booking => booking.userId === userId);
  }

  async getBookingsByStudySpaceId(studySpaceId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values())
      .filter(booking => booking.studySpaceId === studySpaceId);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      createdAt: new Date(),
      userId: insertBooking.userId || null,
      notes: insertBooking.notes || null
    };
    this.bookings.set(id, booking);
    
    // Update available seats for the study space
    const studySpace = await this.getStudySpaceById(insertBooking.studySpaceId);
    if (studySpace) {
      const newAvailableSeats = Math.max(0, studySpace.availableSeats - insertBooking.numberOfSeats);
      await this.updateStudySpaceAvailability(studySpace.id, newAvailableSeats);
    }
    
    return booking;
  }

  // Review methods
  async getAllReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async getReviewsByStudySpaceId(studySpaceId: number): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.studySpaceId === studySpaceId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = { 
      ...insertReview, 
      id, 
      createdAt: new Date(),
      userId: insertReview.userId || null,
      comment: insertReview.comment || null
    };
    this.reviews.set(id, review);
    return review;
  }

  async getAverageRatingByStudySpaceId(studySpaceId: number): Promise<number> {
    const reviews = await this.getReviewsByStudySpaceId(studySpaceId);
    if (reviews.length === 0) return 0;
    
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
  }
}

export const storage = new MemStorage();
