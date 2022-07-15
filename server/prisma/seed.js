// npx prisma db seed

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const createShops = [
    prisma.shop.create({
      data: {
        shopName: "Mc Donald's",
        shopDescription: "McDonald's predominantly sells hamburgers, various types of chicken, chicken sandwiches, French fries, soft drinks, breakfast items, and desserts. In most markets, McDonald's offers salads and vegetarian items, wraps and other localized fare. On a seasonal basis, McDonald's offers the McRib sandwich. Some speculate the seasonality of the McRib adds to its appeal.",
        shopImage: "/images/shops/001.jpg",
        shopDetails: {
          geo: {
            lat: 49.232621727858074,
            lng: 28.470753912722767,
          },
          address: "Soborna St, 51а, Vinnytsia, Vinnytsia Oblast, 21000",
        },
        products: {
          create: [
            {
              productName: "Chicken mc nuggets. 4 piece",
              productUnitPrice: 50.0,
              productImage: "/images/products/p01.jpg"
            },
            {
              productName: "Chicken mc nuggets. 6 piece",
              productUnitPrice: 65.0,
              productImage: "/images/products/p01.jpg"
            },
            {
              productName: "Mc Flurry. Oreo",
              productUnitPrice: 45.0,
              productImage: "/images/products/p02.jpg"
            },
            {
              productName: "Mc Flurry. M&Ms candies",
              productUnitPrice: 45.0,
              productImage: "/images/products/p02.jpg"
            },
            {
              productName: "Fries. Small",
              productUnitPrice: 35.0,
              productImage: "/images/products/p03.jpg"
            },
            {
              productName: "Fries. Medium",
              productUnitPrice: 42.5,
              productImage: "/images/products/p03.jpg"
            },
            {
              productName: "Fries. Large",
              productUnitPrice: 50.0,
              productImage: "/images/products/p03.jpg"
            },
            {
              productName: "Cheeseburger",
              productUnitPrice: 40.0,
              productImage: "/images/products/p04.jpg"
            },
            {
              productName: "Big Mac",
              productUnitPrice: 69.0,
              productImage: "/images/products/p05.jpg"
            },
          ],
        },
      },
    }),
    prisma.shop.create({
      data: {
        shopName: "Street Wok",
        shopDescription: "Asian food cooked in a burning hot wok is about fresh and healthy ingredients, great taste. and versatility.",
        shopImage: "/images/shops/005.jpg",
        shopDetails: {
          geo: {
            lat: 49.23431995225903,
            lng: 28.462299972545516,
          },
          address: "Soborna St, 76, Vinnytsia, Vinnytsia Oblast, 21000",
        },
        products: {
          create: [
            {
              productName: "Wok with rice",
              productUnitPrice: 100.0,
              productImage: "/images/products/p17.jpg"
            },
            {
              productName: "Wok Tom Yum with shrimps",
              productUnitPrice: 119.0,
              productImage: "/images/products/p27.jpg"
            },
            {
              productName: "Wok Seafoods",
              productUnitPrice: 129.0,
              productImage: "/images/products/p23.jpg"
            },
            {
              productName: "Classic Wok",
              productUnitPrice: 105.0,
              productImage: "/images/products/p14.jpg"
            },
            {
              productName: "Caesar salad with shrimps",
              productUnitPrice: 100.0,
              productImage: "/images/products/p19.jpg"
            },
          ],
        },
      },
    }),
    prisma.shop.create({
      data: {
        shopName: "Domino's pizza",
        shopDescription: "Pizza",
        shopImage: "/images/shops/003.jpg",
        shopDetails: {
          geo: {
            lat: 49.21967460190153,
            lng: 28.448171911932203,
          },
          address: "Zodchykh St, 10, Vinnytsia, Vinnytsia Oblast, 21000",
        },
        products: {
          create: [
            {
              productName: "Pizza Manhattan",
              productUnitPrice: 215.0,
              productImage: "/images/products/p17.jpg"
            },
            {
              productName: "Pizza Pepperoni with tomatoes",
              productUnitPrice: 215.0,
              productImage: "/images/products/p26.jpg"
            },
            {
              productName: "Pizza Ham & mushrooms",
              productUnitPrice: 215.0,
              productImage: "/images/products/p24.jpg"
            },
            {
              productName: "Pizza Texas",
              productUnitPrice: 215.0,
              productImage: "/images/products/p22.jpg"
            },
            {
              productName: "Pizza Tony Pepperoni",
              productUnitPrice: 240.0,
              productImage: "/images/products/p20.jpg"
            },
            {
              productName: "Pizza Margarita",
              productUnitPrice: 240.0,
              productImage: "/images/products/p18.jpg"
            },
            {
              productName: "Bread with pulled beef and onion",
              productUnitPrice: 125.0,
              productImage: "/images/products/p12.jpg"
            },
            {
              productName: "Bread with ham and mushrooms",
              productUnitPrice: 120.0,
              productImage: "/images/products/p13.jpg"
            },
            {
              productName: "Bread with pepperoni, munich sausages and mustard",
              productUnitPrice: 120.0,
              productImage: "/images/products/p14.jpg"
            },
          ],
        },
      },
    }),
    prisma.shop.create({
      data: {
        shopName: "KFC",
        shopDescription: "KFC's core product offering is pressure fried on-the-bone chicken pieces seasoned with Colonel Harland Sanders' \"Original Recipe\" of 11 herbs and spices. The product is typically available in either two- or three-piece individual servings or in a family size cardboard bucket typically holding between six and 16 chicken pieces.",
        shopImage: "/images/shops/004.jpg",
        shopDetails: {
          geo: {
            lat: 49.228191321365415,
            lng: 28.426776684942656,
          },
          address: "600-Richchya St, 17Е, Vinnytsia, Vinnytsia Oblast, 21000",
        },
        products: {
          create: [
            {
              productName: "BUCKET DUET SPICY",
              productUnitPrice: 225.0,
              productImage: "/images/products/p08.jpg"
            },
            {
              productName: "BUCKET DUET ORIGINAL",
              productUnitPrice: 225.0,
              productImage: "/images/products/p07.jpg"
            },
            {
              productName: "Longer",
              productUnitPrice: 35.0,
              productImage: "/images/products/p11.jpg"
            },
            {
              productName: "Double Chicken",
              productUnitPrice: 65.0,
              productImage: "/images/products/p10.jpg"
            },
            {
              productName: "CHEESEBURGER",
              productUnitPrice: 50.0,
              productImage: "/images/products/p10.jpg"
            },
            {
              productName: "Wings. 5 pieces",
              productUnitPrice: 89.0,
              productImage: "/images/products/p06.jpg"
            },
            {
              productName: "Wings. 8 pieces",
              productUnitPrice: 129.0,
              productImage: "/images/products/p06.jpg"
            },
            {
              productName: "Twister",
              productUnitPrice: 80.0,
              productImage: "/images/products/p09.jpg"
            },
          ],
        },
      },
    }),
  ]

  await prisma.$transaction(createShops)
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
