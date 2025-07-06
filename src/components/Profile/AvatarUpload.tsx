
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { toast } from "sonner";

interface AvatarUploadProps {
  currentAvatarUrl?: string | null;
  onAvatarChange: (url: string) => void;
  displayName: string;
}

export const AvatarUpload = ({ currentAvatarUrl, onAvatarChange, displayName }: AvatarUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const initials = displayName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleUploadClick = () => {
    toast.info("Fitur upload avatar sedang dalam perbaikan", {
      description: "Mohon tunggu update selanjutnya untuk dapat menggunakan fitur ini."
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage 
            src={currentAvatarUrl || undefined} 
            alt={displayName} 
          />
          <AvatarFallback className="text-lg">
            {initials}
          </AvatarFallback>
        </Avatar>
        
        <Button
          type="button"
          size="sm"
          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
          onClick={handleUploadClick}
          disabled={isUploading}
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        Fitur upload foto profil sedang dalam perbaikan
      </p>
    </div>
  );
};
