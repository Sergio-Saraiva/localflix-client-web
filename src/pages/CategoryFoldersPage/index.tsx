import { api } from "@/api/api"
import { Button } from "@/components/ui/button"
import { Folder } from "@/models/folder"
import { FC, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export const CategoryFoldersPage : FC = () => {
    const [folders, setFolders] = useState<Folder[]>([])
    const params = useParams()
    const fetchFolders = async () => {
        const response = await api.get(`/folders/${params.categoryId}`);
        console.log(response)
        setFolders(response.data);
    }

    useEffect(() => {
        fetchFolders();
    }, []);


    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Folders in {params.categoryId}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {folders.map((folder) => (
              <Link to={`/category/${params.categoryId}/${folder.id}`} key={folder.id}>
                <Button variant="outline" className="w-full h-24 text-lg">
                  {folder.path}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )
}