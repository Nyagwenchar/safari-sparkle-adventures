-- Fix the handle_new_user function to have proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles if it doesn't exist
  INSERT INTO public.profiles (id, user_id, email, full_name)
  VALUES (
    gen_random_uuid(),
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Insert into user_roles
  -- First user becomes admin, rest become regular users
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id, 
    CASE 
      WHEN (SELECT COUNT(*) FROM public.user_roles) = 0 THEN 'admin'::public.app_role
      ELSE 'user'::public.app_role
    END
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$;