import LayoutComponent from "@/components/app/LayoutComponent";
import { CategoryFoldersPage } from "@/pages/CategoryFoldersPage";
import { FolderFilesPage } from "@/pages/FolderFilesPage";
import { HomePage } from "@/pages/HomePage";
import { PlayerPage } from "@/pages/PlayerPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutComponent />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "category/:categoryId",
                element: <CategoryFoldersPage />,
            },
            {
                path: "category/:categoryId/:folderId",
                element: <FolderFilesPage />,
            },
            {
                path: "player",
                element: <PlayerPage />,
            }
        ]
    }
])