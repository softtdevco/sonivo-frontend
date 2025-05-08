import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Billing from "./Billing"
import Profile from "./Profile"
import Security from "./Security"
export function TabsDemo() {
  
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="flex justify-between md:w-[30%]">
        <TabsTrigger value="profile" className="data-[state=active]:border-b-[#EF5A3C]">Profile</TabsTrigger>
        <TabsTrigger value="security" className="data-[state=active]:border-b-[#EF5A3C]">Security</TabsTrigger>
        <TabsTrigger value="billing" className="data-[state=active]:border-b-[#EF5A3C]">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Profile />
      </TabsContent>
      <TabsContent value="security">
        <Security />
      </TabsContent>
      <TabsContent value="billing">
        <Billing />
      </TabsContent>
    </Tabs>
  )
}
