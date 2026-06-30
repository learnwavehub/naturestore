// app/therapies/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Heart, 
  Calendar, 
  Clock, 
  Sparkles,
  Loader2,
  Share2,
  Bookmark,
  CheckCircle,
  Star,
  Users,
  Clock as ClockIcon,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TherapyType } from "@/lib/types";
import { getTherapyDetails } from "@/lib/actions/actions";
import toast from "react-hot-toast";

export default function TherapyDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [therapy, setTherapy] = useState<TherapyType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTherapy = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTherapyDetails(params.id);
        
        if (!data) {
          setError("Therapy not found");
          return;
        }
        
        setTherapy(data);
      } catch (error) {
        console.error("Error fetching therapy:", error);
        setError("Failed to load therapy details");
        toast.error("Failed to load therapy details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchTherapy();
    }
  }, [params.id]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: therapy?.title || "Therapy",
        text: therapy?.description || "",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading therapy details...</p>
        </div>
      </div>
    );
  }

  if (error || !therapy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Therapy Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The therapy you're looking for doesn't exist."}</p>
          <Button 
            onClick={() => router.push("/therapies")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Therapies
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/therapies">
            <Button 
              variant="ghost" 
              className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Therapies
            </Button>
          </Link>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleShare}
              className="border-gray-200 hover:border-blue-200 hover:bg-blue-50"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-200 hover:border-blue-200 hover:bg-blue-50"
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Card className="overflow-hidden border-0 shadow-xl bg-white">
          {/* Image */}
          <div className="relative w-full h-[400px] bg-gradient-to-br from-blue-100 to-purple-100">
            {therapy.image && therapy.image.length > 0 ? (
              <>
                <Image
                  src={therapy.image[0]}
                  alt={therapy.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <Heart className="h-24 w-24 text-blue-300" />
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <Badge className="bg-white/90 backdrop-blur-sm text-gray-700 border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                Therapy Program
              </Badge>
              <Badge className="bg-green-500/90 backdrop-blur-sm text-white border-0">
                <CheckCircle className="h-3 w-3 mr-1" />
                Available
              </Badge>
            </div>
            
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{therapy.title}</h1>
              <p className="text-white/80 text-sm flex items-center gap-4">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Created {formatDate(therapy.createdAt)}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Updated {formatDate(therapy.updatedAt)}
                </span>
              </p>
            </div>
          </div>

          <CardContent className="p-6 md:p-8">
            {/* Description Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="h-6 w-6 text-blue-500" />
                About This Therapy
              </h2>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg">
                  {therapy.description}
                </p>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Benefits Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-500" />
                Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Holistic Approach</h4>
                    <p className="text-sm text-gray-600">Comprehensive wellness for mind and body</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <ClockIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Flexible Schedule</h4>
                    <p className="text-sm text-gray-600">Adaptable to your lifestyle</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Expert Guidance</h4>
                    <p className="text-sm text-gray-600">Professional support throughout</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Heart className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Personalized Care</h4>
                    <p className="text-sm text-gray-600">Tailored to your unique needs</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Details Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="h-6 w-6 text-blue-500" />
                Therapy Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="font-medium text-gray-800">{formatDate(therapy.createdAt)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium text-gray-800">{formatDate(therapy.updatedAt)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Active
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">ID</p>
                  <p className="font-mono text-sm text-gray-600 truncate">{therapy._id}</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex-1 py-6 text-lg"
              >
                <Heart className="h-5 w-5 mr-2" />
                Book This Therapy
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 py-6 text-lg"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}