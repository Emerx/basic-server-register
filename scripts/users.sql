CREATE TABLE Users
(
    Id varchar(36) NOT NULL,
    username varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (Id),
    CONSTRAINT "users_username_key" UNIQUE (username)
)