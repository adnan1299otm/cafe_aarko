import { Utensils, Pizza, Soup, Salad, Coffee, Sandwich, Drumstick, Beef, Fish, GlassWater } from "lucide-react";

export function CategoryIcon({ id, active }: { id: string, active: boolean }) {
  const color = active ? "#120E0C" : "var(--color-brand)";
  const props = { size: 16, color };

  switch (id) {
    case "appetizer": return <Utensils {...props} />;
    case "burger": return <Sandwich {...props} />;
    case "soup": return <Soup {...props} />;
    case "salad": return <Salad {...props} />;
    case "pizza": return <Pizza {...props} />;
    case "pasta": return <Utensils {...props} />;
    case "choumein": return <Utensils {...props} />;
    case "chinese-set-menu": return <Utensils {...props} />;
    case "mexican-set-menu": return <Utensils {...props} />;
    case "continental-set-menu": return <Utensils {...props} />;
    case "vegetables": return <Salad {...props} />;
    case "indian-curry": return <Soup {...props} />;
    case "rice": return <Utensils {...props} />;
    case "biriyani": return <Utensils {...props} />;
    case "beef": return <Beef {...props} />;
    case "fish": return <Fish {...props} />;
    case "chicken": return <Drumstick {...props} />;
    case "steak": return <Beef {...props} />;
    case "kebab": return <Drumstick {...props} />;
    case "naan": return <Pizza {...props} />; // Closest to flatbread
    case "shakes-and-drinks": return <GlassWater {...props} />;
    case "seasonal-juice": return <GlassWater {...props} />;
    case "coffee": return <Coffee {...props} />;
    default: return <Utensils {...props} />;
  }
}
