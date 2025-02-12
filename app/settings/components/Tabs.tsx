
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Billing from "./Billing"
export function TabsDemo() {
  return (
    <Tabs defaultValue="billing" className="w-full">
      <TabsList className="flex justify-between md:w-[70%]">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="credits">Credits</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <h1>Profile</h1>
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
        <h1>Credits</h1>
      </TabsContent>
    </Tabs>
  )
}
