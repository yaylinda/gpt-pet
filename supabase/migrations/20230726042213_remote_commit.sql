alter table "public"."completed_tasks" drop constraint "completed_tasks_pkey";

drop index if exists "public"."completed_tasks_pkey";

alter table "public"."completed_tasks" drop column "date";

alter table "public"."completed_tasks" add column "created_at" timestamp with time zone not null default now();

alter table "public"."completed_tasks" add column "date_key" text not null;

alter table "public"."tasks" add column "date_key" text not null;

CREATE UNIQUE INDEX completed_tasks_pkey ON public.completed_tasks USING btree (user_id, task_id, date_key);

alter table "public"."completed_tasks" add constraint "completed_tasks_pkey" PRIMARY KEY using index "completed_tasks_pkey";


