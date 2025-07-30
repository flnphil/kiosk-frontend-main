import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { Card } from "../../components/ui/user-card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Button } from "../../components/ui/user-button";
import { Input } from "../../components/ui/user-input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { DashboardLayout } from "../../components/DashboardLayout";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export function UserSettings() {
  const { name, setName, updateUserName } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileName, setProfileName] = useState(name);
  const [email, setEmail] = useState("user@example.com");
  const [allowDataCollection, setAllowDataCollection] = useState(true);

  // Fetch user info on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.user_id;
        const response = await fetch(
          `http://localhost:5000/api/user/${userId}`
        );
        const data = await response.json();
        if (data.success && data.user) {
          setProfileName(data.user.name);
          setEmail(data.user.email);
          setName(data.user.name); // Sync context
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
    fetchUserDetails();
    // eslint-disable-next-line
  }, []);

  const handleSaveProfile = async () => {
    if (profileName !== name) {
      const success = await updateUserName(profileName);
      if (success) {
        setName(profileName);
        toast.success("Your profile information has been saved successfully.");
      } else {
        toast.error("Failed to update your profile. Try again!");
      }
    }
  };

  const handleSavePrivacy = () => {
    toast.success("Your privacy settings have been saved successfully.");
  };
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Settings</h1>
          <p className="text-muted-foreground">
            Manage your profile and preferences
          </p>
        </div>

        <Card className="p-6">
          <Tabs
            defaultValue="profile"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6 border-b w-full rounded-none bg-transparent p-0 h-auto">
              <TabsTrigger
                value="profile"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
              >
                Profile Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Profile Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Update your personal information
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={name}
                      readOnly
                      className="bg-muted text-muted-foreground cursor-not-allowed"
                    />
                    <p className="text-sm text-muted-foreground text-red-500 font-medium">
                      Your username cannot be changed. It is unique to your
                      account.
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input
                      id="display-name"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      readOnly
                      className="bg-muted text-muted-foreground cursor-not-allowed"
                    />
                    <p className="text-sm text-muted-foreground text-red-500 font-medium">
                      Your Email Address cannot be changed. It is unique to your
                      account.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="default"
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                    onClick={handleSaveProfile}
                  >
                    Save Profile
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="mt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Privacy Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your privacy preferences
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-collection">Data Collection</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to collect usage data to improve your
                        experience
                      </p>
                    </div>
                    <Switch
                      id="data-collection"
                      checked={allowDataCollection}
                      onCheckedChange={setAllowDataCollection}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="default"
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                    onClick={handleSavePrivacy}
                  >
                    Save Privacy Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
}
