import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useToast } from "@/hooks/use-toast";
import { StudySpaceWithAmenities } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import AddStudySpaceModal from "@/components/AddStudySpaceModal";

export default function AdminDashboard() {
  const { logout } = useAdminAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [_, navigate] = useLocation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Fetch all study spaces
  const { data: studySpaces, isLoading } = useQuery<StudySpaceWithAmenities[]>({
    queryKey: ['/api/study-spaces'],
  });
  
  // Mutation to update study space availability
  const updateAvailabilityMutation = useMutation({
    mutationFn: async ({ id, availableSeats }: { id: number; availableSeats: number }) => {
      return apiRequest('PATCH', `/api/admin/study-spaces/${id}`, { availableSeats });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Study space availability updated",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/study-spaces'] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update study space",
      });
    }
  });
  
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin panel",
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#3949ab]" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#3949ab] text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <i className="fas fa-user-shield text-2xl"></i>
            <h1 className="text-xl font-bold">Calm Corners Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-[#2e399c]"
              onClick={() => navigate("/")}
            >
              <i className="fas fa-home mr-2"></i> View Site
            </Button>
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-[#2e399c]"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt mr-2"></i> Logout
            </Button>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Manage Study Spaces</h2>
          <Button 
            className="bg-[#3949ab] hover:bg-[#2e399c]"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" /> Add New Study Space
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Address</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Availability</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Amenities</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studySpaces?.map((space) => (
                  <StudySpaceRow
                    key={space.id}
                    studySpace={space}
                    onUpdateAvailability={(availableSeats) =>
                      updateAvailabilityMutation.mutate({ id: space.id, availableSeats })
                    }
                    isPending={updateAvailabilityMutation.isPending}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <AddStudySpaceModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
        />
      </main>
    </div>
  );
}

function StudySpaceRow({
  studySpace,
  onUpdateAvailability,
  isPending
}: {
  studySpace: StudySpaceWithAmenities;
  onUpdateAvailability: (availableSeats: number) => void;
  isPending: boolean;
}) {
  const [availableSeats, setAvailableSeats] = useState(studySpace.availableSeats);
  
  const getAvailabilityColor = (available: number, total: number) => {
    if (available === 0) return "bg-red-100 text-red-800";
    if (available < total * 0.2) return "bg-amber-100 text-amber-800";
    return "bg-green-100 text-green-800";
  };
  
  const handleSave = () => {
    onUpdateAvailability(availableSeats);
  };
  
  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50">
      <td className="py-3 px-4">
        <div className="font-medium text-slate-800">{studySpace.name}</div>
      </td>
      <td className="py-3 px-4 text-slate-600 text-sm">{studySpace.address}</td>
      <td className="py-3 px-4">
        <div className="flex items-center mb-2">
          <span className={`text-sm rounded-full px-2 py-1 ${getAvailabilityColor(studySpace.availableSeats, studySpace.totalSeats)}`}>
            {studySpace.availableSeats}/{studySpace.totalSeats} seats
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            className="w-20"
            min={0}
            max={studySpace.totalSeats}
            value={availableSeats}
            onChange={(e) => setAvailableSeats(parseInt(e.target.value) || 0)}
          />
          <Button 
            size="sm" 
            className="bg-[#3949ab] hover:bg-[#2e399c]"
            onClick={handleSave}
            disabled={isPending || availableSeats === studySpace.availableSeats}
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update'}
          </Button>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex flex-wrap gap-1">
          {studySpace.amenities.map((amenity) => (
            <Badge key={amenity.id} variant="outline" className="text-xs">
              <i className={`fas fa-${amenity.icon} mr-1 text-[#3949ab]`}></i> {amenity.name}
            </Badge>
          ))}
        </div>
      </td>
      <td className="py-3 px-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-slate-600 hover:text-slate-800"
          onClick={() => window.open(`/study-spaces/${studySpace.id}`, '_blank')}
        >
          <i className="fas fa-eye mr-1"></i> View
        </Button>
      </td>
    </tr>
  );
}