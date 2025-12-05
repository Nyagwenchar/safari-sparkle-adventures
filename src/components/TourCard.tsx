import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TourCardProps {
  title: string;
  description: string;
  image: string;
  duration: string;
  groupSize: string;
  location: string;
  price: string;
  featured?: boolean;
  tourId: string;
}

const TourCard = ({
  title,
  description,
  image,
  duration,
  groupSize,
  location,
  price,
  featured = false,
  tourId,
}: TourCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="group overflow-hidden card-elevated h-full flex flex-col">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Featured badge */}
        {featured && (
          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground gap-1 shadow-lg">
            <Sparkles className="h-3 w-3" />
            Featured
          </Badge>
        )}
        
        {/* Location badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-sm font-medium text-foreground shadow-md">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span>{location}</span>
        </div>
      </div>

      <CardHeader className="pb-2">
        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-4 flex-grow">
        <p className="text-muted-foreground line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Details */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{duration}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{groupSize}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4 border-t border-border mt-auto">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Starting from</p>
          <p className="text-2xl font-bold text-primary">{price}</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300"
          onClick={() => navigate(`/tour/${tourId}`)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TourCard;
