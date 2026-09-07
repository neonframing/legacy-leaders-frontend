-- Example blog data for Legacy Leaders.
-- Run this in the Supabase SQL editor after schema.sql to populate /blog with sample posts.
-- These profiles use placeholder clerk_user_id values, so they're read-only until
-- a real Clerk user claims the same username through /blog/profile/edit.

insert into public.profiles (clerk_user_id, username, display_name, role, bio, avatar_url, socials)
values
  (
    'seed_marcus_johnson',
    'marcusj',
    'Marcus Johnson',
    'fellow',
    'Legacy Fellow, Class of 2019. Software engineer passionate about mentoring the next generation of leaders.',
    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80',
    '{"linkedin": "https://linkedin.com", "instagram": "https://instagram.com"}'
  ),
  (
    'seed_elena_rodriguez',
    'elenar',
    'Elena Rodriguez',
    'mentor',
    'Marketing Director and proud Legacy Leaders mentor. Loves helping fellows find their voice.',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    '{"linkedin": "https://linkedin.com", "x": "https://x.com"}'
  ),
  (
    'seed_isaiah_washington',
    'isaiahw',
    'Isaiah Washington',
    'fellow',
    'Policy advisor and community organizer. Legacy Fellow turned Legacy Mentor-in-training.',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    '{"website": "https://example.com"}'
  )
on conflict (clerk_user_id) do nothing;

insert into public.posts (author_id, title, slug, excerpt, content, cover_image_url, created_at)
values
  (
    (select id from public.profiles where clerk_user_id = 'seed_marcus_johnson'),
    'What My First Year as a Legacy Fellow Taught Me',
    'first-year-legacy-fellow',
    'Looking back at the lessons, the mentors, and the moments that shaped my leadership journey.',
    'When I joined the Legacy Fellows program, I thought I already knew what leadership looked like. A year later, I realized real leadership is about showing up consistently, asking for help, and lifting others as you climb.

My mentor pushed me to speak up in rooms where I used to stay quiet. That single shift changed how I show up at work and in my community today.',
    'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=80',
    now() - interval '12 days'
  ),
  (
    (select id from public.profiles where clerk_user_id = 'seed_marcus_johnson'),
    '5 Things I Wish I Knew Before My First Mentor Meeting',
    '5-things-before-first-mentor-meeting',
    'A quick list for incoming fellows about to meet their mentor for the first time.',
    '1. Come with questions, not just answers.
2. It is okay to not have your five-year plan figured out.
3. Your mentor was once in your seat too.
4. Follow up after every conversation.
5. Say thank you more than you think you need to.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    now() - interval '8 days'
  ),
  (
    (select id from public.profiles where clerk_user_id = 'seed_elena_rodriguez'),
    'Why I Keep Coming Back to Mentor Every Year',
    'why-i-keep-mentoring-every-year',
    'Five cohorts in, and this is still the highlight of my year.',
    'People ask me why I keep making time to mentor when my calendar is already full. The truth is, watching a fellow go from nervous and unsure to confident and clear on their goals is one of the most rewarding things I do all year.

Mentoring is not a one-way street either. My fellows challenge my thinking just as much as I challenge theirs.',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
    now() - interval '6 days'
  ),
  (
    (select id from public.profiles where clerk_user_id = 'seed_elena_rodriguez'),
    'How to Give Feedback Fellows Actually Use',
    'feedback-fellows-actually-use',
    'The feedback framework I use with every fellow I mentor.',
    'Specific, timely, and kind. Those three words guide every piece of feedback I give. Vague praise does not help anyone grow, and feedback that arrives too late loses its power.

Try this the next time you give feedback: name the specific behavior, explain the impact, and offer one concrete suggestion for next time.',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    now() - interval '3 days'
  ),
  (
    (select id from public.profiles where clerk_user_id = 'seed_isaiah_washington'),
    'From Legacy Fellow to Legacy Mentor: My Full Circle Moment',
    'fellow-to-mentor-full-circle',
    'Six years ago I was the nervous fellow. This year, I am the mentor.',
    'Sitting across from my first mentee last month, I saw so much of myself in her. The same nervous energy, the same big dreams, the same fear of not being ready.

I told her what my mentor told me: you are more ready than you think, and the only way to find out is to start.',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    now() - interval '2 days'
  ),
  (
    (select id from public.profiles where clerk_user_id = 'seed_isaiah_washington'),
    'Building a Career in Policy: Lessons From the Legacy Leaders Community',
    'building-a-career-in-policy',
    'How this community helped me turn a passion for advocacy into a career.',
    'I did not know a single person working in policy before joining Legacy Leaders. Through the fellowship, I got my first introduction to local government, my first internship, and eventually my first job offer.

If you are curious about a career in policy or advocacy, reach out. I am always happy to talk shop with fellow Legacy Leaders.',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80',
    now() - interval '1 days'
  )
on conflict (slug) do nothing;
