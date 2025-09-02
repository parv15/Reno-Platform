"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type FormData = {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: FileList;
};

export default function AddSchoolPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [message, setMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image") {
        formData.append("image", data.image[0]);
      } else {
        formData.append(key, value as string);
      }
    });

    const res = await fetch("/api/schools", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setMessage("School added successfully!");
      reset();
    } else {
      setMessage("Error adding school");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-3xl w-full bg-[#2E2E2E] rounded-2xl shadow-md p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-semibold  mb-4">Add a School</h1>
        <p className="text-sm mb-6">Fill the form below to add a school. Images will be uploaded and stored.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium  mb-1">School Name</label>
            <input {...register("name", { required: true })} placeholder="e.g. DPSG" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" />
            {errors.name && <p className="text-xs text-rose-600 mt-1">Name is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">Address</label>
            <input {...register("address", { required: true })} placeholder="Street / locality" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" />
            {errors.address && <p className="text-xs text-rose-600 mt-1">Address is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">City</label>
            <input {...register("city", { required: true })} placeholder="City" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" />
            {errors.city && <p className="text-xs text-rose-600 mt-1">City is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">State</label>
            <input {...register("state", { required: true })} placeholder="State" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contact</label>
            <input {...register("contact", { required: true })} placeholder="Phone number" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })} placeholder="example@mail.com" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" />
            {errors.email_id && <p className="text-xs text-rose-600 mt-1">Enter a valid email</p>}
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium  mb-1">School Image</label>
            <div className="flex items-center gap-3">
              <input type="file" {...register("image", { required: true })} className="block text-sm  file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#1C1C1C]  hover:file:bg-[#1C1C1C]" />
            </div>
            {errors.image && <p className="text-xs text-rose-600 mt-1">Please upload an image</p>}
          </div>

          <div className="col-span-1 sm:col-span-2 flex items-center justify-between mt-2">
            <button type="submit" className="inline-flex items-center gap-2 bg-[#4285F4] hover:bg-sky-700 text-white px-5 py-2 rounded-md shadow">
              Add School
            </button>

            <div className="text-sm">
              {message ? (
                <span className="text-green-600 font-medium">{message}</span>
              ) : (
                <span >All fields are required</span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}