import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GiWhistle } from "react-icons/gi";
import * as FieldService from "../../../services/fieldService";
import { getAllCategories } from "../../../services/categoryService";
import type { Category } from "../../../types/book";

const tabsIds = ["venues", "events", "deals"] as const;
type TabId = typeof tabsIds[number];

interface NavBottomProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function NavBottom({ activeTab, onTabChange }: NavBottomProps) {
  const [counts, setCounts] = useState<{ [key in TabId]: number }>({
    venues: 0,
    events: 0,
    deals: 0,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🟢 Fetch số lượng venues
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const venues = await FieldService.getAllFields();
        setCounts({
          venues: Array.isArray(venues) ? venues.length : 0,
          events: 0,
          deals: 0,
        });
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };
    fetchCounts();
  }, []);

  // 🟢 Fetch categories từ BE
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        if (res.success && Array.isArray(res.data)) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // 🔻 Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const tabs = [
    {
      id: "venues",
      label: "Venues",
      des: "Sports Venues in Bangalore: Discover and Book Nearby Venues",
      count: counts.venues,
    },
    {
      id: "events",
      label: "Events",
      des: "Find All events and tournaments in Bangalore",
      count: counts.events,
    },
    {
      id: "deals",
      label: "Deals",
      des: "Discover the Best Deals on Gaming Equipment, Game Clothing, Health Instruments and More in Bangalore",
      count: counts.deals,
    },
  ];

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="w-full shadow-md">
      {/* 🔹 Thanh trên */}
      <div className="flex items-center justify-between border-b border-gray-200 px-24 py-4">
        <div className="flex-1 text-xl font-semibold text-gray-800 truncate">
          {activeTabData?.des}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-md border px-3 h-10">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by venue name"
              className="ml-2 w-48 outline-none placeholder:text-sm"
            />
          </div>

          {/* Dropdown chọn môn thể thao */}
          <div
            className="flex items-center justify-between px-3 h-10 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition relative"
            ref={dropdownRef}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-2">
              <GiWhistle className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700 font-medium text-sm">All Sports</span>
              <ChevronDown className="w-4 h-4 text-gray-700" />
            </div>

            {isOpen && (
              <div className="absolute top-12 right-0 w-[280px] bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div>
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between gap-3 px-3 py-2 cursor-pointer transition border-b-[1px] hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span className="text-gray-700 text-sm font-medium">
                          {category.name}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-2 p-3">
                  <button
                    className="cursor-pointer border-2 border-gray-700 px-6 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Reset
                  </button>
                  <button
                    className="cursor-pointer px-6 py-1 text-sm bg-green-600 text-white rounded transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔹 Tabs */}
      <div className="mt-2 flex gap-6 px-24 py-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as TabId)}
            className={`relative pb-2 text-sm font-medium ${
              activeTab === tab.id ? "text-green-600" : "text-gray-600 hover:text-black"
            }`}
          >
            {tab.label} ({tab.count})
            {activeTab === tab.id && (
              <span className="absolute left-0 bottom-0 h-[2px] w-full bg-green-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
