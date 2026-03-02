export const router = createBrowserRouter([
  // USER
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/login", element: <Login /> },
    ],
  },

  // PRINCIPAL
  {
    path: "/principle",
    element: <PrincipleLayout />,
    children: [
      {
        index: true,
        element: <PrincipleDashboard />,
      },
    ],
  },

  // TEACHER
  {
    path: "/teacher",
    element: <TeacherLayout />,
    children: [
      {
        index: true,
        element: <TeacherPortal />,
      },
    ],
  },
]);
