This is next.js 14.0.1 starter template with typescript, tailwindcss, supabase database and auth, shadcn/ui.

[shadcn/ui](https://ui.shadcn.com/) is a React UI library that contains a set of high quality components and demos for building rich, interactive user interfaces.
[tailwindcss](https://tailwindcss.com/) is a utility-first CSS framework for rapidly building custom user interfaces.
[supabase](https://supabase.io/) is an open source Firebase alternative. Supabase adds realtime and RESTful APIs to your existing PostgreSQL database without a single line of code.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Setup

create a supabase account and create a new project. copy the url and key and paste them in the .env file.

open sql edtitor and run the following sql commands to create profiles table and set up row level security.
change the table name to your table name if you want to use a different table name.

```sql

create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  email text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- inserts a row into public users
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, username, full_name, avatar_url)
  values (new.id,
  new.raw_user_meta_data->>'email',
  new.raw_user_meta_data->>'username',
  new.raw_user_meta_data->>'full_name',
  new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
-- trigger the function every time a user is cre∂ƒated
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

```

## create supabase types

run the following command to create supabase types
change the folder if you want to use a different folder

```bash
npx supabase gen types typescript --project-id yourSupbaseProjectId > lib/supabase.types.ts
```

## supabas auth setup

This project uses supabase auth to handle user authentication. you can read more about it [here](https://supabase.io/docs/guides/auth).
google and kakao login is enabled by default. you can enable other login methods by going to the auth page in your supabase project.

server side and client side auth check is enabled using middleware

## darkmode

darkmode is enabled by default.
you can change the default theme by changing the theme css variables in `app/globals.css`

## more shadn/ui components

you can find more components in the [shadcn/ui](https://ui.shadcn.com/) website. you can also use the components in the [shadcn/ui](https://ui.shadcn.com/) website in your project by copying the code from the website.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## authentication

I've added google signin and on callbackUrl, i update the user profile based on session data if the user is new.
Since user is created on signin, only way to update user information was to use session data, if anybody has a better way to do this, please let me know.
