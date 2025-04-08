import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertStudySpaceSchema, InsertStudySpace } from "@shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Extend the insertStudySpaceSchema with validation rules
const formSchema = insertStudySpaceSchema.extend({
  name: z.string().min(3, "Name must be at least 3 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  totalSeats: z.coerce.number().min(1, "Must have at least 1 seat"),
  availableSeats: z.coerce.number().optional(),
  imageUrl: z.string().url("Please enter a valid URL").min(1, "Image URL is required"),
  openingHours: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddStudySpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddStudySpaceModal({ isOpen, onClose }: AddStudySpaceModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      description: "",
      totalSeats: 50,
      availableSeats: 50,
      imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      openingHours: "9:00 AM - 9:00 PM",
    },
  });
  
  // Mutation to create a study space
  const createStudySpaceMutation = useMutation({
    mutationFn: async (data: InsertStudySpace) => {
      return apiRequest('POST', '/api/admin/study-spaces', data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "New study space added successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/study-spaces'] });
      form.reset();
      onClose();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add study space",
      });
    }
  });
  
  const onSubmit = (data: FormValues) => {
    // Ensure we have a valid availableSeats value
    const availableSeats = data.availableSeats !== undefined ? data.availableSeats : data.totalSeats;
    
    // Ensure availableSeats is not greater than totalSeats
    if (availableSeats > data.totalSeats) {
      form.setError("availableSeats", {
        type: "manual",
        message: "Available seats cannot exceed total seats",
      });
      return;
    }
    
    // Create a new object with all required properties
    const studySpaceData: InsertStudySpace = {
      name: data.name,
      address: data.address,
      description: data.description,
      imageUrl: data.imageUrl,
      totalSeats: data.totalSeats,
      availableSeats: availableSeats,
      openingHours: data.openingHours || null,
      latitude: null,
      longitude: null
    };
    
    createStudySpaceMutation.mutate(studySpaceData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Study Space</DialogTitle>
          <DialogDescription>
            Create a new library or study space location for students.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Central Library" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Address*</FormLabel>
                    <FormControl>
                      <Input placeholder="123 University Ave, Campus" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="A quiet study environment with various amenities..." 
                        className="resize-none" 
                        rows={3}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="totalSeats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Seats*</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="availableSeats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Seats</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={0} 
                        max={form.getValues("totalSeats")} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/image.jpg" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="openingHours"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Opening Hours</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="9:00 AM - 9:00 PM" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter className="mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-[#3949ab] hover:bg-[#2e399c]" 
                disabled={createStudySpaceMutation.isPending}
              >
                {createStudySpaceMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : "Create Study Space"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}