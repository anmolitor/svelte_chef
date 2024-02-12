-- migrate:up
CREATE TABLE recipe (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL
);

-- migrate:down
DROP TABLE recipe;
