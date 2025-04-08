import { pgTable, text, serial, integer, boolean, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
});

// Study spaces table
export const studySpaces = pgTable("study_spaces", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  totalSeats: integer("total_seats").notNull(),
  availableSeats: integer("available_seats").notNull(),
  openingHours: text("opening_hours").default("9:00 AM - 9:00 PM"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertStudySpaceSchema = createInsertSchema(studySpaces).pick({
  name: true,
  address: true,
  description: true,
  imageUrl: true,
  totalSeats: true,
  availableSeats: true,
  openingHours: true,
  latitude: true,
  longitude: true,
});

// Amenities table
export const amenities = pgTable("amenities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
});

export const insertAmenitySchema = createInsertSchema(amenities).pick({
  name: true,
  icon: true,
});

// Junction table for study spaces and amenities
export const studySpaceAmenities = pgTable("study_space_amenities", {
  studySpaceId: integer("study_space_id").notNull().references(() => studySpaces.id),
  amenityId: integer("amenity_id").notNull().references(() => amenities.id),
}, (t) => ({
  pk: primaryKey(t.studySpaceId, t.amenityId),
}));

export const insertStudySpaceAmenitySchema = createInsertSchema(studySpaceAmenities);

// Bookings table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  studySpaceId: integer("study_space_id").notNull().references(() => studySpaces.id),
  date: text("date").notNull(),
  timeSlot: text("time_slot").notNull(),
  numberOfSeats: integer("number_of_seats").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).pick({
  userId: true,
  studySpaceId: true,
  date: true,
  timeSlot: true,
  numberOfSeats: true,
  notes: true,
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  studySpaceId: integer("study_space_id").notNull().references(() => studySpaces.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  userId: true,
  studySpaceId: true,
  rating: true,
  comment: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type StudySpace = typeof studySpaces.$inferSelect;
export type InsertStudySpace = z.infer<typeof insertStudySpaceSchema>;

export type Amenity = typeof amenities.$inferSelect;
export type InsertAmenity = z.infer<typeof insertAmenitySchema>;

export type StudySpaceAmenity = typeof studySpaceAmenities.$inferSelect;
export type InsertStudySpaceAmenity = z.infer<typeof insertStudySpaceAmenitySchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

// Extended type with amenities array
export type StudySpaceWithAmenities = StudySpace & {
  amenities: Amenity[];
  averageRating?: number;
  totalReviews?: number;
};
