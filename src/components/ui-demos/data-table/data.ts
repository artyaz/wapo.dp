export type PaymentStatus = "pending" | "processing" | "success" | "failed"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: PaymentStatus
  email: string
}

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "9a3b41c7",
    amount: 350,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "b5f02e18",
    amount: 75,
    status: "failed",
    email: "jane.doe@outlook.com",
  },
  {
    id: "c2d81f93",
    amount: 2200,
    status: "success",
    email: "payments@acme.co",
  },
  {
    id: "e6f5d0a1",
    amount: 45,
    status: "pending",
    email: "alex.morgan@proton.me",
  },
  {
    id: "f1a2b3c4",
    amount: 560,
    status: "processing",
    email: "sarah.smith@gmail.com",
  },
  {
    id: "0d9c8b7a",
    amount: 199,
    status: "success",
    email: "hello@nova.io",
  },
  {
    id: "3e5f6a7b",
    amount: 89,
    status: "failed",
    email: "chris.taylor@fastmail.com",
  },
  {
    id: "8c7d6e5f",
    amount: 1200,
    status: "pending",
    email: "billing@vertex.dev",
  },
  {
    id: "2b4a6c8e",
    amount: 310,
    status: "success",
    email: "u.chen@hotmail.com",
  },
  {
    id: "6f0e2d4c",
    amount: 64,
    status: "processing",
    email: "maria.garcia@gmail.com",
  },
  {
    id: "a1b2c3d4",
    amount: 875,
    status: "success",
    email: "orders@lumen.shop",
  },
  {
    id: "5d6e7f8a",
    amount: 150,
    status: "failed",
    email: "dmitri.v@yandex.ru",
  },
  {
    id: "9f8e7d6c",
    amount: 430,
    status: "pending",
    email: "anna.wilson@icloud.com",
  },
  {
    id: "4c5b6a79",
    amount: 29,
    status: "success",
    email: "support@tiny.cc",
  },
  {
    id: "7a8b9c0d",
    amount: 640,
    status: "processing",
    email: "lucas.meyer@web.de",
  },
  {
    id: "1e2f3a4b",
    amount: 275,
    status: "success",
    email: "finance@orbit-corp.com",
  },
  {
    id: "b0a1f2e3",
    amount: 110,
    status: "pending",
    email: "priya.patel@gmail.com",
  },
  {
    id: "d4c3b2a1",
    amount: 990,
    status: "failed",
    email: "tom.brown@aol.com",
  },
  {
    id: "6a5b4c3d",
    amount: 38,
    status: "success",
    email: "team@zenith.app",
  },
  {
    id: "0f9e8d7c",
    amount: 720,
    status: "processing",
    email: "yuki.tanaka@gmail.com",
  },
  {
    id: "e3d2c1b0",
    amount: 415,
    status: "pending",
    email: "info@cascade.ltd",
  },
  {
    id: "5c4d3e2f",
    amount: 130,
    status: "success",
    email: "omar.hassan@gmail.com",
  },
  {
    id: "8d7c6b5a",
    amount: 58,
    status: "failed",
    email: "emma.davis@mail.com",
  },
  {
    id: "2f4e6d8c",
    amount: 1650,
    status: "success",
    email: "accounts@pulser.tech",
  },
  {
    id: "a9b8c7d6",
    amount: 205,
    status: "pending",
    email: "noah.miller@gmail.com",
  },
  {
    id: "c6d5e4f3",
    amount: 87,
    status: "processing",
    email: "linda.park@naver.com",
  },
  {
    id: "4b6a8c0e",
    amount: 540,
    status: "success",
    email: "sales@meridian.io",
  },
]
