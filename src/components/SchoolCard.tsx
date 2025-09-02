type Props = {
  school: {
    id: number;
    name: string;
    address: string;
    city: string;
    image: string;
  };
};

export default function SchoolCard({ school }: Props) {
  return (
            <div
              key={school.id}
              className="bg-[#2E2E2E]  rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={school.image}
                alt={school.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {school.name}
                </h2>
                <p className=" text-sm">{school.address}</p>
                <p className=" text-sm">{school.city}</p>
              </div>
            </div>
  );
}