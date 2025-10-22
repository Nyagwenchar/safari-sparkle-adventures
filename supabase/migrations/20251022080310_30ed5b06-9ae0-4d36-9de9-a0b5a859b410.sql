-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
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

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a function to promote user to admin (callable by admins only)
CREATE OR REPLACE FUNCTION public.promote_to_admin(target_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if caller is admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can promote users';
  END IF;
  
  -- Update user role to admin
  UPDATE public.user_roles
  SET role = 'admin'
  WHERE user_id = target_user_id;
END;
$$;