import { useState, FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { StudySpaceWithAmenities, InsertBooking } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  studySpace: StudySpaceWithAmenities;
}

export default function BookingModal({ isOpen, onClose, studySpace }: BookingModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [date, setDate] = useState(getCurrentDate());
  const [timeSlot, setTimeSlot] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [notes, setNotes] = useState("");
  
  const bookingMutation = useMutation({
    mutationFn: async (bookingData: InsertBooking) => {
      return apiRequest('POST', '/api/bookings', bookingData);
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed",
        description: `You've successfully booked ${numberOfSeats} seat(s) at ${studySpace.name}.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/study-spaces'] });
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      onClose();
      resetForm();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    }
  });
  
  function getCurrentDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  
  const resetForm = () => {
    setDate(getCurrentDate());
    setTimeSlot("");
    setNumberOfSeats(1);
    setNotes("");
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!timeSlot) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a time slot.",
      });
      return;
    }
    
    bookingMutation.mutate({
      studySpaceId: studySpace.id,
      userId: null, // In a real app, this would be the authenticated user's ID
      date,
      timeSlot,
      numberOfSeats,
      notes
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Book a Study Space</DialogTitle>
          <DialogDescription className="text-slate-500">
            Reserve your spot at {studySpace.name}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-1">{studySpace.name}</h4>
            <p className="text-sm text-slate-500">
              <i className="fas fa-map-marker-alt mr-1"></i> {studySpace.address}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="booking-date">Date</Label>
              <Input
                type="date"
                id="booking-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={getCurrentDate()}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="time-slot">Time Slot</Label>
              <Select value={timeSlot} onValueChange={setTimeSlot}>
                <SelectTrigger id="time-slot">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</SelectItem>
                  <SelectItem value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</SelectItem>
                  <SelectItem value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</SelectItem>
                  <SelectItem value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</SelectItem>
                  <SelectItem value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</SelectItem>
                  <SelectItem value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</SelectItem>
                  <SelectItem value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</SelectItem>
                  <SelectItem value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</SelectItem>
                  <SelectItem value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="seats">Number of Seats</Label>
            <Select 
              value={numberOfSeats.toString()} 
              onValueChange={(value) => setNumberOfSeats(parseInt(value))}
            >
              <SelectTrigger id="seats">
                <SelectValue placeholder="Select number of seats" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 seat</SelectItem>
                <SelectItem value="2">2 seats</SelectItem>
                <SelectItem value="3">3 seats</SelectItem>
                <SelectItem value="4">4 seats</SelectItem>
                <SelectItem value="5">5+ seats (Group Study)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="notes">Special Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special requirements..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-[#3949ab] hover:bg-[#2e399c]"
              disabled={bookingMutation.isPending}
            >
              {bookingMutation.isPending ? "Processing..." : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
