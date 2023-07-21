.PHONY: status start restart stop new_migration apply list init push reset

status:
	npx supabase status

start:
	npx supabase start

restart:
	npx supabase stop && npx supabase restart

stop:
	npx supabase stop --no-backup

new_migration:
	npx supabase migration new

apply:
	npx supabase migration up

list:
	npx supabase migration list

init:
	npx supabase db remote commit && npx supabase db remote commit -s auth

push:
	npx supabase db push

reset:
	npx supabase db reset
