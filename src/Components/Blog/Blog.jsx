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
];

const Blog = () => {
  return (
    <section className="bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          <span className="text-black dark:text-white">Scholarship</span>{" "}
          <span className="text-primary">Blog</span>
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-medium">
          Expert guides and the latest scholarship insights.
        </p>
      </div>

      {/* Blog List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="
                group
                bg-gray-50 dark:bg-gray-900 
                border-l-4 border-primary
                rounded-2xl
                p-8
                shadow-sm
                border border-gray-100 dark:border-gray-800
                transition-all duration-300
                hover:shadow-xl hover:-translate-y-1
              "
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  {blog.date}
                </p>
                <div className="h-2 w-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors">
                {blog.title}
              </h2>

              <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
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