import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin } from "lucide-react";
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
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card/70 backdrop-blur-sm border-2 rounded-2xl">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {featured && (
          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
            Featured
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardHeader>
        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-3">
          {description}
        </p>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>{groupSize}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{location}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <p className="text-sm text-muted-foreground">Starting from</p>
          <p className="text-2xl font-bold text-primary">{price}</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => navigate(`/tour/${tourId}`)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TourCard;
