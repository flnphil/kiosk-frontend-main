
import React from "react";
import { useUser } from "../../context/usercontext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Wallet, Coins, AlertCircle } from "lucide-react";
import { DashboardLayout } from "../DashboardLayout";
import { useToast } from "../../hooks/use-toast";

export function UserWallet() {
  const { wallet, redeemDiscount } = useUser();
  const { toast } = useToast();

  const handleRedeemDiscount = (discountId, discountName) => {
    const success = redeemDiscount(discountId);
    
    if (success) {
      toast({
        title: "Discount Redeemed!",
        description: `You've successfully redeemed the ${discountName} discount.`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Redemption Failed",
        description: "You don't have enough points for this discount.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Wallet</h1>
          <p className="text-muted-foreground">Manage your points and discounts</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-purple-500" />
                <span>Points Balance</span>
              </CardTitle>
              <CardDescription>Your current points and how to earn more</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-purple-700 mb-1">Available Points</p>
                    <p className="text-4xl font-bold text-purple-800">{wallet.points}</p>
                  </div>
                  <Coins className="h-12 w-12 text-purple-500 opacity-80" />
                </div>
              </div>
              
              <h3 className="font-medium mb-3">How to Earn More Points</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <div className="bg-green-100 rounded-full p-1">
                    <Coins className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Attend events: <span className="font-medium">+10 points</span> per event</span>
                </li>
                <li className="flex gap-2">
                  <div className="bg-green-100 rounded-full p-1">
                    <Coins className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Register early: <span className="font-medium">+5 points</span> for registrations 7+ days before event</span>
                </li>
                <li className="flex gap-2">
                  <div className="bg-green-100 rounded-full p-1">
                    <Coins className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Bring friends: <span className="font-medium">+3 points</span> per friend who registers</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-purple-500" />
                <span>Available Discounts</span>
              </CardTitle>
              <CardDescription>Redeem your points for discounts</CardDescription>
            </CardHeader>
            <CardContent>
              {wallet.discounts.length > 0 ? (
                <div className="space-y-3">
                  {wallet.discounts.map(discount => (
                    <div key={discount.id} className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium">{discount.name}</p>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                          {discount.pointCost} points
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get {discount.percentOff}% off on any paid event registration
                      </p>
                      <Button 
                        className="w-full"
                        disabled={wallet.points < discount.pointCost}
                        onClick={() => handleRedeemDiscount(discount.id, discount.name)}
                      >
                        {wallet.points >= discount.pointCost ? 'Redeem Now' : 'Not Enough Points'}
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
                  <p>No discounts available right now</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
