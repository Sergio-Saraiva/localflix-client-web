import { api } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Category } from "@/models/category";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const HomePage : FC = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const fetchCategories = async () => {
        const response = await api.get("/categories");
        console.log(response)
        setCategories(response.data);
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">LocalFlix</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link to={`/category/${category.ID}`} key={category.ID}>
                <Button variant="outline" className="w-full h-24 text-lg">
                  {category.Name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )
}