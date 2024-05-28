import { Car } from "lucide-react";
import { Card, CardContent, CardDescription } from "./ui/card";

export default function Footer() {
  return (
    <>
      <div className="bg-black  flex flex-row flex-wrap justify-center py-24">
        <Card className="bg-black text-white border-none shadow-none mx-auto leading-10	">
          <h1 className="text-xl font-bold">Exclusive</h1>
          <p>Subscribe</p>
          <p>Get 10% off your first order</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="text-white bg-black"
          />
        </Card>
        <Card className="bg-black text-white border-none shadow-none mx-auto leading-10">
          <h1 className="text-xl font-bold">Support</h1>
          <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </Card>
        <Card className="bg-black text-white border-none shadow-none mx-auto leading-10">
          <h1 className="text-xl font-bold">Account</h1>
          <p>My Account</p>
          <p>Login / Register</p>
          <p>Cart</p>
          <p>Wishlist</p>
          <p>Shop</p>
        </Card>
      </div>
      <div className="bg-black flex flex-row justify-center py-4">
        <div className="text-white text-center">
          <p>© 2024 SCDB. All Rights Reserved</p>
        </div>
      </div>
    </>
  );
}
