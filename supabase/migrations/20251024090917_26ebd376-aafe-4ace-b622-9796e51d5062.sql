-- Add booking_count field to tours table to track popularity
ALTER TABLE public.tours 
ADD COLUMN booking_count integer DEFAULT 0 NOT NULL;