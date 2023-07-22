alter table "public"."users" alter column "display_name" drop not null;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$

begin
    INSERT INTO public.users (
        id
    ) VALUES (
        new.id
    );
    return new;
end;
$function$
;


