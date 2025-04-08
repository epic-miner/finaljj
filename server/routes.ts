import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertReviewSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/study-spaces", async (req: Request, res: Response) => {
    try {
      const query = req.query.query as string || "";
      const filters = req.query.filters ? (req.query.filters as string).split(",") : [];
      
      const studySpaces = await storage.searchStudySpaces(query, filters);
      res.json(studySpaces);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch study spaces" });
    }
  });

  app.get("/api/study-spaces/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const studySpace = await storage.getStudySpaceById(id);
      
      if (!studySpace) {
        return res.status(404).json({ message: "Study space not found" });
      }
      
      res.json(studySpace);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch study space details" });
    }
  });

  app.get("/api/amenities", async (_req: Request, res: Response) => {
    try {
      const amenities = await storage.getAllAmenities();
      res.json(amenities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch amenities" });
    }
  });

  app.post("/api/bookings", async (req: Request, res: Response) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      
      // Check if study space exists and has enough seats available
      const studySpace = await storage.getStudySpaceById(bookingData.studySpaceId);
      if (!studySpace) {
        return res.status(404).json({ message: "Study space not found" });
      }
      
      if (studySpace.availableSeats < bookingData.numberOfSeats) {
        return res.status(400).json({ 
          message: "Not enough seats available for booking" 
        });
      }
      
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.get("/api/bookings", async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const studySpaceId = req.query.studySpaceId ? parseInt(req.query.studySpaceId as string) : undefined;
      
      let bookings;
      if (userId) {
        bookings = await storage.getBookingsByUserId(userId);
      } else if (studySpaceId) {
        bookings = await storage.getBookingsByStudySpaceId(studySpaceId);
      } else {
        bookings = await storage.getAllBookings();
      }
      
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.post("/api/reviews", async (req: Request, res: Response) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      
      // Check if study space exists
      const studySpace = await storage.getStudySpaceById(reviewData.studySpaceId);
      if (!studySpace) {
        return res.status(404).json({ message: "Study space not found" });
      }
      
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  app.get("/api/reviews", async (req: Request, res: Response) => {
    try {
      const studySpaceId = req.query.studySpaceId ? parseInt(req.query.studySpaceId as string) : undefined;
      
      let reviews;
      if (studySpaceId) {
        reviews = await storage.getReviewsByStudySpaceId(studySpaceId);
      } else {
        reviews = await storage.getAllReviews();
      }
      
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  // Admin endpoints
  app.patch("/api/admin/study-spaces/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { availableSeats } = req.body;
      
      if (availableSeats === undefined || isNaN(availableSeats) || availableSeats < 0) {
        return res.status(400).json({ message: "Valid availableSeats value is required" });
      }
      
      const studySpace = await storage.getStudySpaceById(id);
      if (!studySpace) {
        return res.status(404).json({ message: "Study space not found" });
      }
      
      if (availableSeats > studySpace.totalSeats) {
        return res.status(400).json({ 
          message: "Available seats cannot exceed total seats" 
        });
      }
      
      const updatedSpace = await storage.updateStudySpaceAvailability(id, availableSeats);
      res.json(updatedSpace);
    } catch (error) {
      res.status(500).json({ message: "Failed to update study space availability" });
    }
  });
  
  // Create new study space endpoint
  app.post("/api/admin/study-spaces", async (req: Request, res: Response) => {
    try {
      const { name, address, description, totalSeats, availableSeats, imageUrl, openingHours } = req.body;
      
      // Validate required fields
      if (!name || !address || !totalSeats) {
        return res.status(400).json({ message: "Name, address, and totalSeats are required" });
      }
      
      // Validate seating information
      if (isNaN(totalSeats) || totalSeats <= 0) {
        return res.status(400).json({ message: "Total seats must be a positive number" });
      }
      
      if (isNaN(availableSeats) || availableSeats < 0 || availableSeats > totalSeats) {
        return res.status(400).json({ 
          message: "Available seats must be between 0 and total seats" 
        });
      }
      
      // Create the study space
      const newStudySpace = await storage.createStudySpace({
        name,
        address,
        description: description || "",
        totalSeats,
        availableSeats: availableSeats || totalSeats,
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3",
        openingHours: openingHours || "9:00 AM - 9:00 PM"
      });
      
      res.status(201).json(newStudySpace);
    } catch (error) {
      res.status(500).json({ message: "Failed to create study space" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
