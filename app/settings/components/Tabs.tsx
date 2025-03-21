
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Billing from "./Billing"
import Profile from "./Profile"
import Credits from "./Credits"
export function TabsDemo() {
  
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="flex justify-between md:w-[70%]">
        <TabsTrigger value="profile" className="data-[state=active]:border-b-[#EF5A3C]">Profile</TabsTrigger>
        <TabsTrigger value="preferences" className="data-[state=active]:border-b-[#EF5A3C]">Preferences</TabsTrigger>
        <TabsTrigger value="notifications" className="data-[state=active]:border-b-[#EF5A3C]">Notifications</TabsTrigger>
        <TabsTrigger value="integrations" className="data-[state=active]:border-b-[#EF5A3C]">Integrations</TabsTrigger>
        <TabsTrigger value="security" className="data-[state=active]:border-b-[#EF5A3C]">Security</TabsTrigger>
        <TabsTrigger value="billing" className="data-[state=active]:border-b-[#EF5A3C]">Billing</TabsTrigger>
        <TabsTrigger value="credits" className="data-[state=active]:border-b-[#EF5A3C]">Credits</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Profile />
      </TabsContent>
      <TabsContent value="preferences">
        <h1>Preferences</h1>
      </TabsContent>
      <TabsContent value="notifications">
        <h1>Notifications</h1>
      </TabsContent>
      <TabsContent value="integrations">
        <h1>Integrations</h1>
      </TabsContent>
      <TabsContent value="security">
        <h1>Security</h1>
      </TabsContent>
      <TabsContent value="billing">
        <Billing />
      </TabsContent>
      <TabsContent value="credits">
        <Credits />
      </TabsContent>
    </Tabs>
  )
}
