alter table public.users rename column username to displayName;
alter table public.users rename column created_at to createdAt;

CREATE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
AS $$

begin
    INSERT INTO public.users (
        id,
        displayName
    ) VALUES (
        new.id,
        new.raw_user_meta_data ->>'displayName'
    );
    return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

create table public.pets (
    id uuid not null primary key DEFAULT "extensions"."uuid_generate_v4"(),
    userId uuid not null references public.users(id),
    displayName text not null,
    type text not null,
    nature text not null,
    createdAt timestamp with time zone DEFAULT "now"() NOT NULL
);

create table public.tasks (
    id uuid not null primary key DEFAULT "extensions"."uuid_generate_v4"(),
    userId uuid not null references public.users(id),
    title text not null,
    type text not null,
    difficulty text not null,
    createdAt timestamp with time zone DEFAULT "now"() NOT NULL
);

create table public.completed_tasks (
    userId uuid not null references public.users(id),
    completedAt timestamp with time zone DEFAULT "now"() NOT NULL,
    taskId uuid not null references public.tasks(id)
)
