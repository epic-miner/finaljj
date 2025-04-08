import { StudySpaceWithAmenities, Review, Booking, User } from "@shared/schema";

// Define additional types needed for frontend components here
export interface SearchFilters {
  query?: string;
  date?: string;
  time?: string;
  amenities?: string[];
}

export interface BookingFormData {
  studySpaceId: number;
  date: string;
  timeSlot: string;
  numberOfSeats: number;
  notes?: string;
}

export interface ReviewFormData {
  studySpaceId: number;
  rating: number;
  comment?: string;
}

export interface UserProfile extends User {
  bookings?: Booking[];
  reviews?: Review[];
}

export interface StudySpaceDetails extends StudySpaceWithAmenities {
  reviews?: Review[];
  bookings?: Booking[];
}
