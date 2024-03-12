USE blog_db;

-- Insert initial data into 'users' table
INSERT INTO users (username, email, password)
VALUES
  ('johndoe', 'johndoe@example.com', 'password123'),
  ('janedoe', 'janedoe@example.com', 'password123');

-- Insert initial data into 'posts' table
INSERT INTO posts (title, content, user_id)
VALUES
  ('First Post', 'This is the content of the first post.', 1),
  ('Second Post', 'This is the content of the second post.', 1),
  ('Another Post', 'Content for another post.', 2);
