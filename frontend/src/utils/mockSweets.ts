import type { Sweet } from "./types";
import chocolateTruffles from "../assets/chocolate-truffles.png";
import strawberryGummies from "../assets/strawberry-gummies.jpg";
import caramelFudge from "../assets/caramel-fudge.jpg";
// import mintLollipops from "../assets/mint-lollipops.jpg";
import mintLollipops from "../assets/rainbow-lollipops.jpg"
import honeyToffee from "../assets/honey-toffee.jpg";
import rainbowLollipops from "../assets/rainbow-lollipops.jpg";
import milkChocolateBar from "../assets/vanilla-marshmallows.jpg";
import sourPatchKids from "../assets/sour-patch-candies.jpg";
import peanutBrittle from "../assets/peanut-brittle.jpg";
import cottonCandy from "../assets/cotton-candy.jpg";
import jellyBeans from "../assets/jelly-beans.jpg";
import vanillaMarshmallows from "../assets/vanilla-marshmallows.jpg";


export const mockSweets: Sweet[] = [
  {
    id: "1",
    name: "Chocolate Truffles",
    description: "Handcrafted dark chocolate truffles with rich cocoa flavor",
    price: 12.99,
    quantity: 25,
    category: "Chocolate",
    image: chocolateTruffles,
  },
  {
    id: "2",
    name: "Strawberry Gummies",
    description: "Soft and chewy gummy candies with real strawberry juice",
    price: 7.99,
    quantity: 50,
    category: "Gummies",
    image: strawberryGummies,
  },
  {
    id: "3",
    name: "Caramel Fudge",
    description: "Smooth and creamy caramel fudge made from butter and brown sugar",
    price: 9.99,
    quantity: 15,
    category: "Fudge",
    image: caramelFudge,
  },
  {
    id: "4",
    name: "Mint Lollipops",
    description: "Refreshing peppermint lollipops with a cool finish",
    price: 4.99,
    quantity: 0,
    category: "Lollipops",
    image: mintLollipops,
  },
  {
    id: "5",
    name: "Vanilla Marshmallows",
    description: "Fluffy vanilla-flavored marshmallows, perfect for hot cocoa",
    price: 6.99,
    quantity: 30,
    category: "Marshmallows",
    image: vanillaMarshmallows,
  },
  {
    id: "6",
    name: "Honey Toffee",
    description: "Crunchy toffee made with organic honey and butter",
    price: 10.99,
    quantity: 20,
    category: "Toffee",
    image: honeyToffee,
  },
  {
    id: "7",
    name: "Rainbow Lollipops",
    description: "Colorful swirl lollipops with multiple fruit flavors",
    price: 5.99,
    quantity: 40,
    category: "Lollipops",
    image: rainbowLollipops,
  },
  {
    id: "8",
    name: "Milk Chocolate Bar",
    description: "Classic milk chocolate bar with creamy texture",
    price: 3.99,
    quantity: 0,
    category: "Chocolate",
    image: milkChocolateBar,
  },
  {
    id: "9",
    name: "Sour Patch Kids",
    description: "Tangy and sweet soft candies with sour sugar coating",
    price: 8.99,
    quantity: 35,
    category: "Gummies",
    image: sourPatchKids,
  },
  {
    id: "10",
    name: "Peanut Brittle",
    description: "Crunchy brittle packed with roasted peanuts",
    price: 11.99,
    quantity: 18,
    category: "Brittle",
    image: peanutBrittle,
  },
  {
    id: "11",
    name: "Cotton Candy",
    description: "Light and fluffy spun sugar in blue raspberry flavor",
    price: 5.49,
    quantity: 22,
    category: "Cotton Candy",
    image: cottonCandy
  },
  {
    id: "12",
    name: "Jelly Beans",
    description: "Assorted flavored jelly beans in a variety of colors",
    price: 6.49,
    quantity: 45,
    category: "Jelly Beans",
    image: jellyBeans,
  },
]
