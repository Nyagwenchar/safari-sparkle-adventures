-- Fix the promote_to_admin function to have proper search_path
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