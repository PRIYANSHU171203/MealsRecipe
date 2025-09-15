import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("📩 Contact Form Data:", data);

      // 🔹 Example: send to backend or email service
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(data) });

      toast.success("Message sent successfully!");
      reset(); // clear form
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 px-6 py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Contact Us ✉️
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Have questions, feedback, or just want to say hello?  
          Fill out the form below — we’d love to hear from you!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Subject</label>
            <input
              type="text"
              placeholder="Subject of your message"
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400"
              {...register("subject", { required: "Subject is required" })}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              placeholder="Write your message here..."
              rows="5"
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400"
              {...register("message", {
                required: "Message is required",
                minLength: { value: 10, message: "Message should be at least 10 characters" },
              })}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-600 text-white font-semibold py-3 rounded-xl hover:bg-orange-700 transition shadow-md disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
