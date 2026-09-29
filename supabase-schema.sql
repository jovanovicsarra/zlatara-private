-- Zlatara Stevanovic production backend schema (Supabase/Postgres)
-- Run in a Supabase SQL editor after creating the project.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null default 'customer' check (role in ('customer','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id bigint primary key,
  name text not null,
  category text not null check (category in ('Ogrlice','Prstenje','Minđuše','Narukvice','Setovi')),
  price_rsd integer,
  available boolean not null default false,
  badge text not null default '',
  material text not null default '',
  fineness text not null default '',
  weight text not null default '',
  size text not null default '',
  description text not null default '',
  image text not null default '',
  hover_image text not null default '',
  orientation text not null default 'vertical' check (orientation in ('vertical','horizontal')),
  sort_order integer not null default 0,
  hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id bigint not null references public.products(id) on delete cascade,
  image_url text not null,
  image_role text not null default 'gallery' check (image_role in ('main','hover','gallery')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.product_relations (
  product_id bigint not null references public.products(id) on delete cascade,
  related_product_id bigint not null references public.products(id) on delete cascade,
  relation_type text not null default 'pairs_with' check (relation_type in ('pairs_with','alternative','collection')),
  priority integer not null default 0,
  primary key(product_id, related_product_id, relation_type)
);

create table if not exists public.bundles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  headline text not null default '',
  discount_type text not null default 'percent' check (discount_type in ('percent','fixed')),
  discount_value integer not null default 0 check (discount_value >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bundle_items (
  bundle_id uuid not null references public.bundles(id) on delete cascade,
  product_id bigint not null references public.products(id) on delete cascade,
  sort_order integer not null default 0,
  primary key(bundle_id, product_id)
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id bigint not null references public.products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  display_name text not null,
  rating integer not null check (rating between 1 and 5),
  body text not null check (char_length(body) between 3 and 1500),
  source text not null default 'online' check (source in ('online','store-customer')),
  verified_purchase boolean not null default false,
  hidden boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.review_images (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.reviews(id) on delete cascade,
  image_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  public_number text unique not null,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  shipping_address text not null,
  shipping_city text not null,
  status text not null default 'pending_payment' check (status in ('pending_payment','paid','preparing','shipped','completed','cancelled')),
  subtotal_rsd integer not null default 0 check (subtotal_rsd >= 0),
  discount_rsd integer not null default 0 check (discount_rsd >= 0),
  total_rsd integer not null default 0 check (total_rsd >= 0),
  bundle_id uuid references public.bundles(id) on delete set null,
  payment_reference text,
  note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id bigint references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null default 1 check (quantity > 0),
  unit_price_rsd integer not null check (unit_price_rsd >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text not null default '',
  body text not null default '',
  image text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.profiles where id=auth.uid() and role='admin');
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(id, full_name, role)
  values(new.id, coalesce(new.raw_user_meta_data->>'full_name',''), 'customer')
  on conflict(id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_relations enable row level security;
alter table public.bundles enable row level security;
alter table public.bundle_items enable row level security;
alter table public.reviews enable row level security;
alter table public.review_images enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.blog_posts enable row level security;
alter table public.site_settings enable row level security;

-- Profiles: users read/update their own profile; admins read all.
drop policy if exists "profiles own read" on public.profiles;
create policy "profiles own read" on public.profiles for select using (auth.uid()=id or public.is_admin());
drop policy if exists "profiles own update" on public.profiles;
create policy "profiles own update" on public.profiles for update using (auth.uid()=id) with check (auth.uid()=id and role='customer');

-- Public catalog is readable. Only admins can write.
drop policy if exists "products public read" on public.products;
create policy "products public read" on public.products for select using (hidden=false or public.is_admin());
drop policy if exists "products admin write" on public.products;
create policy "products admin write" on public.products for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "product images public read" on public.product_images;
create policy "product images public read" on public.product_images for select using (true);
drop policy if exists "product images admin write" on public.product_images;
create policy "product images admin write" on public.product_images for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "relations public read" on public.product_relations;
create policy "relations public read" on public.product_relations for select using (true);
drop policy if exists "relations admin write" on public.product_relations;
create policy "relations admin write" on public.product_relations for all using (public.is_admin()) with check (public.is_admin());

-- Bundles are public-readable when active; admins manage them.
drop policy if exists "bundles public read" on public.bundles;
create policy "bundles public read" on public.bundles for select using (active=true or public.is_admin());
drop policy if exists "bundles admin write" on public.bundles;
create policy "bundles admin write" on public.bundles for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "bundle items public read" on public.bundle_items;
create policy "bundle items public read" on public.bundle_items for select using (true);
drop policy if exists "bundle items admin write" on public.bundle_items;
create policy "bundle items admin write" on public.bundle_items for all using (public.is_admin()) with check (public.is_admin());

-- Reviews: public can read visible reviews. Logged-in users can insert only as themselves.
drop policy if exists "reviews public read" on public.reviews;
create policy "reviews public read" on public.reviews for select using (hidden=false or public.is_admin() or auth.uid()=user_id);
drop policy if exists "reviews customer insert" on public.reviews;
create policy "reviews customer insert" on public.reviews for insert to authenticated with check (auth.uid()=user_id and source='online' and hidden=false);
drop policy if exists "reviews admin manage" on public.reviews;
create policy "reviews admin manage" on public.reviews for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "review images public read" on public.review_images;
create policy "review images public read" on public.review_images for select using (true);
drop policy if exists "review images own insert" on public.review_images;
create policy "review images own insert" on public.review_images for insert to authenticated with check (
  exists(select 1 from public.reviews r where r.id=review_id and r.user_id=auth.uid())
);
drop policy if exists "review images admin manage" on public.review_images;
create policy "review images admin manage" on public.review_images for all using (public.is_admin()) with check (public.is_admin());

-- Orders: production checkout should insert/update orders through a trusted server/service role.
-- Customers may read only their own authenticated orders; admins manage everything.
drop policy if exists "orders own read" on public.orders;
create policy "orders own read" on public.orders for select to authenticated using (user_id=auth.uid() or public.is_admin());
drop policy if exists "orders admin manage" on public.orders;
create policy "orders admin manage" on public.orders for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "order items own read" on public.order_items;
create policy "order items own read" on public.order_items for select to authenticated using (
  exists(select 1 from public.orders o where o.id=order_id and (o.user_id=auth.uid() or public.is_admin()))
);
drop policy if exists "order items admin manage" on public.order_items;
create policy "order items admin manage" on public.order_items for all using (public.is_admin()) with check (public.is_admin());

-- Blog: published posts are public; admins can see/edit everything.
drop policy if exists "blog public read" on public.blog_posts;
create policy "blog public read" on public.blog_posts for select using (published=true or public.is_admin());
drop policy if exists "blog admin write" on public.blog_posts;
create policy "blog admin write" on public.blog_posts for all using (public.is_admin()) with check (public.is_admin());

-- Site settings hold the editorial slot layout and other public configuration.
drop policy if exists "settings public read" on public.site_settings;
create policy "settings public read" on public.site_settings for select using (true);
drop policy if exists "settings admin write" on public.site_settings;
create policy "settings admin write" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

-- Recommended storage buckets to create in Supabase Storage:
-- product-images (public; admin upload only)
-- review-images (public; authenticated upload with file size/type restrictions)
-- blog-images (public; admin upload only)

-- IMPORTANT: promote the owner's profile to admin only from SQL editor/service role:
-- update public.profiles set role='admin' where id='<OWNER_AUTH_USER_UUID>';
