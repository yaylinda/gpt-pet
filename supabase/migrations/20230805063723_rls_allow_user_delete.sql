create policy "Enable delete for users based on user_id"
    on "public"."completed_tasks"
    as permissive
    for delete
    to authenticated
    using ((auth.uid() = user_id));
