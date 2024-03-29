import Layout from "@/views/Layout";
import Year from "@/views/Year";
import Month from "@/views/Month";
import New from "@/views/New";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path:'year',
        element: <Year />
      },
      {
        path: 'month',
        element: <Month />
      }
    ]
  },  {
    path: '/new',
    element: <New />
  },
])

export default router