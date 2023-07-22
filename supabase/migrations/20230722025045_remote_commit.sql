alter table "public"."completed_tasks" drop constraint "completed_tasks_taskid_fkey";

alter table "public"."completed_tasks" drop constraint "completed_tasks_userid_fkey";

alter table "public"."pets" drop constraint "pets_userid_fkey";

alter table "public"."tasks" drop constraint "tasks_userid_fkey";

alter table "public"."completed_tasks" drop column "completedat";

alter table "public"."completed_tasks" drop column "taskid";

alter table "public"."completed_tasks" drop column "userid";

alter table "public"."completed_tasks" add column "date" date not null;

alter table "public"."completed_tasks" add column "task_id" uuid not null;

alter table "public"."completed_tasks" add column "user_id" uuid not null;

alter table "public"."completed_tasks" enable row level security;

alter table "public"."pets" drop column "createdat";

alter table "public"."pets" drop column "displayname";

alter table "public"."pets" drop column "userid";

alter table "public"."pets" add column "created_at" timestamp with time zone not null default now();

alter table "public"."pets" add column "display_name" text not null;

alter table "public"."pets" add column "user_id" uuid not null;

alter table "public"."pets" enable row level security;

alter table "public"."tasks" drop column "createdat";

alter table "public"."tasks" drop column "userid";

alter table "public"."tasks" add column "created_at" timestamp with time zone not null default now();

alter table "public"."tasks" add column "user_id" uuid not null;

alter table "public"."tasks" alter column "id" set default gen_random_uuid();

alter table "public"."tasks" enable row level security;

alter table "public"."users" drop column "createdat";

alter table "public"."users" drop column "displayname";

alter table "public"."users" add column "created_at" timestamp with time zone not null default now();

alter table "public"."users" add column "display_name" text not null;

alter table "public"."users" alter column "id" set default gen_random_uuid();

CREATE UNIQUE INDEX completed_tasks_pkey ON public.completed_tasks USING btree (user_id, date, task_id);

alter table "public"."completed_tasks" add constraint "completed_tasks_pkey" PRIMARY KEY using index "completed_tasks_pkey";

alter table "public"."completed_tasks" add constraint "completed_tasks_task_id_fkey" FOREIGN KEY (task_id) REFERENCES tasks(id) not valid;

alter table "public"."completed_tasks" validate constraint "completed_tasks_task_id_fkey";

alter table "public"."completed_tasks" add constraint "completed_tasks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."completed_tasks" validate constraint "completed_tasks_user_id_fkey";

alter table "public"."pets" add constraint "pets_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."pets" validate constraint "pets_user_id_fkey";

alter table "public"."tasks" add constraint "tasks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."tasks" validate constraint "tasks_user_id_fkey";

create policy "Enable insert for user"
on "public"."completed_tasks"
as permissive
for insert
to authenticated
with check ((auth.uid() = user_id));


create policy "Enable read access for user"
on "public"."completed_tasks"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "Enable update for user"
on "public"."completed_tasks"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Enable insert for user"
on "public"."pets"
as permissive
for insert
to authenticated
with check ((auth.uid() = user_id));


create policy "Enable read access for user"
on "public"."pets"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "Enable update for user"
on "public"."pets"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Enable insert for user"
on "public"."tasks"
as permissive
for insert
to authenticated
with check ((auth.uid() = user_id));


create policy "Enable read access for user"
on "public"."tasks"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "Enable update for user"
on "public"."tasks"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Enable insert for users"
on "public"."users"
as permissive
for insert
to authenticated
with check ((auth.uid() = id));


create policy "Enable read access for user"
on "public"."users"
as permissive
for select
to authenticated
using ((auth.uid() = id));


create policy "Enable update for user"
on "public"."users"
as permissive
for update
to authenticated
using ((auth.uid() = id))
with check ((auth.uid() = id));



