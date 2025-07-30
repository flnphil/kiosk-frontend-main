import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./../../components/ui/user-card";
import { Button } from "./../../components/ui/user-button";
import { Wallet, Coins, AlertCircle, CircleArrowRight } from "lucide-react";
import { DashboardLayout } from "../../components/DashboardLayout";
import axios from "axios";
import { toast } from "react-toastify";

import { jwtDecode } from "jwt-decode";

export function UserWallet() {
  const { wallet, fetchUserPoints } = useUser();
  const [discountPercent, setDiscountPercent] = useState(0);

  const fetchDiscountPercent = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const decoded = jwtDecode(token);
      const userId = decoded.user_id;

      const res = await axios.get(
        `http://localhost:5000/api/users/${userId}/redeem`
      );
      if (res.data.success) {
        setDiscountPercent(res.data.discount_percent ?? 0);
      } else {
        setDiscountPercent(0);
      }
    } catch (error) {
      setDiscountPercent(0);
    }
  };

  useEffect(() => {
    fetchDiscountPercent();
  }, []);

  const handleRedeemDiscount = async (discountId, discountName, percentOff) => {
    if (
      wallet.points <
      wallet.discounts.find((d) => d.id === discountId).pointCost
    ) {
      toast.error("You don't have enough points for this discount.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not logged in");
      const decoded = jwtDecode(token);
      const userId = decoded.user_id;

      const response = await axios.post(
        "http://localhost:5000/api/redeem/apply-redeem",
        {
          user_id: userId,
          redeem_percent: percentOff,
        }
      );

      if (response.data.success) {
        toast.success(
          `You've successfully redeemed the ${percentOff}% discount.`
        );
        fetchUserPoints && fetchUserPoints();
        // fetch discount again here!
        fetchDiscountPercent();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchUserPoints();
  }, [fetchUserPoints]);
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Wallet</h1>
          <p className="text-muted-foreground">
            Manage your points and discounts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-purple-500" />
                <span>Points Balance</span>
              </CardTitle>
              <CardDescription>
                Your current points and how to earn more
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-purple-700 mb-1">
                      Available Points
                    </p>
                    <p className="text-4xl font-bold text-purple-800">
                      {wallet.points}
                    </p>
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
                  <span>
                    Attend events:{" "}
                    <span className="font-medium">+10 points</span> per event
                  </span>
                </li>
              </ul>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <div className="bg-green-100 rounded-full p-1">
                    <CircleArrowRight className="h-4 w-4 text-green-600" />
                  </div>
                  <span>
                    Applied Discount:{" "}
                    <span className="font-medium">
                      {discountPercent ? `${discountPercent}% off` : "0"}
                    </span>
                  </span>
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
              <CardDescription>
                Redeem your points for discounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {wallet.discounts.length > 0 ? (
                <div className="space-y-3">
                  {wallet.discounts.map((discount) => (
                    <div key={discount.id} className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium">{discount.name}</p>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                          {discount.pointCost} points
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get {discount.percentOff}% off on any paid event
                        registration
                      </p>

                      <Button
                        variant="default"
                        className="bg-purple-500 hover:bg-purple-600 text-white w-full"
                        disabled={wallet.points < discount.pointCost}
                        onClick={() =>
                          handleRedeemDiscount(
                            discount.id,
                            discount.name,
                            discount.percentOff
                          )
                        }
                      >
                        {wallet.points >= discount.pointCost
                          ? "Redeem Now"
                          : "Not Enough Points"}
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
