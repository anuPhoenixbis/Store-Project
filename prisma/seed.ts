// Seeding a database means pre-populating it with initial data so the application 
// can work, be tested, or be demonstrated immediately.
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import products from "./products.json" with { type: "json" };

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  ssl: {
    rejectUnauthorized: false,
  },
});

const prisma = new PrismaClient({ adapter });

async function main(){
    for(const product of products){
        await prisma.product.create({//creating the products using the dummy values
            data: product,
        })
    }
}

main()
    .then(async()=>{
        await prisma.$disconnect();
    })
    .catch(async (e)=>{
        console.error(e)
        await prisma.$disconnect();
        process.exit(1);
    })