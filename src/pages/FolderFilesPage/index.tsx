import { api } from "@/api/api";
import { Button } from "@/components/ui/button";
import { File } from "@/models/file";
import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const FolderFilesPage : FC = () => {
    const params = useParams<{ folderId: string }>();
    const [files, setFiles] = useState<File[]>([]);

    const fetchFiles = async () => {
        const response = await api.get(`/files/${params.folderId}`);
        console.log(response)
        setFiles(response.data);
    }

    useEffect(() => {
        fetchFiles();
    }, []);
    
    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Files in {params.folderId}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file) => (
          <Link to={`/player?file_name=${encodeURIComponent(file.name)}&folder_id=${file.folder_id}&subtitles_url=${file.subtitles_url}&thumbnail_url=${file.thumbnail_url}`} key={file.name} className="group">
            <div className="relative aspect-video mb-2 overflow-hidden rounded-lg">
              <img
                src={file.thumbnail_url}
                alt={`Thumbnail for ${file.name}`}
                className="transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100">
                  Play
                </Button>
              </div>
            </div>
            <h3 className="text-lg font-semibold">{file.name}</h3>
          </Link>
        ))}
        </div>
        </div>
      )
}