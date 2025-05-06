
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bookmark, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ListingCardProps {
  id: string;
  type: 'roommate' | 'hostel';
  title: string;
  price: number;
  location: string;
  tags: string[];
  imageUrl: string;
  ownerName?: string;
  ownerAvatar?: string;
  saved?: boolean;
  onSave?: (id: string) => void;
  className?: string;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  id,
  type,
  title,
  price,
  location,
  tags,
  imageUrl,
  ownerName,
  ownerAvatar,
  saved = false,
  onSave,
  className,
}) => {
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSave) onSave(id);
  };

  return (
    <Link to={`/listings/${id}`}>
      <Card className={cn("overflow-hidden shadow-soft card-hover border-0", className)}>
        <div className="relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-white/70 hover:bg-white/90"
            onClick={handleSave}
          >
            <Bookmark className={cn("w-5 h-5", saved ? "fill-primary text-primary" : "text-gray-700")} />
          </Button>
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex justify-between items-end">
              <Badge variant="secondary" className="bg-primary text-white">
                ₹{price.toLocaleString()}{type === 'hostel' ? '/mo' : '/mo'}
              </Badge>
              <Badge variant="outline" className="bg-white/90">
                {type === 'roommate' ? 'Roommate' : 'Hostel'}
              </Badge>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg leading-tight mb-1">{title}</h3>
          
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{location}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-2 py-1 rounded-full">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1 rounded-full">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
          
          {ownerName && (
            <div className="flex items-center mt-2">
              <Avatar className="h-6 w-6 mr-2">
                {ownerAvatar ? (
                  <img src={ownerAvatar} alt={ownerName} />
                ) : (
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                    {ownerName.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="text-sm text-gray-600">{ownerName}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;
