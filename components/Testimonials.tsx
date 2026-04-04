"use client";

import { motion } from "motion/react";
import { Star, Quote, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Kevin Otieno",
    title: "Car Owner, Nairobi",
    content: "Miona Tech Autospares helped me replace my damaged headlights quickly. The quality is excellent and prices are fair. Delivery was faster than expected!",
    rating: 5.0,
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Ann Naliaka",
    title: "Fleet Manager, Mombasa",
    content: "We sourced side mirrors and LED bulbs for our vehicles and the quality is outstanding. The team is professional and orders are always fulfilled on time.",
    rating: 5.0,
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Victor Ochieng",
    title: "Mechanic, Kisumu",
    content: "Miona Tech Autospares is my go-to for headlight lenses and fog lights. Their parts fit perfectly and last long. Great service every time!",
    rating: 4.8,
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "Beatrice Jepkoech",
    title: "Car Owner, Nakuru",
    content: "I replaced my rear bumper and tail light lens through them and the results were amazing. Reliable products and professional service!",
    rating: 5.0,
    date: "2 months ago"
  },
  {
    id: 5,
    name: "George Mutiso",
    title: "Transport Manager, Thika",
    content: "Durable spare parts that actually hold up! From projector bulbs to bumpers, everything was delivered on time and within budget.",
    rating: 4.9,
    date: "1 week ago"
  },
  {
    id: 6,
    name: "Faith Cherono",
    title: "Car Owner, Eldoret",
    content: "The LED bulbs I bought completely transformed my night driving experience. Great quality and amazing customer support!",
    rating: 5.0,
    date: "3 days ago"
  },
  {
    id: 7,
    name: "Samuel Kiptoo",
    title: "Taxi Operator, Kisii",
    content: "Reliable spare parts for daily use. The side mirrors and fog lights I purchased are durable and perfectly compatible.",
    rating: 4.7,
    date: "1 month ago"
  },
  {
    id: 8,
    name: "Joyce Wairimu",
    title: "Car Dealer, Westlands",
    content: "We upgraded several vehicles with new headlights and tail light lenses. Quality products that enhance the look and value of the cars.",
    rating: 5.0,
    date: "2 weeks ago"
  },
  {
    id: 9,
    name: "Allan Mboya",
    title: "Auto Enthusiast, Karen",
    content: "Premium quality spare parts! The projector bulbs and front bumper I got gave my car a sleek, modern look. Highly recommend.",
    rating: 4.9,
    date: "3 months ago"
  },
  {
    id: 10,
    name: "Mary Wanjiku",
    title: "Car Owner, Ruiru",
    content: "Perfect replacement for my damaged side wing and tail light lens. The team was helpful and the products exceeded my expectations.",
    rating: 5.0,
    date: "1 month ago"
  },
  {
    id: 11,
    name: "Dennis Kariuki",
    title: "Garage Owner, Embakasi",
    content: "Bulk orders for headlights and LED bulbs are always handled efficiently. My clients are happy with the quality every time.",
    rating: 4.8,
    date: "2 weeks ago"
  },
  {
    id: 12,
    name: "Naomi Atieno",
    title: "Car Owner, Kilimani",
    content: "Got my fog lights and headlight lens replaced and the difference is incredible. Professional service and beautiful results!",
    rating: 5.0,
    date: "4 days ago"
  },
  {
    id: 13,
    name: "Peter Karanja",
    title: "Car Hire Business Owner, Coast",
    content: "We rely on Miona Tech Autospares for consistent quality across our fleet. Reliable parts and excellent service every time.",
    rating: 4.9,
    date: "2 months ago"
  },
  {
    id: 14,
    name: "Lucy Nduta",
    title: "Car Owner, Lavington",
    content: "Stylish and durable spare parts! The rear bumper and LED bulbs I bought upgraded my car's look instantly.",
    rating: 5.0,
    date: "1 week ago"
  },
  {
    id: 15,
    name: "Brian Kiplangat",
    title: "Logistics Manager, Upper Hill",
    content: "High-quality spare parts for our fleet vehicles. From side mirrors to front bumpers, everything fits perfectly and lasts long.",
    rating: 4.8,
    date: "3 weeks ago"
  }
];

const generateInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getColorFromName = (name: string) => {
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-blue-500',
    'from-teal-500 to-green-500',
    'from-rose-500 to-pink-500',
    'from-amber-500 to-yellow-500',
    'from-violet-500 to-purple-500',
    'from-sky-500 to-blue-500',
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
};

const getRatingColor = (rating: number) => {
  if (rating >= 4.8) return 'text-green-600 bg-green-100';
  if (rating >= 4.5) return 'text-blue-600 bg-blue-100';
  return 'text-amber-600 bg-amber-100';
};

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star className="w-5 h-5 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}
      <span className="ml-2 text-sm font-bold text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold mb-4">
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              <span>Customer Love</span>
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
          >
            Kenyan Businesses <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Love Miona tech autospares</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Rated <span className="font-bold text-yellow-600">4.9/5</span> stars by hundreds of satisfied customers across Kenya
          </motion.p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative h-[500px]">
            <motion.div
              key={currentIndex}
              initial={{ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: direction < 0 ? 300 : -300, opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="absolute inset-0"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 h-full">
                <div className="grid md:grid-cols-2 h-full">
                  {/* Left Side - Testimonial Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <Quote className="w-12 h-12 text-blue-400" />
                        <div className={`px-3 py-1 rounded-full ${getRatingColor(currentTestimonial.rating)} font-bold`}>
                          {currentTestimonial.rating.toFixed(1)} Rating
                        </div>
                      </div>
                      
                      <motion.p
                        className="text-2xl md:text-3xl text-gray-800 mb-8 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        "{currentTestimonial.content}"
                      </motion.p>
                      
                      <div className="mb-4">
                        {renderStars(currentTestimonial.rating)}
                      </div>
                    </div>
                    
                    <div>
                      <motion.h3
                        className="text-2xl font-bold text-gray-900 mb-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {currentTestimonial.name}
                      </motion.h3>
                      <div className="flex items-center justify-between">
                        <motion.p
                          className="text-lg text-blue-600"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          {currentTestimonial.title}
                        </motion.p>
                        <motion.p
                          className="text-sm text-gray-500"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          {currentTestimonial.date}
                        </motion.p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Side - Client Info & Stats */}
                  <div className={`bg-gradient-to-br ${getColorFromName(currentTestimonial.name)} p-8 md:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden`}>
                    {/* Animated background pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-white rounded-full"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-4 border-white rounded-full"></div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200,
                        damping: 20,
                        delay: 0.4 
                      }}
                      className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center mb-6 relative z-10 border-4 border-white/30"
                    >
                      <span className="text-4xl font-bold">
                        {generateInitials(currentTestimonial.name)}
                      </span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-center relative z-10"
                    >
                      <div className="text-5xl font-bold mb-2">
                        {currentTestimonial.rating.toFixed(1)}
                      </div>
                      <div className="text-xl opacity-90 mb-4">
                        Star Rating
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.7 + i * 0.1 }}
                          >
                            <Star className="w-6 h-6 fill-white" />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-8 text-center relative z-10"
                    >
                      <div className="text-sm opacity-80 mb-2">
                        Overall Satisfaction
                      </div>
                      <div className="w-48 bg-white/30 rounded-full h-2">
                        <motion.div 
                          className="bg-white h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${currentTestimonial.rating * 20}%` }}
                          transition={{ delay: 1, duration: 1 }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-4 rounded-full bg-white shadow-xl hover:shadow-2xl border-2 border-blue-100 text-blue-600 hover:text-white"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            <div className="flex gap-3">
              {testimonials.slice(0, 5).map((testimonial, index) => (
                <motion.button
                  key={testimonial.id}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToTestimonial(index)}
                  className="flex flex-col items-center"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <div className={`w-12 h-12 rounded-full ${index === currentIndex ? 'ring-4 ring-blue-500 ring-offset-2' : ''} bg-gradient-to-br ${getColorFromName(testimonial.name)} flex items-center justify-center text-white font-bold mb-1`}>
                    {generateInitials(testimonial.name)}
                  </div>
                  <div className={`text-xs font-medium ${index === currentIndex ? 'text-blue-600' : 'text-gray-500'}`}>
                    {testimonial.rating.toFixed(1)}
                  </div>
                </motion.button>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-4 rounded-full bg-white shadow-xl hover:shadow-2xl border-2 border-blue-100 text-blue-600 hover:text-white"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Showing {currentIndex + 1} of {testimonials.length} testimonials
            </p>
          </div>
        </div>

        {/* Testimonials Grid with Ratings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 relative overflow-hidden group"
            >
              {/* Rating Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${getRatingColor(testimonial.rating)} font-bold text-sm z-10`}>
                {testimonial.rating.toFixed(1)}
              </div>
              
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getColorFromName(testimonial.name)} flex items-center justify-center text-white font-bold shadow-md`}>
                  {generateInitials(testimonial.name)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <span className="text-xs text-gray-500">{testimonial.date}</span>
                  </div>
                  <p className="text-sm text-blue-600">{testimonial.title}</p>
                </div>
              </div>
              
              <div className="mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-600 mb-2 line-clamp-3">"{testimonial.content}"</p>
              
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Verified Purchase</span>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="text-blue-500 hover:text-blue-600 cursor-pointer"
                  >
                    <Heart className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white overflow-hidden"
        >
          <div className="relative">
            {/* Floating elements */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
              <div className="text-center md:text-left">
                <div className="text-5xl md:text-6xl font-bold mb-2">4.9</div>
                <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-300" />
                  ))}
                </div>
                <p className="text-blue-100">Average Rating</p>
              </div>
              
              <div className="space-y-4">
                {[5, 4, 3].map((stars, index) => {
                  const count = testimonials.filter(t => Math.floor(t.rating) === stars).length;
                  const percentage = (count / testimonials.length) * 100;
                  
                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-20">
                        <span className="text-lg">{stars}</span>
                        <Star className="w-4 h-4 fill-white" />
                        <span className="ml-2 text-sm">({count})</span>
                      </div>
                      <div className="flex-1 h-3 bg-white/30 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-white rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                      <span className="w-12 text-right">{percentage.toFixed(0)}%</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">100%</div>
                <p className="text-blue-100">Recommend Miona Tech</p>
                <motion.div
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <Heart className="w-5 h-5 fill-red-400 text-red-400" />
                  <span>Trusted by Kenyans</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Join Hundreds of Satisfied Kenyan Customers
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the Miona Tech Autospares difference - quality products, professional service, and timely delivery
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Share Your Experience
          </motion.button>
        </motion.div>

        {/* Floating background elements */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"
              initial={{
                x: Math.random() * 100 + 'vw',
                y: Math.random() * 100 + 'vh',
              }}
              animate={{
                x: Math.random() * 100 + 'vw',
                y: Math.random() * 100 + 'vh',
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}