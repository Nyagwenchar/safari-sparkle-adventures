-- Create storage bucket for tour images
INSERT INTO storage.buckets (id, name, public)
VALUES ('tour-images', 'tour-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for tour images
CREATE POLICY "Anyone can view tour images"
ON storage.objects FOR SELECT
USING (bucket_id = 'tour-images');

CREATE POLICY "Admins can upload tour images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'tour-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update tour images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'tour-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete tour images"
ON storage.objects FOR DELETE
USING (bucket_id = 'tour-images' AND has_role(auth.uid(), 'admin'));

-- Add landing page fields to tours table
ALTER TABLE public.tours
ADD COLUMN IF NOT EXISTS overview TEXT,
ADD COLUMN IF NOT EXISTS includes JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS itinerary JSONB DEFAULT '[]'::jsonb;