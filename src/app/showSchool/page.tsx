"use client";

import SchoolCard from "@/components/SchoolCard";
import { useEffect, useState } from "react";

type School = {
  id: number;
  name: string;
  address: string;
  city: string;
  image: string;
};

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    fetch("/api/schools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Schools Directory</h1>

      {schools.length === 0 ? (
        <p className="text-center text-gray-500">No schools available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {schools.map((school) => (
             <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      )}
    </div>
  );
}