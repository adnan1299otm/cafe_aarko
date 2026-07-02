import { MenuContent } from "@/components/menu/MenuContent";

export const metadata = {
  title: "Menu | Cafe Aarko",
  description: "Explore the full menu of Cafe Aarko, featuring a wide range of premium dishes, coffee, and desserts.",
};

export default function MenuPage() {
  return (
    <div className="pt-24 min-h-screen bg-[var(--color-background)]">
      <MenuContent />
    </div>
  );
}
