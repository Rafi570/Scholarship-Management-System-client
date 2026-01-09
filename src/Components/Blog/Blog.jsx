import React from "react";

const blogs = [
  {
    id: 1,
    title: "How to Find Fully Funded Scholarships",
    excerpt:
      "Learn the best strategies to find and apply for fully funded scholarships worldwide.",
    date: "Jan 5, 2026",
  },
  {
    id: 2,
    title: "Common Scholarship Application Mistakes",
    excerpt:
      "Avoid these common mistakes that can reduce your chances of getting selected.",
    date: "Jan 2, 2026",
  },
  {
    id: 3,
    title: "Top Countries Offering Scholarships in 2026",
    excerpt:
      "Discover which countries are providing the most scholarship opportunities this year.",
    date: "Dec 28, 2025",
  },
//   {
//     id: 4,
//     title: "Tips for Writing Winning Scholarship Essays",
//     excerpt:
//       "A complete guide to crafting scholarship essays that impress the selection committee.",
//     date: "Dec 20, 2025",
//   },
];

const Blog = () => {
  return (
    <section className="text-gray-800 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold" style={{ color: "#35AC86" }}>
          <span className="text-black">Scholarship</span> Blog
        </h1>
        <p className="mt-4 text-gray-600 text-lg sm:text-xl">
          Latest updates, guides, and tips from our Scholarship Management System
        </p>
      </div>

      {/* Blog List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="
                bg-white 
                border-l-4 border-primary
                rounded-xl
                p-6
                shadow-md
                transition-transform duration-300
                hover:-translate-y-2 hover:shadow-xl
              "
              style={{ borderColor: "#35AC86" }}
            >
              <p className="text-sm text-gray-500">{blog.date}</p>

              <h2 className="mt-3 text-xl font-bold text-gray-800 relative after:absolute after:left-0 after:bottom-0 after:w-12 after:h-1 after:bg-primary after:rounded-full">
                {blog.title}
              </h2>

              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                {blog.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
