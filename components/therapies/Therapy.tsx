// app/(root)/therapies/TherapiesContent.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  Calendar, 
  Clock, 
  Sparkles, 
  Heart, 
  Loader2,
  ArrowRight,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TherapyType } from "@/lib/types";
import { getTherapies, getSearchedTherapies } from "@/lib/actions/actions";
import toast from "react-hot-toast";

export default function TherapiesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State
  const [therapies, setTherapies] = useState<TherapyType[]>([]);
  const [filteredTherapies, setFilteredTherapies] = useState<TherapyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("newest");
  const [isSearching, setIsSearching] = useState(false);

  // Get initial search from URL
  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchInput(query);
      setSearchTerm(query);
    }
  }, [searchParams]);

  // Fetch therapies
  useEffect(() => {
    const fetchTherapies = async () => {
      try {
        setLoading(true);
        let data;
        
        if (searchTerm.trim()) {
          data = await getSearchedTherapies(searchTerm);
          setIsSearching(true);
        } else {
          data = await getTherapies();
          setIsSearching(false);
        }
        
        const therapiesArray = Array.isArray(data) ? data : [];
        setTherapies(therapiesArray);
        setFilteredTherapies(therapiesArray);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching therapies:", error);
        toast.error("Failed to load therapies");
        setTherapies([]);
        setFilteredTherapies([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchTherapies, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Sort therapies
  useEffect(() => {
    const sorted = Array.isArray(therapies) ? [...therapies] : [];
    
    switch (sortBy) {
      case "newest":
        sorted.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());
        break;
      case "title-asc":
        sorted.sort((a, b) => a.title?.localeCompare(b.title) || 0);
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title?.localeCompare(a.title) || 0);
        break;
      default:
        break;
    }
    setFilteredTherapies(sorted);
  }, [therapies, sortBy]);

  // Search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput.trim());
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set("q", searchInput.trim());
    } else {
      params.delete("q");
    }
    router.push(`/therapies?${params.toString()}`);
  };

  // Clear search
  const clearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
    router.push("/therapies");
  };

  const getCurrentItems = () => {
    if (!Array.isArray(filteredTherapies) || filteredTherapies.length === 0) {
      return [];
    }
    const totalPages = Math.ceil(filteredTherapies.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredTherapies.slice(indexOfFirstItem, indexOfLastItem);
  };

  const safeFilteredTherapies = Array.isArray(filteredTherapies) ? filteredTherapies : [];
  const totalPages = Math.ceil(safeFilteredTherapies.length / itemsPerPage);
  const currentItems = getCurrentItems();

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }
      
      if (start > 2) {
        pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading therapies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Our Therapies
                </h1>
              </div>
              <p className="text-gray-500">
                Discover healing and wellness therapies for your journey
              </p>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] border-gray-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title-asc">Title A-Z</SelectItem>
                <SelectItem value="title-desc">Title Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-6 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search therapies by title or description..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 pr-20 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button 
              type="submit" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-8"
            >
              Search
            </Button>
          </form>

          {/* Stats */}
          <div className="mt-4 flex flex-wrap gap-3">
            <Badge variant="secondary" className="px-4 py-2">
              <Sparkles className="h-3 w-3 mr-1" />
              Total: {Array.isArray(therapies) ? therapies.length : 0}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Clock className="h-3 w-3 mr-1" />
              Active: {Array.isArray(therapies) ? therapies.length : 0}
            </Badge>
            {isSearching && (
              <Badge variant="secondary" className="px-4 py-2">
                Showing: {Array.isArray(filteredTherapies) ? filteredTherapies.length : 0} results
              </Badge>
            )}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-gray-500">Show:</span>
              <Select value={itemsPerPage.toString()} onValueChange={(v) => {
                setItemsPerPage(Number(v));
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-[80px] h-8 border-gray-200">
                  <SelectValue placeholder="6" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Therapies Grid */}
        {!Array.isArray(filteredTherapies) || filteredTherapies.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-4">
                <Heart className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {searchTerm ? "No matching therapies found" : "No therapies available"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? "Try adjusting your search terms or clear the search" 
                  : "Check back later for new therapy programs"}
              </p>
              {searchTerm && (
                <Button
                  onClick={clearSearch}
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Search
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((therapy) => (
                <Link 
                  key={therapy._id} 
                  href={`/therapies/${therapy._id}`}
                  className="group transition-all duration-300 hover:-translate-y-1"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 h-full">
                    {/* Image Section */}
                    <div className="relative w-full h-56 bg-gradient-to-br from-blue-100 to-purple-100">
                      {therapy.image && therapy.image.length > 0 ? (
                        <>
                          <Image
                            src={therapy.image[0]}
                            alt={therapy.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white text-sm font-medium flex items-center gap-1">
                              View Details <ArrowRight className="h-4 w-4" />
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Heart className="h-16 w-16 text-blue-300" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white/90 backdrop-blur-sm text-gray-700 border-0">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Therapy
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-3">
                        {therapy.title}
                      </h2>

                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {therapy.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(therapy.createdAt)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Updated {formatDate(therapy.updatedAt)}
                        </span>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <Button 
                          variant="ghost" 
                          className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 group"
                        >
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => goToPage(currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-blue-50"}
                      />
                    </PaginationItem>
                    
                    {getPageNumbers().map((page, index) => (
                      <PaginationItem key={index}>
                        {page === '...' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            onClick={() => typeof page === 'number' && goToPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer hover:bg-blue-50"
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => goToPage(currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-blue-50"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}