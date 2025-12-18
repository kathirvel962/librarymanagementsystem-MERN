import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl p-12 w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Library Management System
          </h1>
          <p className="text-gray-600 text-lg">Choose your role to get started</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Student Card */}
          <button
            onClick={() => navigate("/student-signup")}
            className="group bg-gradient-to-br from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 border-2 border-pink-200 hover:border-pink-400 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="text-5xl mb-4">🎓</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Student</h2>
            <p className="text-gray-600 mb-4">
              Register as a student to access library resources and manage your borrowings
            </p>
            <div className="flex items-center justify-center text-pink-600 font-medium group-hover:text-pink-700">
              <span>Sign up as Student</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>

          {/* Admin Card */}
          <button
            onClick={() => navigate("/admin-signup")}
            className="group bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border-2 border-indigo-200 hover:border-indigo-400 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="text-5xl mb-4">👤</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin</h2>
            <p className="text-gray-600 mb-4">
              Register as an admin to manage the library system and monitor activities
            </p>
            <div className="flex items-center justify-center text-indigo-600 font-medium group-hover:text-indigo-700">
              <span>Sign up as Admin</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-purple-600 font-medium hover:text-purple-700 hover:underline"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
