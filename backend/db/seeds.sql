CREATE DATABASE pbspeed;

CREATE EXTENSION pgcrypto;
CREATE TABLE logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         integer,
  space_id        integer,
  action          varchar(40),
  browser_type    varchar(40),
  browser_version varchar(40),
  created_at      timestamp DEFAULT CURRENT_TIMESTAMP,
  duration        integer,

  CONSTRAINT production UNIQUE(id)
);