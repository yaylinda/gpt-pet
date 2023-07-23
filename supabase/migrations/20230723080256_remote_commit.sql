alter table "public"."pets" drop column "nature";

alter table "public"."pets" add column "natures" text[] not null;


