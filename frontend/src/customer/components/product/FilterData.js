export const color = [
    "White",
    "Black",
    "Red",
    "Maroon",
    "Beige",
    "Pink",
    "Blue",
    "Green",
    "Yellow",
];

export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: false },
      { value: "black", label: "Black", checked: false },
      { value: "gray", label: "Gray", checked: false },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
      { value: "yellow", label: "Yellow", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "S", label: "S", checked: false },
      { value: "M", label: "M", checked: false },
      { value: "L", label: "L", checked: false },
    ],
  },
];

export const singleFilters = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "0-500", label: "Under ₹500", checked: false },
      { value: "500-1000", label: "₹500 to ₹1000", checked: false },
      { value: "1000-2000", label: "₹1000 to ₹2000", checked: false },
      { value: "2000-3000", label: "₹2000 to ₹3000", checked: false },
      { value: "3000-4000", label: "₹3000 to ₹4000", checked: false },
      { value: "4000-5000", label: "₹4000 to ₹5000", checked: false },
    ],
  },
  {
    id: "discount",
    name: "Discount Range",
    options: [
      { value: "10", label: "10% and above", checked: false },
      { value: "20", label: "20% and above", checked: false },
      { value: "30", label: "30% and above", checked: false },
      { value: "40", label: "40% and above", checked: false },
      { value: "50", label: "50% and above", checked: false },
      { value: "60", label: "60% and above", checked: false },
      { value: "70", label: "70% and above", checked: false },
    ],
  },
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "out_of_stock", label: "Out of Stock", checked: false },
      { value: "in_stock", label: "In Stock", checked: false },
    ],
  },
];
