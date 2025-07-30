import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Camera, User } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { useUser } from "../../context/usercontext";
import { jwtDecode } from "jwt-decode";

export function ProfileSettings() {
  const { toast } = useToast();
  const { name: contextName, setName: setContextName } = useUser();

  // --- Separate "saved" and "edit" state! ---
  const [savedName, setSavedName] = useState(contextName || "");
  const [editName, setEditName] = useState(contextName || "");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const username = "admin_user";

  // On mount, fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const userId = decoded?.user_id;
        if (!userId) return;

        const res = await axios.get(
          `http://localhost:5000/api/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data?.success && res.data?.user) {
          setSavedName(res.data.user.name || "");
          setEditName(res.data.user.name || "");
          setEmail(res.data.user.email || "");
        }
      } catch (err) {
        toast({
          title: "Failed to load user details",
          description:
            err?.response?.data?.message ||
            "An error occurred while loading profile.",
          variant: "destructive",
        });
      }
    };

    fetchUserDetails();
    // eslint-disable-next-line
  }, []);

  // Profile image upload logic unchanged
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = () => {
          setProfileImage(reader.result);
          setUploading(false);
          toast({
            title: "Image uploaded",
            description: "Your profile picture has been updated.",
            duration: 3000,
          });
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  // --- Only save editName to savedName/contextName on Save Changes ---
  const saveChanges = async () => {
    setUploading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Not Authenticated",
        description: "Please login again.",
        variant: "destructive",
      });
      setUploading(false);
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:5000/api/admin/update-name",
        { name: editName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data?.success) {
        setSavedName(editName); // <-- update displayed name
        setContextName(editName); // <-- update in context
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
          duration: 3000,
        });
      } else {
        throw new Error(res.data?.message || "Failed to update name");
      }
    } catch (err) {
      toast({
        title: "Failed to update profile",
        description:
          err?.response?.data?.message ||
          "An error occurred while updating profile.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile Information</h3>
        <p className="text-sm text-muted-foreground">
          Update your profile information and how it appears to others.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profileImage} />
            <AvatarFallback className="bg-purple-200 text-purple-700">
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0">
            <Label
              htmlFor="profile-image"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-purple-300 text-purple-700 shadow-sm hover:bg-purple-200"
            >
              <Camera className="h-4 w-4" />
              <span className="sr-only">Upload profile picture</span>
            </Label>
            <Input
              id="profile-image"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </div>
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-semibold">{savedName}</h4>
          <p className="text-sm text-muted-foreground">Upload a new avatar</p>
          {uploading && <p className="text-xs text-purple-500">Uploading...</p>}
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <Input
              id="username"
              value={username}
              readOnly
              className="bg-muted cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Username cannot be changed
            </p>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            readOnly
            className="bg-muted cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Email address cannot be changed
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={saveChanges}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={uploading}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
