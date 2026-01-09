import React from "react";
import profile1 from "../assets/profile_img_1.png";
import profile2 from "../assets/profile_img_2.png";
import upload from "../assets/upload_btn_icon.svg";

const Fourth = () => {
  const testimonialsData = [
    {
      name: "Chavda Raj",
      role: "WEB DEVELOPER",
      image: profile1,
      text: "I've been using bg.removal for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier."
    },
    {
      name: "Sneh Patel",
      role: "UI DESIGNER",
      image: profile2,
      text: "I've been using bg.removal for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier."
    }
  ];

  return (
    <section className="pb-24 px-6 bg-[#F8FBFF]">
      
      {/* Title */}
      <h2 className="text-center text-3xl md:text-4xl font-semibold text-gray-800 mb-12">
        Customer Testimonials
      </h2>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {testimonialsData.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-8 shadow-md hover:shadow-lg transition"
          >
            {/* Quote */}
            <div className="text-[#4B3269] text-5xl font-serif leading-none mb-2">
              “
            </div>

            {/* Text */}
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              {item.text}
            </p>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="text-lg font-medium text-gray-800">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-24 text-center">
        <h3 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-8">
          See the magic. Try now
        </h3>

        <label
          className="inline-flex items-center gap-3 px-8 py-4 
                     bg-gradient-to-r from-purple-500 to-pink-500 
                     text-white rounded-full cursor-pointer
                     hover:opacity-90 transition shadow-lg"
        >
          <img src={upload} alt="upload" className="w-5 h-5" />
          <span className="font-medium">Upload your image</span>
          <input type="file" accept="image/*" className="hidden" />
        </label>
      </div>
    </section>
  );
};

export default Fourth;
