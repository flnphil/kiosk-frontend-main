
import { useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ProfileSettings } from "../components/settings/ProfileSettings";
import { PreferencesSettings } from "../components/settings/PreferencesSettings";
import { SecuritySettings } from "../components/settings/SecuritySettings";
import { Card } from "../components/ui/card";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        
        <Card className="p-6">
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 border-b w-full rounded-none bg-transparent p-0 h-auto">
              <TabsTrigger 
                value="profile" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
              >
                Edit Profile
              </TabsTrigger>
              <TabsTrigger 
                value="preferences" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
              >
                Preferences
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
              >
                Security
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-4">
              <ProfileSettings />
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-4">
              <PreferencesSettings />
            </TabsContent>
            
            <TabsContent value="security" className="mt-4">
              <SecuritySettings />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
}
